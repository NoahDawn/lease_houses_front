import { request1 } from "./request";

export function getRecord(myId) {
  return request1({
    url: 'api/record/list',
    params: {
      myId: myId
    }
  })
}
