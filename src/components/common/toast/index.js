import Toast from './Toast'

const obj = {}

/* 在main.js中注册*/

obj.install = function(Vue) {
  // 1.创建组件构造器
  const toastConstructor  = Vue.extend(Toast)

  // 2.通过new方法，根据组件构造器，可以创建出来一个新的组件对象
  const toast = new toastConstructor()

  // 3.将组件对象，手动挂载到某个dom元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的是div，直接在页面的body添加该组件
  document.body.appendChild(toast.$el)

  // 5.全局新增
  Vue.prototype.$toast = toast
}

export default obj
