// 初始的设施配备数据

export default function facilityData() {
  let facilityList =  [ // 设施配备数据

  ]

  for(let index = 0; index < 39; index++) {
    const realIndex = index+1

    let facilityObj = {
      id: realIndex,  // 扩展编号
      houseId: realIndex,  // 扩展房源编号
      washingMachine: 1,  // 扩展洗衣机
      airConditioner: 1,  // 扩展空调
      wardrobe: 1,  // 扩展衣柜
      television: 1,  // 扩展电视
      refrigerator: 1,  // 扩展冰箱
      heater: 1,  // 扩展热水器
      bed: 1,  // 扩展床
      heating: 0,  // 扩展暖气
      broadband: 1,  // 扩展宽带
      naturalGas: 1  // 扩展天然气
    }

    // 删除洗衣机
    if(realIndex === 8 || realIndex === 14 || realIndex === 19 || realIndex === 27 || realIndex === 30 || realIndex === 34) {
      facilityObj.washingMachine = 0
    }

    // 删除衣柜
    if(realIndex === 19 || realIndex === 27 || realIndex === 30) {
      facilityObj.wardrobe = 0
    }

    // 删除电视
    if(realIndex === 27 || realIndex === 28 || realIndex === 29 || realIndex === 30 || realIndex === 37) {
      facilityObj.television = 0
    }

    // 增加暖气
    if(realIndex === 27 || realIndex === 12 || realIndex === 18 || realIndex === 27 || realIndex === 35) {
      facilityObj.heating = 1
    }

    facilityList.push(facilityObj)
  }

  return facilityList
}
