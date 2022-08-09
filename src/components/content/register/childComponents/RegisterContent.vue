<template>
  <!--注册主内容-->
  <div class="register-content">
    <!--信息输入框-->
    <div class="content-input">
      <input type="text" v-model.lazy.trim="newUserMS.username" placeholder="请输入用户名" class="input-message" />
      <input type="text" v-model.lazy.trim="newUserMS.realname" placeholder="请输入真实姓名" class="input-message" />
      <input type="tel" v-model.lazy.trim="newUserMS.phone" placeholder="请输入手机号" class="input-message" />
      <input type="password" v-model.lazy.trim="newUserMS.password" placeholder="请输入密码" class="input-message" />
      <input type="password" v-model.lazy.trim="checkPwd" placeholder="请确认密码" class="input-message" />
    </div>

    <!--提交按钮-->
    <div class="content-submit">
      <button @click="newUser" class="submit-register">确认提交</button>
    </div>
  </div>
</template>

<script>
  import { exitCheck, registerUser } from "network/register";

  export default {
    name: "RegisterContent",
    data() {
      return {
        newUserMS: {
          username: '',
          realname: '',
          phone: '',
          password: ''
        },
        checkPwd: ''
      }
    },
    methods: {
      /* 非空检测*/
      emptyCheck() {
        if (!this.newUserMS.username || !this.newUserMS.realname || !this.newUserMS.phone ||
          !this.newUserMS.password || !this.checkPwd) {
          this.$toast.show('输入项不能为空', 2000, false)
          return false
        }
        return true
      },
      /* 密码一致检测*/
      pwdCheck() {
        if (this.newUserMS.password !== this.checkPwd) {
          this.$toast.show('两次密码不一致', 2000, false)
          this.checkPwd = ''
          return false
        }
        return true
      },
      /* 网络请求注册用户*/
      newUser() {
        if(this.emptyCheck() && this.pwdCheck()) {
          /* 重名检测*/
          registerUser(this.newUserMS).then(res => {
            if (res.ifExit) {
              this.$toast.show('该用户名已被注册', 2000, false)
              this.newUserMS.username = ''
            } else {
              if (res.data) {
                this.$toast.show('注册成功，为您跳转到登录界面', 2000, true)
                setTimeout(() => {
                  this.$router.replace({
                    path: '/login',
                    query: {
                      username: this.newUserMS.username,
                      password: this.newUserMS.password
                    }
                  })
                }, 2000)
              }
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .register-content {
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
    margin-top: 45px;
  }
  .submit-register {
    width: 100%;
    background-color: lightcoral;
    height: 35px;
    color: white;
    border: 1px solid lightcoral;
  }
</style>
