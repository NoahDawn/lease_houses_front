export default {
  // 获取登录信息
  getLoginUserMS(state) {
    if (state.loginUserMS.id !== 0) {
      return state.loginUserMS
    } else {
      return false
    }
  }
}
