export default {
  pages: [
    'pages/index/index',
    'pages/course/index',
    'pages/course/course-list/index',
    'pages/site/index',
    'pages/user/index',
    'pages/activity-list/index',
    'pages/search-list/index',
    'pages/detail/index',
    'pages/moment/index',
    'pages/moment/comment-list/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Focus',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [{
      pagePath: 'pages/index/index',
      text: '首页',
      iconPath: 'assets/tabBarIcon/home.png',
      selectedIconPath: 'assets/tabBarIcon/home-selected.png'
    }, {
      pagePath: 'pages/course/index',
      text: '课程',
      iconPath: 'assets/tabBarIcon/course.png',
      selectedIconPath: 'assets/tabBarIcon/course-selected.png'
    }, {
      pagePath: 'pages/site/index',
      text: '场地',
      iconPath: 'assets/tabBarIcon/site.png',
      selectedIconPath: 'assets/tabBarIcon/site-selected.png'
    }, {
      pagePath: 'pages/user/index',
      text: '我的',
      iconPath: 'assets/tabBarIcon/user.png',
      selectedIconPath: 'assets/tabBarIcon/user-selected.png'
    }],
    color: '#000',
    selectedColor: '#d81e06',
    backgroundColor: '#fff',
    borderStyle: 'black'
  }
}
