<template>
  <!--登录总页面-->
  <div id="login">
    <login-nav-bar></login-nav-bar>
    <login-content
      :from-other-page="fromOtherPage" :redirect="redirect"></login-content>
  </div>
</template>

<script>
  import LoginNavBar from './childComponents/LoginNavBar'
  import LoginContent from './childComponents/LoginContent'

  export default {
    name: "Login",
    data() {
      return {
        fromOtherPage: {   // 从注册或者找回密码回到登录页的传参
          username: '',
          password: ''
        },
        redirect: '/profile'  // 进入登录前的路由，创建后更改，默认个人主页
      }
    },
    components: {
      LoginContent,
      LoginNavBar
    },
    /* 创建时接受从注册页面或者密码找回页面传来的登录用户信息，若直接登录则默认值为''*/
    created() {
      this.fromOtherPage.username = this.$route.query.username || ''
      this.fromOtherPage.password = this.$route.query.password || ''
      this.redirect = this.$route.query.redirect
    }
  }
</script>

<style scoped>
  #login {
    /* 设定相对布局的页面，将fixed布局的tabBar遮盖，一定要设定背景颜色*/
    position: relative;
    height: 100vh;
    z-index: 10;
    background-color: white;
  }
</style>
