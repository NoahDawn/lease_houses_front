<template>
  <!--钱包主页-->
  <div id="wallet">
    <!--设置顶部导航栏-->
    <nav-bar class="nav">
      <div slot="left" @click="backProfile" class="nav-left">
        <img src="~assets/img/common/back_arrow.svg" alt="">
      </div>
      <div slot="right" class="nav-right">支付设置</div>
    </nav-bar>

    <!--钱包主内容-->
    <div class="wallet-content">
      <!--蓝色背景板-->
      <div class="content-bg"></div>
      <!--最上层内容区域-->
      <div class="content-show">
        <!--钱包数额区域-->
        <div class="content-show-wallet">
          <div class="content-show-wallet-tips">账户余额（元）
            <img v-if="!ifSecrecy" src="~assets/img/common/eye_show.svg" alt="" @click="showTypeChange">
            <img v-else src="~assets/img/common/eye_close.svg" alt="" @click="showTypeChange">
          </div>
          <div v-if="!ifSecrecy" class="content-show-wallet-count">{{getWallet}}</div>
          <div v-else class="content-show-wallet-count">****</div>
        </div>

        <!--安全认证区域-->
        <div class="content-show-identity">
          <div class="content-show-identity-tips">为保障您的资金安全，请完成实名认证</div>
          <div class="content-show-identity-do">去认证
            <img src="~assets/img/common/screen_to.svg" alt="">
          </div>
        </div>

        <!--充值广告区域-->
        <wallet-recharge/>

        <!--金融服务区域-->
        <wallet-financial-service/>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'
  import WalletRecharge from './childComponents/WalletRecharge'
  import WalletFinancialService from './childComponents/WalletFinancialService'

  import { getUserDetail } from 'network/wallet'

  export default {
    name: "wallet",
    data() {
      return {
        ifSecrecy: false, // 当前是否是资金保密模式
        user: {} // 用户信息
      }
    },
    components: {
      NavBar,
      WalletRecharge,
      WalletFinancialService
    },
    created() {
      const userMs = this.$store.state.loginUserMS
      this.getUserDetail(userMs.id)
    },
    computed: {
      // 获取当前用户的钱包余额
      getWallet() {
        return parseFloat(this.user.money).toFixed(2)
      }
    },
    methods: {
      // 获取用户信息
      getUserDetail(userId) {
        getUserDetail(userId).then(res => {
          if(res.data) {
            this.user = res.data
          }
        })
      },
      // 回到主页面
      backProfile() {
        this.$router.replace('/profile')
      },
      // 改变资金的保密模式
      showTypeChange() {
        this.ifSecrecy = !this.ifSecrecy
      }
    }
  }
</script>

<style scoped>
  #wallet {
    position: relative;
    background-color: white;
    z-index: 10;
    height: 100vh;
  }
  /* 顶部导航*/
  .nav {
    background-color: #007aff;
    padding: 0 3%;
  }
  .nav-left {
    display: flex;
    align-items: center;
    height: 44px;
  }
  .nav-left img {
    width: 30px;
    height: 30px;
  }
  .nav-right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    font-size: 14px;
    color: white;
    font-weight: 400;
  }

  /* 主内容区*/
  .wallet-content {
    position: relative;
  }
  .content-bg {
    background-color: #007aff;
    height: 100px;
    width: 100vw;
    border-radius: 0 0 10% 10%;
  }
  .content-show {
    position: absolute;
    height: calc(100vh - 44px);
    top: 0;
    right: 5%;
    left: 5%;
    bottom: 0;
  }

  /* 钱包数额区域*/
  .content-show-wallet {
    height: 150px;
    width: 100%;
    border-radius: 0 0 5px 5px;
    background-color: white;
    box-shadow: 0 3px 10px rgba(100,100,100,.2);
  }
  .content-show-wallet-tips {
    color: #c7c7c7;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .content-show-wallet-tips img {
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }
  .content-show-wallet-count {
    height: 100px;
    padding-top: 20px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
  }

  /* 安全认证区域*/
  .content-show-identity {
    margin-top: 3px;
    color: #a35757;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 3%;
    font-size: 14px;
    font-weight: 200;
    background-color: #fbece9;
  }
  .content-show-identity-do img {
    height: 20px;
    width: 25px;
    vertical-align: middle;
    margin-bottom: 4px;
  }
</style>
