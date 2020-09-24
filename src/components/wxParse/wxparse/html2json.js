/**
 * 解析html字符串为json对象
 */
import HTMLParser from './htmlparser';
import wxDiscode from './wxDiscode';
import config from './config.js';
// import hljs from '../highlight/hljs.js';

var __placeImgeUrlHttps = "https";
var __emojisReg = '';
var __emojisBaseSrc = '';
var __emojis = {};

class HtmlToJson
{

    /**
     * 解析html为json对象
     *
     * @param html string 待解析的html内容
     * @param bindName string 绑定的变量
     * @param baseImageUrl 图片的固定前缀
     * @param defaultImg 图片加载出错时的默认图片
     */
    static html2json(html, bindName, baseImageUrl, defaultImg, imgSuffix) {
        // 处理字符串
        html = HtmlToJson.removeDOCTYPE(html);
        html = HtmlToJson.trimHtml(html);
        html = HtmlToJson.formatCode(html);
        html = wxDiscode.strDiscode(html);

        //生成node节点
        var bufArray = [];
        var results = {
            node: bindName,
            nodes: [],
            images:[],
            imageUrls:[]
        };
        var index = 0;
        HTMLParser(html, {
            start: function (tag, attrs, unary) {
                var node = {
                    node: 'element',
                    tag: tag,
                };

                if (bufArray.length === 0) {
                    node.index = index.toString()
                    index += 1
                } else {
                    var parent = bufArray[0];
                    if (parent.nodes === undefined) {
                        parent.nodes = [];
                    }
                    node.index = parent.index + '.' + parent.nodes.length
                }

                if (config.elements.block[tag]) {
                    node.tagType = "block";
                } else if (config.elements.inline[tag]) {
                    node.tagType = "inline";
                } else if (config.elements.closeSelf[tag]) {
                    node.tagType = "closeSelf";
                }

                /**
                 * 给pre标签添加hljs类名
                 */
                if (tag === 'pre') {
                    attrs.push({ name: 'class', value: 'hljs'});
                }

                if (attrs.length !== 0) {
                    node.attr = attrs.reduce(function (pre, attr) {
                        var name = attr.name;
                        var value = attr.value;
                        if (name === 'class') {
                            node.classStr = value;
                        }
                        // has multi attibutes
                        // make it array of attribute
                        if (name === 'style') {
                            node.styleStr = value;
                        }
                        if (name === 'id') {
                            node.id = value;
                        }
                        if (value.match(/ /)) {
                            value = value.split(' ');
                        }

                        // if attr already exists
                        // merge it
                        if (pre[name]) {
                            if (Array.isArray(pre[name])) {
                                // already array, push to last
                                pre[name].push(value);
                            } else {
                                // single value, make it array
                                pre[name] = [pre[name], value];
                            }
                        } else {
                            // not exist, put it
                            pre[name] = value;
                        }

                        return pre;
                    }, {});
                }

                //对img添加额外数据
                if (node.tag === 'img') {
                    node.imgIndex = results.images.length;
                    var imgUrl = baseImageUrl + node.attr.src + imgSuffix;
                    if (imgUrl[0] === '') {
                        imgUrl.splice(0, 1);
                    }
                    imgUrl = wxDiscode.urlToHttpUrl(imgUrl, __placeImgeUrlHttps);
                    node.attr.src = imgUrl;
                    node.from = bindName;
                    node.default = defaultImg;
                    results.images.push(node);
                    results.imageUrls.push(imgUrl);
                }

                // 处理font标签样式属性
                if (node.tag === 'font') {
                    var fontSize = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', '-webkit-xxx-large'];
                    var styleAttrs = {
                        'color': 'color',
                        'face': 'font-family',
                        'size': 'font-size'
                    };
                    if (!node.attr.style) node.attr.style = [];
                    if (!node.styleStr) node.styleStr = '';
                    for (var key in styleAttrs) {
                        if (node.attr[key]) {
                            var value = key === 'size' ? fontSize[node.attr[key]-1] : node.attr[key];
                            node.attr.style.push(styleAttrs[key]);
                            node.attr.style.push(value);
                            node.styleStr += styleAttrs[key] + ': ' + value + ';';
                        }
                    }
                }

                //临时记录source资源
                if(node.tag === 'source'){
                    results.source = node.attr.src;
                }

                if (unary) {
                    // if this tag doesn't have end tag
                    // like <img src="hoge.png"/>
                    // add to parents
                    var parent = bufArray[0] || results;
                    if (parent.nodes === undefined) {
                        parent.nodes = [];
                    }
                    parent.nodes.push(node);
                } else {
                    bufArray.unshift(node);
                }
            },
            end: function (tag) {
                //debug(tag);
                // merge into parent tag
                var node = bufArray.shift();
                if (node.tag !== tag) console.error('invalid state: mismatch end tag');

                //当有缓存source资源时于于video补上src资源
                if(node.tag === 'video' && results.source){
                    node.attr.src = results.source;
                    delete results.source;
                }

                if (bufArray.length === 0) {
                    results.nodes.push(node);
                } else {
                    var parent = bufArray[0];
                    if (parent.nodes === undefined) {
                        parent.nodes = [];
                    }
                    parent.nodes.push(node);
                }
            },
            chars: function (text) {
                //debug(text);
                var node = {
                    node: 'text',
                    text: text,
                    textArray:HtmlToJson.transEmojiStr(text)
                };

                if (bufArray.length === 0) {
                    node.index = index.toString()
                    index += 1
                    results.nodes.push(node);
                } else {
                    var parent = bufArray[0];
                    if (parent.nodes === undefined) {
                        parent.nodes = [];
                    }
                    node.index = parent.index + '.' + parent.nodes.length
                    parent.nodes.push(node);
                }
            },
            comment: function (text) {
                //debug(text);
                // var node = {
                //     node: 'comment',
                //     text: text,
                // };
                // var parent = bufArray[0];
                // if (parent.nodes === undefined) {
                //     parent.nodes = [];
                // }
                // parent.nodes.push(node);
            },
        });
        return results;
    }

    /**
     * 移除内容中的文档类型声明
     *
     * @param html string
     */
    static removeDOCTYPE(html) {
      html = html
        .replace(/<\?xml.*?>\n?/g, '')
        // .replace(/<\?xml.*\?>\n/, '')
        .replace(/<.*!doctype.*\>\n/, '')
        .replace(/<.*!DOCTYPE.*\>\n/, '');
      return html;
    }

    /**
     * 可能没用，不知道具体效果
     * 目前没有使用
     * @param html
     * @returns {void | string | never}
     */
    static formatCode(html) {
        html = html.replace(/&#39;/g, '\'');
        return html.replace(/(<code[\s\S]*?>)([\s\S]*?)(<\/code>)/g, function (a, b, c) {
            return hljs.highlightAuto(arguments[2]).value;
        });
    }

    /**
     * 删除注释内容
     * 
     * @param html string
     */
  static trimHtml(html) {
     html = html
      .replace(/<SPAN[^>]*?>/g, '')
      .replace(/<o:p>/g,'')
      .replace(/<!--.*?-->/ig, '')
      .replace(/\/\*.*?\*\//ig, '')
      .replace(/[ ]+</ig, '<');
      return html;
  }

  /**
   * 配置emoji表情
   * 
   * @param reg pattern
   * @param baseSrc string
   * @param emojis object
   */
  static emojisInit(reg='', baseSrc="/wxParse/emojis/", emojis) {
      __emojisReg = reg;
      __emojisBaseSrc=baseSrc;
      __emojis=emojis;
  }

    /**
     * 转换emoji字符串为表情图
     */
    static transEmojiStr(str){
        var emojiObjs = [];

        //如果正则表达式为空
        if(__emojisReg.length === 0 || !__emojis){
            var emojiObj = {}
            emojiObj.node = "text";
            emojiObj.text = str;
            array = [emojiObj];
            return array;
        }
        //这个地方需要调整
        str = str.replace(/\[([^\[\]]+)\]/g,':$1:')
        var eReg = new RegExp("[:]");
        var array = str.split(eReg);
        for(var i = 0; i < array.length; i++){
            var ele = array[i];
            var emojiObj = {};
            if(__emojis[ele]){
                emojiObj.node = "element";
                emojiObj.tag = "emoji";
                emojiObj.text = __emojis[ele];
                emojiObj.baseSrc= __emojisBaseSrc;
            }else{
                emojiObj.node = "text";
                emojiObj.text = ele;
            }
            emojiObjs.push(emojiObj);
        }

        return emojiObjs;
    }
}

export default HtmlToJson;
