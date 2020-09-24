import wxparse from './wxparse/wxParse.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    emoji: {
      type: Boolean,
      value: false,
      observer: function () {
        this.render();
      }
    },
    data: {
      type: String,
      value: '',
      observer: function () {
        this.render();
      }
    },
    type: {
      type: String,
      value: 'html',
      observer: function () {
        this.render();
      }
    },
    padding: {
      type: Number,
      value: 0,
      observer: function () {
        this.render();
      }
    },
    urlPrefix: {
      type: String,
      value: '',
      observer: function () {
        this.render();
      }
    },
    defaultImg: {
      type: String,
      value: '',
      observer: function () {
        this.render();
      }
    },
    imgSuffix: {
      type:String,
      value: '',
      observer: function () {
        this.render();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    realWindowWidth: 0,
    realWindowHeight: 0
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached: function () {
      const self = this;
      const systemInfo = wx.getSystemInfoSync();
      self.data.realWindowWidth = systemInfo.windowWidth;
      self.data.realWindowHeight = systemInfo.windowHeight;
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 图片视觉宽高计算函数区 
     */
    handleLoadWxparseImg: function (e) {
      var that = this;
      var tagFrom = e.target.dataset.from;
      var idx = e.target.dataset.idx;
      if(typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
        that.calMoreImageInfo(e, idx, that, tagFrom);
      }
      that.triggerEvent('loadimg', e);
    },

    /**
     * 图片加载出错事件
     */
    handleLoadWxparseImgError: function (e) {
      this.triggerEvent('loadimgerr', e);
    },

    /**
     * 计算视觉优先的图片宽高
     */
    wxAutoImageCal: function (originalWidth, originalHeight, that, bindName) {
      //获取图片的原始长宽
      var windowWidth = 0, windowHeight = 0;
      var autoWidth = 0, autoHeight = 0;
      var results = {};
      var padding = that.data[bindName].view.imagePadding;
      windowWidth = that.data.realWindowWidth - 2 * padding;
      windowHeight = that.data.realWindowHeight;
      //判断按照那种方式进行缩放
      // console.log("windowWidth" + windowWidth);
      if(originalWidth > windowWidth) {//在图片width大于手机屏幕width时候
        autoWidth = windowWidth;
        // console.log("autoWidth" + autoWidth);
        autoHeight = (autoWidth * originalHeight) / originalWidth;
        // console.log("autoHeight" + autoHeight);
        results.imageWidth = autoWidth;
        results.imageheight = autoHeight;
      } else {//否则展示原来的数据
        results.imageWidth = originalWidth;
        results.imageheight = originalHeight;
      }
      return results;
    },

    /**
     * 假循环获取计算图片视觉最佳宽高
     */
    calMoreImageInfo: function (e, idx, that, bindName) {
      const temData = that.data[bindName];
      if(!temData || temData.images.length === 0) {
        return;
      }
      const temImages = temData.images;
      //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
      var recal = that.wxAutoImageCal(e.detail.width, e.detail.height, that, bindName);
      var index = temImages[idx].index;
      var key = `${bindName}`;
      for (var i of index.split('.')) key += `.nodes[${i}]`;
      var keyW = key + '.width';
      var keyH = key + '.height';

      that.setData({
        [keyW]: recal.imageWidth,
        [keyH]: recal.imageheight,
      });
    },

    // 图片点击事件
    handleTapWxparseImg: function (e) {
      const self = this;

      var nowImgUrl = e.target.dataset.src;
      var tagFrom = e.target.dataset.from;
      
      let urls = [];
      if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
        urls = self.data[tagFrom].imageUrls;
        wx.previewImage({
          current: nowImgUrl, // 当前显示图片的http链接
          urls: self.data[tagFrom].imageUrls // 需要预览的图片http链接列表
        });
      }

      self.triggerEvent('tapimg', {
        url: e.target.dataset.src,
        urls: urls
      });
    },

    /**
     * 渲染
     */
    render: function () {
      const self = this;
      console.log(self.properties)

      let parse = new wxparse(self.properties.data, self, {
        type: self.properties.type,
        bindName: 'article',
        image: {
          default: self.properties.defaultImg,
          prefix: self.properties.urlPrefix,
          padding: self.properties.padding,
          suffix: self.properties.imgSuffix
        },
        emoji: self.properties.emoji
      });
      parse.render();

      // wxparse.parse(
      //     'article',
      //     this.properties.type,
      //     this.properties.data,
      //     this,
      //     this.properties.padding,
      //     this.properties.urlPrefix,
      //     this.properties.defaultImg
      // );
    },

    /**
     * 处理链接点击事件
     */
    wxParseTagATap: function (e) {
      this.triggerEvent('linkClick', e.currentTarget.dataset);
      // wx.setClipboardData({ data: e.currentTarget.dataset.src });
      console.log(e)
      wx.downloadFile({
        url: e.currentTarget.dataset.src,
        success: res => {
          if(res.statusCode === 200){
            var filePath = res.tempFilePath;
            wx.openDocument({
              filePath: filePath,
              showMenu: true,
              success: res => {
                console.log('成功')
              }
            })
          }
        }
      })
    }
  }
});
