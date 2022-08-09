<template>
  <div id="app">
    <!--exclude内容不能加空格作为间隔，否则不生效-->
    <keep-alive :exclude="excludeComponents">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  },
  computed: {
    excludeComponents() {
      // 首页下相关的组件(房源详情页，留言消息页，订单发起页)
      let home = 'Detail,AllNews,Order,'
      // 系统消息下相关的组件()
      let information = 'Information,'
      // 收藏下相关的组件(收藏页)
      let follow = 'Follow,'
      // 个人主页下相关的组件(浏览记录页，订单列表页，登录页，注册页，密码找回页，房源管理列表页，房源修改页，设置页，地图定位页，钱包页，优惠券页，点评页，委托经纪人页，个人经纪人页)
      let profile = 'Record,TheOrder,Login,Register,GetPwd,HouseManage,TheHouse,Set,Map,Wallet,Coupon,Comment,Intermediary,Entrust'
      return home + information + follow + profile
    }
  }
}
</script>

<style>
  @import url('./assets/css/base.css');
</style>
