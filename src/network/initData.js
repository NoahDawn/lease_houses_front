import { request1 } from "./request";

// 初始化委托数据
export function initEntrustData(entrustDataList) {
  return request1({
    url: 'api/init/entrust',
    method: 'post',
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      entrustDataList: entrustDataList
    }
  })
}

// 初始化经纪人数据
export function initIntermediaryData(intermediaryDataList) {
  return request1({
    url: 'api/init/intermediary',
    method: 'post',
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      intermediaryDataList: intermediaryDataList
    }
  })
}

// 初始化房源数据
export function initHouseData(houseDataList) {
  return request1({
    url: 'api/init/house',
    method: 'post',
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      houseDataList: houseDataList
    }
  })
}

// 初始化设施配备数据
export function initFacilityData(facilityDataList) {
  return request1({
    url: 'api/init/facility',
    method: 'post',
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      facilityDataList: facilityDataList
    }
  })
}

// 初始化用户数据
export function initUserData(userDataList) {
  return request1({
    url: 'api/init/user',
    method: 'post',
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      userDataList: userDataList
    }
  })
}

// 初始化订单数据
export function initOrderData(orderDataList) {
  return request1({
    url: 'api/init/order',
    method: 'post',
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      orderDataList: orderDataList
    }
  })
}
