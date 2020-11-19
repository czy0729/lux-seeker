export default {
  pages: [
    'pages/index/index',
    'pages/tick/index',
    'pages/setting/index',
    'pages/home/index',
    'pages/docking/index'
  ],
  window: {
    backgroundColor: '#191919',
    backgroundColorBottom: '#191919',
    backgroundColorTop: '#191919',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#191919',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '云知光灯光捕手'
  },
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#000000',
    backgroundColor: '#000000',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/tick/index',
        text: '逐点测量'
      },
      {
        pagePath: 'pages/setting/index',
        text: '设置'
      }
    ]
  }
}
