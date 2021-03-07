const API = {
  // 主域名
  DOMAIN: 'https://focus.fmg.net.cn',
  // 图片域名
  IMG_DOMAIN: 'https://focus.fmg.net.cn',

  // 轮播图
  BANNER: {
    GREATMOMENT: '/greatMomentBannerListView',  // 精彩瞬间
    TRAINING: '/trainingBannerListView',  // 专业培训
    SPECIALCOURSES: '/specialCoursesBannerListView',  // 特色项目
    ACTIVITIESCONTENT: '/activitiesContentBannerListView' // 活动内容
  },

  // 数据列表
  COURSE: '/specialProjectsListView', // 特色项目
  MEETING: '/meetingSynergiaListViewSet', // 会议增效
  TEAMSTUDY: '/teamStudyListView',  // 团队学习
  SCR: '/cSRListView',  // csr

  // 根据类别获取数据
  GETBYCATEGORY: '/goodsListViewSetByCategory?category_id='
}

export default API;
