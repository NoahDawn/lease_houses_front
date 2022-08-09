import { request1 } from "./request";

// 获取经纪人列表
export function getIntermediaryList(userId) {
  return request1({
    url: 'api/intermediary/list-intermediary',
    params: {
      userId: userId
    }
  })
}

// 获取委托列表
export function getEntrustList(userId,getType='') {
  return request1({
    url: 'api/intermediary/entrust-list',
    params: {
      userId: userId,
      getType: getType
    }
  })
}

// 委托经纪人
export function intermediaryEntrust(userId, intermediaryId) {
  return request1({
    url: 'api/intermediary/entrust-new',
    params: {
      userId: userId,
      intermediaryId: intermediaryId,
    }
  })
}

// 委托卸任
export function entrustFire(userId, intermediaryId) {
  return request1({
    url: 'api/intermediary/entrust-fire',
    params: {
      userId: userId,
      intermediaryId: intermediaryId,
    }
  })
}
