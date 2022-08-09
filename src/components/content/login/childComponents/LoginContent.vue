<template>
  <!--登录主内容-->
  <div class="login-content">
    <!--信息输入框-->
    <div class="content-input">
      <input type="text"
             placeholder="请输入用户名"
             class="input-message"
             v-model.trim="user.userName" />
      <input type="password"
             placeholder="请输入密码"
             class="input-message"
             v-model.trim="user.passWord" />
    </div>

    <!--确认按钮-->
    <div class="content-submit">
      <button type="button" @click="loginCheck" class="submit-login">登录</button>
    </div>

    <!--找回密码-->
    <div class="content-forget"><a href="#" class="forget-pass" @click="toGetPwd()">忘记密码</a></div>
  </div>
</template>

<script>
  import { loginCheck } from "network/login";

  export default {
    name: "LoginContent",
    data() {
      return {
        user: {
          userName: '',
          passWord: ''
        }
      }
    },
    props: {
      fromOtherPage: {
        type: Object,
        default() {
          return {
            username: '',
            password: ''
          }
        }
      },
      redirect: {  // 登陆后的跳转对象
        type: String,
        default: '/profile'
      }
    },
    mounted() {
      if(this.fromOtherPage.username) {
        this.user.userName = this.fromOtherPage.username
        this.user.passWord = this.fromOtherPage.password
      }
    },
    methods: {
      // 登陆验证
      loginCheck() {
        /* 判断输入项是否为空*/
        if (!this.user.userName || !this.user.passWord) {
          this.$toast.show('输入内容不能为空', 2000, false)
        } else {
          let userMessage = {
            username: this.user.userName,
            password: this.user.passWord
          }
          /* 网络请求进行登录验证*/
          loginCheck(userMessage).then(res => {
            if (res.loginUserMS) {
              /* 将登录返回的数据保存到vuex，显示登录情况，两秒后页面跳转*/
              this.$store.state.loginUserMS = res.loginUserMS
              this.$toast.show("登录验证成功", 2000, true)
              setTimeout(() => {
                this.$router.push(this.redirect)
              }, 2000)
            } else {
              this.$toast.show("用户名不存在或密码错误", 2000, false)
              this.user.passWord = ""
            }
          })
        }
      },
      // 密码找回
      toGetPwd() {
        this.$router.push({
          path: '/getPwd',
          query: {
            userName: this.user.userName
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-content {
    position: relative;
    height: calc(100% - 44px);
  }
  .content-input {
    padding: 0 10px 0;
  }
  .input-message {
    width: 100%;
    margin-top: 15px;
    height: 40px;
    background-color: #f7f7f7;
    border: 1px solid #eee;
    font-size: 14px;
    padding-left: 5px;
  }
  .content-submit {
    padding: 0 10px 0;
    margin-top: 30px;
  }
  .submit-login {
    width: 100%;
    background-color: lightcoral;
    height: 35px;
    color: white;
    border: 1px solid lightcoral;
  }
  .content-forget {
    margin-top: 20px;
  }
  .forget-pass {
    float: right;
    color: black;
    margin-right: 10px;
    font-size: 15px;
  }
</style>
