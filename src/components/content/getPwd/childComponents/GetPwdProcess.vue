<template>
  <div class="get-pwd-process">
    <div class="security-title">
      <img class="security_center" src="~/assets/img/getPwd/security_center.svg" alt="">
      <div class="security_ms">
        <span class="ms-left">安全中心 | 重置密码</span>
        <span class="ms-right" @click="toLogin()">登录</span>
      </div>
    </div>
    <div class="process_item">
      <div class="process_content" v-for="(item,index) in process">
        <div class="process_image">
          <img v-if="index === currentIndex" :src="item.imageFill" alt="">
          <img v-else :src="item.image" alt="">
          <div class="process_title" :class="{process_title_fill:index === currentIndex}">{{item.title}}</div>
        </div>
        <div v-if="ifInterval(index)">
          <img v-if="index === currentIndex" src="~assets/img/getPwd/process_line_fill.svg" class="interval" alt="">
          <img v-else src="~assets/img/getPwd/process_line.svg" class="interval" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GetPwdProcess",
    data() {
      return {
        process: [
          {image:require('@/assets/img/getPwd/process_account.svg'),
           imageFill:require('@/assets/img/getPwd/process_account_fill.svg'),
           title:"填写账号"},
          {image:require('@/assets/img/getPwd/process_check.svg'),
            imageFill:require('@/assets/img/getPwd/process_check_fill.svg'),
            title:"身份验证"},
          {image:require('@/assets/img/getPwd/process_pwd.svg'),
            imageFill:require('@/assets/img/getPwd/process_pwd_fill.svg'),
            title:"重置密码"},
          {image:require('@/assets/img/getPwd/process_success.svg'),
            imageFill:require('@/assets/img/getPwd/process_success_fill.svg'),
            title:"重置完成"}
        ]
      }
    },
    props: {
      currentIndex: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    methods: {
      ifInterval(index) {
        return index !== 3
      },
      toLogin() {
        this.$router.replace({
          path: '/login'
        })
      }
    }
  }
</script>

<style scoped>
  .security-title {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff8198;
    height: 50px;
    width: 100vw;
  }
  .security_center {
    width: 40px;
    height: 40px;
    margin-left: 20px;
  }
  .security_ms {
    color: white;
    font-size: 15px;
    width: calc(100% - 80px);
    margin-right: 20px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }

  .process_item {
    display: flex;
    width: 100vw;
    height: 70px;
    background-color: #eee;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
  }
  .process_content {
    display: flex;
  }
  .process_image {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .process_image img {
    width: 25px;
    height: 25px;
  }
  .process_title {
    color: #8a8a8a;
    font-size: 13px;
    margin-top: 5px;
  }
  .process_title_fill {
    color: #ff8198;
  }
  .interval {
    width: 20px;
    height: 20px;
    margin-top: 5px;
    margin-left: 4px;
  }
</style>
