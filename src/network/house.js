import { request1 } from "./request";

// 获取房源列表
export function getOwnerHouseList(ownerId, pageType) {
  return request1({
    url: '/api/house/list',
    params: {
      ownerId: ownerId,
      pageType: pageType,
    }
  })
}

// 删除房源
export function postDeleteHouse(houseItem) {
  return request1({
    url: '/api/house/delete',
    method: 'post',
    params: {
      id: houseItem.id,
      ownerId: houseItem.ownerId
    }
  })
}

// 更新房源
export function postUpdateHouse(updateHouseMessage) {
  return request1({
    url: 'api/house/update',
    method: 'post',
    params: {
      id: updateHouseMessage.id,
      ownerId: updateHouseMessage.ownerId,
    },
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      rent: updateHouseMessage.rent,
      rentCount: updateHouseMessage.rentCount,
      detail: updateHouseMessage.detail,
      state: updateHouseMessage.state,
      phone: updateHouseMessage.phone,
      currentIntermediaryId: updateHouseMessage.currentIntermediary.id,
      intermediaryId: updateHouseMessage.intermediaryId
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

// 新建房源
export function postNewHouse(newHouseMessage,pictures,ownerId) {
  return request1({
    url: 'api/house/new',
    method: 'post',
    params: {
      ownerId: ownerId
    },
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      houseName: newHouseMessage.houseName,
      houseType: newHouseMessage.houseType,
      location: newHouseMessage.location,
      direction: newHouseMessage.direction,
      floor: newHouseMessage.floor,
      roomType: newHouseMessage.roomType,
      rent: newHouseMessage.rent,
      detail: newHouseMessage.detail,
      house: pictures
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

// 获取房源类型列表
export function getHouseTypeList() {
  return request1({
    url: '/api/house/houseTypeList',
  })
}

// 初始化对应房源的设施配备
export function initFacilities(houseId,facilitiesImg) {
  return request1({
    url: 'api/house/init-facilities',
    method: 'post',
    params: {
      houseId: houseId
    },
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      facilitiesImg: facilitiesImg
    }
  })
}
