<template>
  <!--登录顶部导航栏-->
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" @click="backProfile" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">密码登录</div>
      <div slot="right" class="register">
        <button @click="toRegister" class="register-button">注册</button>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "LoginNavBar",
    components: {
      NavBar
    },
    methods: {
      // 返回个人主页
      backProfile() {
        this.$router.back()
      },
      // 转去注册页
      toRegister() {
        this.$router.push('/register')
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
  .register {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
  }
  .register-button {
    background-color: white;
    font-size: 14px;
    border: 1px solid lightskyblue;
    border-radius: 8px;
    color: lightskyblue;
    height: 65%;
    width: 75%;
  }
</style>
