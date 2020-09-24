Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ''
    },
    default: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: ''
    },
    load: {
      type: String,
      value: ''
    },
    lazyLoad: {
      type: Boolean,
      value: false
    },
    styleStr: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 图片加载成功事件
     */
    handleImgLoaded: function (e) {
      this.setData({
        status: 1
      });
      this.triggerEvent('loadimg', e.detail);
    },

    /**
     * 图片加载失败，加载提供的默认占位图
     */
    handleLoadImgError: function () {
      this.setData({
        status: 2
      });
      this.triggerEvent('loadimgerr');
    },

    /**
     * 图片点击事件
     */
    handleTapImg: function () {
      const self = this;
      this.triggerEvent('tapimg', {
        src: self.properties.src
      });
    }
  }
})
