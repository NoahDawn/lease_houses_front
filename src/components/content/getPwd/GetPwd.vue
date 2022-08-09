<template>
  <div id="getPwd">
    <!--找回密码顶部导航-->
    <get-pwd-nav-bar/>
    <!--找回密码栏目和过程-->
    <get-pwd-process :current-index="currentIndex"/>

    <!--找回密码过程内容-->
    <div class="input">
      <!--填写账号-->
      <div class="content-input" v-if="currentIndex === 0">
        <input type="text"
               placeholder="请输入修改密码的用户名"
               class="input-message"
               v-model.trim="user.userName" />
        <div class="verify">
          <input type="text"
                 placeholder="请输入验证码"
                 class="input-verify"
                 v-model.trim="code" />
          <div class="verify-code"></div>
        </div>
        <div class="verify-tips">*验证码不区分大小写</div>
      </div>
      <!--身份验证-->
      <div class="content-input" v-if="currentIndex === 1">
        <input type="text"
               placeholder="请输入您的手机号"
               class="input-message"
               v-model.trim="user.phone" />
      </div>
      <!--重置密码-->
      <div class="content-input" v-if="currentIndex === 2">
        <input type="password"
               placeholder="请输入新密码"
               class="input-message"
               v-model.trim="user.passWord" />
        <input type="password"
               placeholder="请重复新密码"
               class="input-message"
               v-model.trim="user.rePassWord" />
      </div>
      <!--重置完成-->
      <div class="content-input" v-if="currentIndex === 3">
        <p><img class="success" src="~/assets/img/getPwd/success.svg" alt=""></p>
        <div class="tips">正在为您跳转页面......</div>
      </div>
    </div>
    <div class="button" :class="{button_check: !ifFirstAndLast}">
      <button v-if="ifFirstAndLast" @click="btnBefore()">上一步</button>
      <button v-if="currentIndex !== 3" @click="btnAfter()">确认</button>
    </div>
  </div>
</template>

<script>
  import GetPwdNavBar from './childComponents/GetPwdNavBar'
  import GetPwdProcess from "./childComponents/GetPwdProcess"

  import {accountServer, checkServer, pwdServer} from 'network/getPwd'

  export default {
    name: "GetPwd",
    data() {
      return {
        user: {
          userName: "",
          phone: "",
          passWord: "",
          rePassWord: ""
        },
        currentIndex: 0,
        code: ""
      }
    },
    components: {
      GetPwdNavBar,
      GetPwdProcess
    },
    mounted() {
      this.user.userName = this.$route.query.userName
      this.verifyCode(2)
    },
    computed: {
      /* 判断当前是否是填写账号和重置完成*/
      ifFirstAndLast() {
        return (this.currentIndex !== 0 && this.currentIndex !== 3)
      }
    },
    methods: {
      // 上一步
      btnBefore() {
        this.currentIndex --
        // 若回退到填写账号，则刷新生成验证码和输入框中的验证码
        if (this.currentIndex === 0) {
          // 等到dom加载完毕后再生成验证码，否则会出现innerText对象不存在的报错
          this.$nextTick(() => {
            this.code = ""
            this.verifyCode(2)
          })
        }
      },
      // 确认按钮，根据currentIndex执行不同的业务
      btnAfter() {
        switch(this.currentIndex) {
          case 0: this.accountCheck();break;
          case 1: this.identityCheck();break;
          case 2: this.pwdCheck();break;
          default:
        }
      },
      // 帐号填写确认
      accountCheck() {
        // 先查看验证码是否无误
        if (this.ifCodeOK()) {
          if (!this.user.userName) {
            this.$toast.show("用户名不能为空", 2000, false)
            this.code = ""
            this.verifyCode(2)
          } else {
            accountServer(this.user, this.currentIndex).then(res => {
              if (res.ifExit) {
                this.currentIndex ++
              } else {
                this.$toast.show("用户名错误或不存在", 2000, false)
                this.code = ""
                this.verifyCode(2)
              }
            })
          }
        }
      },
      // 身份验证确认
      identityCheck() {
        if (!this.user.phone) {
          this.$toast.show("手机号不能为空", 2000, false)
        } else {
          checkServer(this.user, this.currentIndex).then(res => {
            if (res.ifRight) {
              this.currentIndex ++
            } else {
              this.$toast.show("身份验证错误", 2000, false)
            }
          })
        }
      },
      // 重置密码确认
      pwdCheck() {
        if (!this.user.passWord || !this.user.rePassWord) {
          this.$toast.show("密码项不能为空", 2000, false)
        } else if (this.user.passWord !== this.user.rePassWord) {
          this.$toast.show("两次密码不一致", 2000, false)
          this.user.rePassWord = ""
        } else {
          pwdServer(this.user, this.currentIndex).then(res => {
            if (res.ifChange) {
              this.currentIndex ++
              this.successToLogin()
            } else {
              this.$toast.show("密码修改出错", 2000, false)
            }
          })
        }
      },
      // 修改成功后页面跳转到登录页面
      successToLogin() {
        if (this.currentIndex === 3) {
          setTimeout(() => {
            this.$router.replace({
              path: '/login',
              query: {
                username: this.user.userName,
                password: this.user.passWord
              }
            })
          }, 3000)
        }
      },
      // 随机生成4位验证码
      verifyCode(count) {
        var code = document.querySelector(".verify-code")
        var letter = []
        var num = []
        var verify = []

        // 生成2位随机0~10的数字
        function randomNum(count) {
          for (let n = 0; n < count; n++) {
            num.push(parseInt(Math.random()*9))
          }
        }

        // 生成2位随机A~Z的字母
        function randomLetter(count) {
          for (let m = 0; m < count; m++) {
            // A~Z的ascll码差值为25
            let ascll = parseInt(Math.random()*25)
            // 将ascll码转义为字符
            letter.push(String.fromCharCode(65 + ascll))
          }
        }

        randomLetter(count)
        randomNum(count)

        // 将随机数与随机字母间接组合
        for (let y = 0; y < count; y++) {
          verify.push(num[y])
          verify.push(letter[y])
        }

        code.innerText = verify.join("  ")
      },
      // 验证码验证
      ifCodeOK() {
        if(!this.code) {
          this.$toast.show("请输入验证码", 1000, false)
        } else if (!this.ifSame()) {
          this.$toast.show("验证码错误", 1000, false)
          this.code = ""
        } else {
          return true
        }
        this.verifyCode(2)
        return false
      },
      // 对比值
      ifSame() {
        var inputCode = document.querySelector(".input-verify").value.toUpperCase()
        var createdCode = document.querySelector(".verify-code").innerText
        // 正则匹配消除所有的空格
        createdCode = createdCode.replace(/\s/g,"")
        console.log(inputCode)
        console.log(createdCode)
        return inputCode === createdCode
      }
    }
  }
</script>

<style scoped>
  #getPwd {
    position: relative;
    height: 100vh;
    width: 100vw;
    z-index: 10;
    background-color: white;
  }

  .content-input {
    margin: 40px 0 30px;
  }
  .input-verify {
    width: 45%;
  }
  .input-message, .verify {
    width: 60%;
    margin: 15px 20% 0;
  }
  .input-message, .input-verify {
    height: 40px;
    border: 1px solid silver;
    font-size: 14px;
    padding-left: 5px;
  }
  .verify {
    display: flex;
    height: 40px;
    justify-content: space-between;
  }
  .verify-code {
    background-color: #ff8198;
    height: 40px;
    display: inline-block;
    width: 45%;
    color: white;
    opacity: 70%;
    text-align: center;
    line-height: 40px;
  }
  .verify-tips {
    color: red;
    margin: 10px 0 0 20%;
    font-size: 12px;
  }

  .button {
    margin: 0 20%;
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .button button {
    width: 45%;
    height: 30px;
    background-color: #ff8198;
    border-radius: 6px;
    border: 1px solid #ff8198;
    color: white;
  }
  .button_check {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    text-align: center;
  }
  .success {
    width: 130px;
    height: 130px;
  }
  .tips {
    text-align: center;
    margin-top: 10px;
  }
</style>
