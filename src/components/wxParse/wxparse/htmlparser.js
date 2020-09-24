import config from './config.js';

/**
 * HTML解析器
 * @param html 需要解析的html内容
 * @param handler 解析处理器
 * @constructor
 */
function HTMLParser(html, handler) {
	var index, chars, match, stack = [],last = html;

	stack.last = function () {
		return this[this.length - 1];
	};

	while (html) {
    	chars = true;
    
		// 如果栈为空或者没有在特殊节点（script,style）中
		if (!stack.last() || !config.elements.special[stack.last()]) {
      		if (html.indexOf("<!--") === 0) {
				/**
				 * 处理注释
				 * 1. 将注释内容交给注释处理器
				 * 2. 截取整个注释内容
				 */
				index = html.indexOf("-->");
				if (index >= 0) {
					if (handler.comment) {
						handler.comment(html.substring(4, index));
					}
					html = html.substring(index + 3);
					chars = false;
				}
      		} else if (html.indexOf("</") === 0) {
				match = html.match(config.reg.endTag);

				if (match) {
					html = html.substring(match[0].length);
					match[0].replace(config.reg.endTag, parseEndTag);
					chars = false;
				}
			} else if (html.indexOf("<") === 0) {
				match = html.match(config.reg.startTag);
        		if (match) {
          			html = html.substring(match[0].length);
          			match[0].replace(config.reg.startTag, parseStartTag);
					chars = false;
				}
			}

			if (chars) {
				/**
				 * 如果不是开始、结束或者注释标签
				 * 交给字符串处理器
				 * @type {number}
				 */
				index = html.indexOf("<");
				var text = ''
				while (index === 0) {
          			text += "<";
          			html = html.substring(1);
          			index = html.indexOf("<");
				}
				text += index < 0 ? html : html.substring(0, index);
				html = index < 0 ? "" : html.substring(index);

				if (handler.chars) {
					handler.chars(text);
				}
			}
		} else {
			html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
				text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
				if (handler.chars)
					handler.chars(text);
				return "";
			});

			parseEndTag("", stack.last());
		}

		if (html === last) {
			throw "Parse Error: " + html;
		}
		last = html;
	}

	// Clean up any remaining tags
	parseEndTag();

  function parseStartTag(tag, tagName, rest, unary) {   

		tagName = tagName.toLowerCase();

		if (config.elements.block[tagName]) {
			while (stack.last() && config.elements.inline[stack.last()]) {
				parseEndTag("", stack.last());
			}
		}

		if (config.elements.closeSelf[tagName] && stack.last() === tagName) {
			parseEndTag("", tagName);
		}

		unary = config.elements.empty[tagName] || !!unary;

		if (!unary)
			stack.push(tagName);

		if (handler.start) {
			var attrs = [];

      rest.replace(config.reg.attr, function (match, name) {
				var value = arguments[2] ? arguments[2] :
					arguments[3] ? arguments[3] :
						arguments[4] ? arguments[4] :
							config.elements.fillAttrs[name] ? name : "";

				attrs.push({
					name: name,
					value: value,
					escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
        });
			});

			if (handler.start) {
				handler.start(tagName, attrs, unary);
			}

		}
	}

	/**
	 * 解析结束标签
	 * @param tag
	 * @param tagName
	 */
	function parseEndTag(tag, tagName) {
		/**
		 * 1. 如果没有标签名，设定pos为0
		 * 2. 在栈中查找与当前结束标签名相同的标签，获取到其pos
		 * 3. 如果pos大于等于0，将栈中此标签开始标签以后的所有标签逐个交给end处理器处理
		 * 4， 从栈中删除开始标签
		 */
		// If no tag name is provided, clean shop
		if (!tagName) {
			var pos = 0;
		} else {
			// Find the closest opened tag of the same type
			tagName = tagName.toLowerCase();
			for (var pos = stack.length - 1; pos >= 0; pos--) {
				if (stack[pos] === tagName)
					break;
			}
		}
		if (pos >= 0) {
			// Close all the open elements, up the stack
			for (var i = stack.length - 1; i >= pos; i--)
				if (handler.end)
					handler.end(stack[i]);

			// Remove the open elements from the stack
			stack.length = pos;
		}
	}
}

export default HTMLParser;
