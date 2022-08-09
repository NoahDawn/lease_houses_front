// 初始的委托关系数据

export default function entrustData() {
  let entrustList =  [ // 委托数据

  ]

  for(let index = 0; index < 39; index++) {
    const entrustObj = {}
    const realIndex = index + 1

    // 略过失效房源
    if(realIndex !== 5 && realIndex !== 19 && realIndex !== 24) {
      entrustObj.mission = 1  // 扩展任务状态
      entrustObj.id = realIndex  // 扩展委托编号
      entrustObj.resHouseId = realIndex  // 扩展负责房源编号

      if(index >= 0 && index < 20) {
        entrustObj.userId = 1  // 扩展委托人编号
        entrustObj.intermediaryId = 1  // 扩展经纪人编号
      } else if(index >= 20 && index < 30) {
        entrustObj.userId = 2  // 扩展委托人编号
        entrustObj.intermediaryId = 4  // 扩展经纪人编号
      } else if(index >= 30 && index < 40) {
        entrustObj.userId = 3  // 扩展委托人编号
        entrustObj.intermediaryId = 2  // 扩展经纪人编号
      }

      entrustList.push(entrustObj)
    }
  }

  return entrustList
}
