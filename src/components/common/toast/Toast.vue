<template>
    <div class="show-message" v-show="ifShowMessage">
      <img v-if="ifSuccess" src="~assets/img/common/success.svg" alt="">
      <img v-else src="~assets/img/common/false.svg" alt="">
      <div class="message-content">{{message}}</div>
    </div>
</template>

<script>
  /* 对toast进行插件化封装*/

  export default {
    name: "ShowMessage",
    data() {
      return {
        message: '提示内容',
        ifShowMessage: false,
        ifSuccess: true
      }
    },
    methods: {
      show(content='提示内容', time=2000, ifSuccess) {
        this.ifSuccess = ifSuccess
        if(!this.ifShowMessage) {
          this.message = content
          this.ifShowMessage = !this.ifShowMessage
          setTimeout(() => {
            this.message = ''
            this.ifShowMessage = !this.ifShowMessage
          }, time)
        }
      }
    }
  }
</script>

<style scoped>
  .show-message {
    position: fixed;
    margin:0 auto;
    z-index: 20;
    top: 50%;
    left: 25%;
    right: 25%;

    height: 60px;
    width: 50%;
    background-color: black;
    opacity: 0.8;
    color: white;
    text-align: center;
    border-radius: 10px;
  }
  .show-message img {
    margin-top: 5px;
    width: 25px;
    height: 25px;
  }
  .message-content {
    font-size: 13px;
    margin-top: 3px;
  }
</style>
