import { request1 } from "./request";

// 更改钱包余额
export function changeWallet(userId, cost) {
  return request1({
    url: 'api/user/wallet',
    params: {
      userId: userId,
      cost: cost,
    }
  })
}

// 获取用户个人信息
export function getUserDetail(userId) {
  return request1({
    url: 'api/user/detail',
    params: {
      userId: userId,
    }
  })
}
