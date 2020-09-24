import showdown from './showdown.js';
import htmlToJson from './html2json.js';

class WxParse
{
  /**
   * 默认配置
   * @type Object
   */
  static config = {
    type: 'html', // 原始数据的类型，可选值markdown/md/html
    bindName: 'wxParseData', // 绑定的组件或者页面变量
    image: { // 解析图片时的一些扩展配置
      padding: 0,
      default: '',
      prefix: '',
      suffix: ''
    },
    emoji: false // 是否将符号转义为emoji表情
  };

  /**
   * 构造方法，构造解析类对象
   * 通过传入的配置信息，确定解析流程
   * @param data String 要解析的原始数据,markdown或者html字符串
   * @param target Object 小程序页面或者组件对象
   * @param config Object 配置
   */
  constructor (data, target, config={}) {
    this.data = this.html = data;
    this.target = target;
    this.config = Object.assign({}, WxParse.config, config);
  }

  /**
   * 解析并渲染数据
   */
  render () {
    const self = this;
    const bindData = {};

    // 准备用于渲染的数据
    if (self.config.type === 'md' || self.config.type === 'markdown') {
      let converter = new showdown.Converter();
      self.html = converter.makeHtml(self.data);
    }
    bindData[self.config.bindName] = htmlToJson.html2json(self.html, self.config.bindName, self.config.image.prefix, self.config.image.default, self.config.image.suffix);
    bindData[self.config.bindName].view = {};
    bindData[self.config.bindName].view.imagePadding = typeof (imagePadding) != 'undefined' ? imagePadding : 0;

    if (self.config.emoji) {
      this.setEmoji();
    }

    // 渲染并触发渲染完成事件
    self.target.setData(bindData);
    self.target.triggerEvent('rendered');
  }

  /**
   * 设置开启emoji
   */
  setEmoji () {
    let obj = {};
    for (let i = 0; i <= 134; i++) {
      let index = i;
      if (i < 10) {
        index = "0" + i;
      }
      obj[index] = index + ".gif";
    }
    htmlToJson.emojisInit('[]', "./wxparse/emojis/", obj);
  }

  static wxParseTemArray(temArrayName, bindNameReg, total, that) {
    let array = [];
    let temData = that.data;
    let obj = null;
    for (let i = 0; i < total; i++) {
      let simArr = temData[bindNameReg + i].nodes;
      array.push(simArr);
    }

    temArrayName = temArrayName || 'wxParseTemArray';
    obj = JSON.parse('{"' + temArrayName + '":""}');
    obj[temArrayName] = array;
    that.setData(obj);
  }
}

export default WxParse;
