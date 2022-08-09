<template>
    <div class="profile-user">
      <!--导航栏设置部分-->
      <nav-bar>
        <div class="user-set" slot="right">
          <img src="~assets/img/profile/user/set.svg" alt="" align="right" @click="toSet">
        </div>
      </nav-bar>
      <div class="user-ms">
        <!--头像区域-->
        <div class="user-head-portrait">
          <img v-if="ifLogin" src="~assets/img/profile/user/user.svg" alt="">
          <img v-else :src="$store.state.loginUserMS.picture" alt="">
        </div>
        <!--个人信息区域/登陆注册按钮-->
        <div class="user-message" v-if="!ifLogin">
          <div class="user-user-name">{{$store.state.loginUserMS.realname}}</div>
          <div class="user-phone">{{phoneEncryption}}</div>
        </div>
        <div v-else @click="toLogin" class="login-or-register">登录/注册</div>
      </div>
    </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "ProfileUser",
    components: {
      NavBar
    },
    computed: {
      // 判断当前有没有登录，根据情况显示登录按钮或者登录信息
      ifLogin() {
        return this.$store.state.loginUserMS.id === 0
      },
      // 将本人的电话信息保密
      phoneEncryption() {
        let phone = this.$store.state.loginUserMS.phone.split('')
        phone.splice(2,7,'****')
        return phone.join('')
      }
    },
    methods: {
      // 点击后进入登录界面
      toLogin() {
        this.$router.push({
          path: "/login",
          query: {
            redirect: '/profile'
          }
        })
      },
      // 点击后进入设置页面
      toSet() {
        this.$router.push('/set')
      }
    }
  }
</script>

<style scoped>
  .profile-user {
    height: 30%;
  }
  .user-set {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user-set img {
    width: 25px;
    height: 25px;
  }
  .user-ms {
    display: flex;
    padding: 0 20px 20px 20px;
  }
  .user-head-portrait {
    background-color: lightskyblue;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
  }
  .user-head-portrait img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .user-message {
    width: calc(100% - 60px);
    padding-left: 20px;
    height: 60px;
  }
  .user-user-name {
    font-size: 18px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
  }
  .user-phone {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
  }
  .login-or-register {
    width: calc(100% - 60px);
    padding-left: 20px;
    line-height: 60px;
    font-weight: bold;
    font-size: 20px;
  }
</style>
