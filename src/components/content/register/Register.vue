<template>
  <!--注册主页面-->
  <div id="register">
    <register-nav-bar></register-nav-bar>
    <register-content></register-content>
  </div>
</template>

<script>
  import RegisterNavBar from './childComponents/RegisterNavBar'
  import RegisterContent from './childComponents/RegisterContent'

  export default {
    name: "Register",
    components: {
      RegisterNavBar,
      RegisterContent
    }
  }
</script>

<style scoped>
  #register {
    /* 设定相对布局的页面，将fixed布局的tabBar遮盖，一定要设定背景颜色*/
    position: relative;
    height: 100vh;
    z-index: 10;
    background-color: white;
  }
</style>
