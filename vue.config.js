module.exports = {
  /* 设置文件的简洁路径*/
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'router': '@/router',
        'store': '@/redux',
        'views': '@/views'
      }
    }
  },
  /* 项目启动后的title*/
  chainWebpack: config =>{
    config.plugin('html')
      .tap(args => {
        args[0].title = "贝士租房";
        return args;
      })
  },
  /* 项目启动后的图标*/
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}
