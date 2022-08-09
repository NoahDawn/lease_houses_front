<template>
    <div>
      <tab-bar>
        <!--此处的link是传递给TabBarItem的跳转路由，本体为字符串，所以不需要加':'动态绑定-->
        <tab-bar-item link="/home" activeColor="gray">
          <img slot="item-icon" src="~assets/img/tabBar/home.svg" alt="">
          <img slot="item-icon-active" src="~assets/img/tabBar/home_fill.svg" alt="">
          <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item link="/information" activeColor="gray">
          <img slot="item-icon" src="~assets/img/tabBar/information.svg" alt="">
          <img slot="item-icon-active" src="~assets/img/tabBar/information_fill.svg" alt="">
          <div slot="item-text">消息</div>
        </tab-bar-item>
        <tab-bar-item link="/follow" activeColor="gray">
          <img slot="item-icon" src="~assets/img/tabBar/follow.svg" alt="">
          <img slot="item-icon-active" src="~assets/img/tabBar/follow_fill.svg" alt="">
          <div slot="item-text">关注</div>
        </tab-bar-item>
        <tab-bar-item link="/profile" activeColor="gray">
          <img slot="item-icon" src="~assets/img/tabBar/profile.svg" alt="">
          <img slot="item-icon-active" src="~assets/img/tabBar/profile_fill.svg" alt="">
          <div slot="item-text">我的</div>
        </tab-bar-item>
      </tab-bar>
    </div>
</template>

<script>
    import TabBar from 'components/common/tabBar/TabBar'
    import TabBarItem from 'components/common/tabBar/TabBarItem'
    export default {
      name: "MainTabBar",
      components: {
        TabBar,
        TabBarItem
      }
    }
</script>

<style scoped>

</style>
