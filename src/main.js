import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload'
import VueAMap from 'vue-amap'
import Router from 'vue-router'

import toast from 'components/common/toast'

Vue.config.productionTip = false

/* 此处在总组件中添加$bus作为事件总线对象，其余子组件可直接调用，而Vue对象可实现*/
Vue.prototype.$bus = new Vue()
/* 应用自封装的toast弹窗提示插件*/
Vue.use(toast)
/* 设置图片懒加载，加载完全前显示准备的替换样式*/
Vue.use(VueLazyLoad, {
  loading: require('@/assets/img/common/onloading.svg')
})
/* 设置高德地图应用*/
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  /* 参数说明：
    key： 高德的key
    plugin： 引用的插件（根据需要引入）
    v： 高德SDK 版本（默认1.4.4）
    uiVersion：UI库 版本
  */
  /* 此处的大坑：key的不同类型会导致坐标解码是否生效，此处的key时web js api类型*/
  key: '225afe0fad986f05989f1a789b4f41d6',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
})

// 当前版本的vue-router存在重复重定向的问题，尽量使用push，并将push重写
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
