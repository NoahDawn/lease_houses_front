<template>
  <!--钱包充值区域-->
  <div class="wallet-recharge">
    <!--充值选项-->
    <div class="wallet-recharge-content">
      <div class="wallet-recharge-content-item" v-for="(item,index) in rechargeList">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </div>
    </div>
    <!--充值广告-->
    <div class="wallet-recharge-advertisement">
      <img src="~assets/img/wallet/recharge/recharge_advertisement.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "WalletRecharge",
    data() {
      return {
        rechargeList: [  // 充值选项列表
          {image: require('@/assets/img/wallet/recharge/recharge_bankCard.svg'), title: '银行卡'},
          {image: require('@/assets/img/wallet/recharge/recharge_bill.svg'), title: '账单'},
          {image: require('@/assets/img/wallet/recharge/recharge_cash.svg'), title: '现金提取'}
        ]
      }
    }
  }
</script>

<style scoped>
  .wallet-recharge-content {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
  }
  .wallet-recharge-content-item {
    font-size: 15px;
    text-align: center;
    color: #8f8f8f;
  }
  .wallet-recharge-content-item img {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }
  .wallet-recharge-advertisement img {
    height: 90px;
    width: 100%;
  }
</style>
