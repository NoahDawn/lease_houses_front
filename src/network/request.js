import axios from 'axios'

// 直接返回instance(执行完网络请求的axios对象)
export function request1(config) {
  // 此处配置为我自己的house_lease服务器

  // 3.1.创建axios实例对象
  const instance1 = axios.create({
    //baseURL: 'http://101.200.134.15:8000/',
    baseURL: 'http://127.0.0.1:8050/',
    timeout: 5000,
    /*headers: {"Content-Type":"multipart/form-data"}*/
  })


  // 3.2.axios的拦截器(axios.interceptors)

  // 3.2.1.请求拦截器(axios.interceptors.request)，使用时执行.use()
  // 参数1：方法1，参数为传入的网络请求axios对象
  // 参数2：方法2，参数传入失败反馈的信息
  instance1.interceptors.request.use(config => {
    /* 执行该方法情景：
    *  1. config中的某些信息不符合服务器要求，需要增加或者修改部分信息
    *  2. 每次发送网络请求时，希望在页面中显示加载动画
    *  3. 某些网络请求（比如登录（token）），必须携带某些信息，在此处进行判断
    * */
    /*console.log(config)*/
    // 网络请求发送成功需要放行,如果没有放行操作，那么请求失败，调用端执行.catch()
    return config
  }, err => {
    // 执行该方法意味着网络请求发送失败
    console.log(err)
  })

  // 3.2.2.相应拦截器(axios.interceptors.response)，使用时执行.use()
  // 参数1：方法1，参数为网络请求成功后获取的数据
  // 参数2：方法2，参数网络请求失败后反馈的信息
  instance1.interceptors.response.use(result => {
    /* 执行该方法情景：
    *  1. 删除网络请求到的数据中，被浏览器附加的某些配置信息
    * */
    /*console.log(result)*/
    // 请求到数据后需要放行，否则调用端执行获取的数据未undefined
    return result.data
  }, err => {
    // 执行该方法意味着网络请求获取失败
    console.log(err)
  })


  // 3.3.反馈网络请求后的结果
  // 与promise的返回类似，成功时返回默认执行了resolve(res)对象，失败时返回默认执行了reject(err)对象
  return instance1(config)
}
