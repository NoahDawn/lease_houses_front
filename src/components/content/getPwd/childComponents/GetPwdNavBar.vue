<template>
  <div class="nav-bar">
    <nav-bar>
      <div slot="left" @click="backLogin" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">密码找回</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "GetPwdNavBar",
    components: {
      NavBar
    },
    methods: {
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
