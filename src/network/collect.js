import { request1 } from "./request";

// 查询收藏状态
export function getCollectType(userId, houseId) {
  return request1({
    url: 'api/collect/getType',
    params: {
      userId: userId,
      houseId: houseId
    }
  })
}

// 保存收藏记录
export function newCollectData(houseId, userId) {
  return request1({
    url: 'api/collect/newCollect',
    method: 'post',
    params: {
      houseId: houseId,
      userId: userId
    }
  })
}

// 获取收藏列表
export function getCollectList(userId) {
  return request1({
    url: 'api/collect/collectList',
    params: {
      userId: userId
    }
  })
}

// 删除收藏记录
export function deleteCollectData(collectDeleteList,type) {
  return request1({
    url: 'api/collect/deleteCollect',
    method: 'post',
    params: {
      type: type
    },
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      collectDeleteList: collectDeleteList
    }
  })
}
