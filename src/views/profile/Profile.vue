<template>
  <div id="profile">
    <profile-user/>
    <div class="profile-title">我的工具</div>
    <profile-tools/>
    <div class="business">
      <div class="profile-title">我是业主</div>
      <!-- 此部分仅用于初始化数据，之后请注释 -->
      <div class="business-more" @click="initData">
        <div class="more-content">更多服务</div>
        <img src="~assets/img/common/right.svg" alt="">
      </div>
    </div>
    <profile-business/>
  </div>
</template>

<script>
  import ProfileUser from './childComponents/ProfileUser'
  import ProfileTools from './childComponents/ProfileTools'
  import ProfileBusiness from './childComponents/ProfileBusiness'

  export default {
    name: "Profile",
    components: {
      ProfileUser,
      ProfileTools,
      ProfileBusiness
    },
    methods: {
      // 跳转到初始化数据
      initData() {
        this.$router.push("/init")
      }
    }
  }
</script>

<style scoped>
  #profile {
    height: calc(100% - 49px);
  }
  .profile-title {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 20px 10px 20px;
    width: calc(100% - 105px);
  }
  .business {
    display: flex;
    height: 40px;
  }
  .business-more {
    width: 105px;
    padding: 10px 10px 0 0;
    display: flex;
  }
  .more-content {
    font-size: 14px;
    color: #5c6b77;
    height: 22px;
    line-height: 22px;
    font-weight: bold;
  }
  .business-more img {
    width: 25px;
    height: 25px;
    float: right;
  }
</style>
