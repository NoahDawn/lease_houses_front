import { request1 } from "./request";

export function getHouseList(theType, page, maxEveryCount, keyword) {
  return request1({
    url: '/api/house/list',
    params: {
      theType: theType,
      page: page,
      maxEveryCount: maxEveryCount,
      keyword: keyword
    }
  })
}
