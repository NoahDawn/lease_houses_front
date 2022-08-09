<template>
  <!--注册顶部导航栏-->
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" @click="backLogin" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">用户注册</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "RegisterNavBar",
    components: {
      NavBar
    },
    methods: {
      // 回到登录页
      backLogin() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: #f7f7f7;
  }
  .back {
    display: flex;
    align-items: center;
    height: 44px;
    padding-left: 10px;
  }
</style>
