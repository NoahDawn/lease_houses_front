<template>
  <div id="alipay">
    <!-- 导航栏 -->
    <nav-bar class="alipay-nav-bar">
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back_arrow.svg" alt="">
      </div>
      <div slot="center">{{costObj.title}}</div>
    </nav-bar>

    <!-- 主体logo与支付金额 -->
    <div class="alipay-content">
      <img src="~assets/img/alipay/alipay.png" alt="">
      <div class="alipay-content-tips">您将支付
        <div>{{turnCost}}</div>
        作为{{costObj.type}}
      </div>

      <div class="alipay-content-button" @click="payContinue">继续支付</div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "Alipay",
    components: {
      NavBar
    },
    props: {
      costObj: {  // 传入的支付金额与类型
        type: Object,
        default: {
          title: '支付宝支付',
          cost: 1000.00,
          type: '手续费'
        }
      }
    },
    computed: {
      // 计算支付金额
      turnCost() {
        return parseFloat(this.costObj.cost).toFixed(2)
      }
    },
    methods: {
      // 控制支付界面的关闭
      back() {
        this.$emit("alipayControl")
      },
      // 继续支付
      payContinue() {
        this.$emit("payContinue")
      }
    }
  }
</script>

<style scoped>
  #alipay {
    background-color: white;
    z-index: 40;
  }
  .alipay-nav-bar {
    background-color: #0398FF;
    color: white;
    font-weight: 600;
    border-radius: 5px 5px 0 0;
  }
  .back img {
    width: 30px;
    height: 22px;
    margin-top: 11px;
    margin-left: 15px;
  }

  .alipay-content {
    height: calc(100% - 44px);
    background-color: #F5F4F9;
    padding: 0 5%;
    text-align: center;
  }
  .alipay-content img {
    margin-top: 50px;
    width: 100px;
    height: 100px;
  }
  .alipay-content-tips {
    margin-top: 30px;
    color: #AFAFB1;
    font-size: 17px;
  }
  .alipay-content-tips div {
    color: black;
    font-size: 40px;
    font-weight: bold;
    margin: 20px;
  }
  .alipay-content-button {
    margin-top: 30px;
    height: 40px;
    width: 100%;
    border-radius: 5px;
    line-height: 40px;
    color: white;
    background-color: #0398FF;
    letter-spacing: 1px;
    font-size: 18px;
    font-weight: bold;
  }
</style>
