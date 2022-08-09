export default {
  // 存储当前房源信息，当前用户的存储状态
  storageCollectType(state, payLoad) {
    state.loginUserMS.currentCollect = payLoad
  },
  // 改变当前房源的存储状态
  collectTypeChange(state, payLoad) {
    if(state.loginUserMS.currentCollect) {
      let currentType = state.loginUserMS.currentCollect.currentType
      if(currentType === 1) {
        // 更改为未收藏
        state.loginUserMS.currentCollect.currentType = 0
      } else {
        // 更改为已收藏
        state.loginUserMS.currentCollect.currentType = 1
      }
    }
  }
}
