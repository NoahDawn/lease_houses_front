import { request1 } from "./request";

export function loginCheck(userMessage) {
  return request1({
    url: 'api/user/login',
    method: 'post',
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      username: userMessage.username,
      password: userMessage.password
    },
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'));
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
