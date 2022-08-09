import { request1} from "./request";

export function getHouseDetail(houseid, myid) {
  return request1({
    url: '/api/house/detail',
    params: {
      houseid: houseid,
      myid: myid
    }
  })
}

export function getHouseNews(houseId) {
  return request1({
    url: '/api/news/list-comment',
    params: {
      houseId: houseId
    }
  })
}

export function getHouseMain(houseId) {
  return request1({
    url: '/api/house/main',
    params: {
      houseid: houseId
    }
  })
}

/* es6的类对象构造写法，用于复杂的多层级结构的数据，此处模拟，自身数据比较简单*/
export class House {
  constructor(id, houseName, houseType, location, direction, floor,
              roomType, rent, owner, ownerId, phone, detail,
              rentCount, area, occupancy, leaseTerm, houseInspection,
              facilities, shelfTime, intermediary) {
    this.id = id
    this.houseName = houseName
    this.houseType = houseType
    this.location = location
    this.direction = direction
    this.floor = floor
    this.roomType = roomType
    this.rent = rent
    this.owner = owner
    this.ownerId = ownerId
    this.phone = phone
    this.detail = detail
    this.rentCount = rentCount
    this.area = area
    this.occupancy = occupancy
    this.leaseTerm = leaseTerm
    this.houseInspection = houseInspection
    this.facilities = facilities
    this.shelfTime = shelfTime
    this.intermediary = intermediary
  }
}
