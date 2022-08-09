import { request1 } from "./request";

// 输入账户
export function accountServer(userMessage, currentIndex) {
  return request1({
    url: 'api/user/getPwd',
    method: 'post',
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      username: userMessage.userName,
      currentIndex: currentIndex
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

// 身份验证
export function checkServer(userMessage, currentIndex) {
  return request1({
    url: 'api/user/getPwd',
    method: 'post',
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      username: userMessage.userName,
      phone: userMessage.phone,
      currentIndex: currentIndex
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

// 提交密码
export function pwdServer(userMessage, currentIndex) {
  return request1({
    url: 'api/user/getPwd',
    method: 'post',
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      username: userMessage.userName,
      password: userMessage.passWord,
      phone: userMessage.phone,
      currentIndex: currentIndex
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
