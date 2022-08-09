import { request1 } from "./request";

// 获取订单列表
export function getOrderList(myid, type) {
  return request1({
    url: 'api/order/list',
    params: {
      myid: myid,
      type: type
    }
  })
}

// 判断当前订单是否重复发起
export function ifReOrder(houseId, renterId) {
  return request1({
    url: 'api/order/ifOrderExit',
    params: {
      houseId: houseId,
      renterId: renterId
    }
  })
}

// 提交新订单
export function postNewOrder(orderPost) {
  return request1({
    url: '/api/order/new',
    method: 'post',
    params: {
      myid: orderPost.myId,
      houseid: orderPost.houseId
    },
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      month: orderPost.rentMonth,
      detail: orderPost.detail,
      invalidTime: orderPost.invalidTime
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

// 提交订单确认态度
export function postOrderCheck(orderCheckPost) {
  return request1({
    url: 'api/order/updatestatus',
    method: 'post',
    params: {
      id: orderCheckPost.id,
      myid: orderCheckPost.myid,
      type: orderCheckPost.type,
      confirm: orderCheckPost.confirm
    }
  })
}

// 将逾期订单信息插入订单状态表
export function insertOrderState(userId, orderId, orderType) {
  return request1({
    url: 'api/order/insert-orderState',
    method: 'post',
    data: {
      userId: userId,
      orderId: orderId,
      orderType: orderType
    }
  })
}
