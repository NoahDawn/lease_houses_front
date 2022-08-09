<template>
  <!--钱包金融服务区域-->
  <div class="wallet-finance">
    <img class="wallet-finance-warn" src="~assets/img/wallet/finance/finance_warn.png" alt="">

    <!--金融服务-->
    <div class="wallet-finance-title">金融服务</div>
    <div class="wallet-finance-content">
      <div v-for="(item,index) in financeList" class="wallet-finance-content-item">
        <img :src="item.image" alt="">
        <div class="wallet-finance-content-item-main">
          <div class="wallet-finance-content-item-main-top">{{item.title}}</div>
          <div class="wallet-finance-content-item-main-bottom">{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WalletFinancialService",
    data() {
      return {
        financeList: [  // 金融服务选项列表
          {image: require('@/assets/img/wallet/finance/finance_payment.svg'), title: '房款提前用', content: '安心用'},
          {image: require('@/assets/img/wallet/finance/finance_balance.svg'), title: '尾款提前收', content: '安心收'},
          {image: require('@/assets/img/wallet/finance/finance_mortgage.svg'), title: '轻松解抵押', content: '安心赎'},
          {image: require('@/assets/img/wallet/finance/finance_guarantee.svg'), title: '保资金安全', content: '更安全'}
        ]
      }
    }
  }
</script>

<style scoped>
  .wallet-finance-warn {
    margin: 15px 0;
    height: 25px;
    width: 100%;
  }
  .wallet-finance-title {
    height: 25px;
    line-height: 25px;
    font-size: 20px;
    font-weight: 400;
  }
  .wallet-finance-content {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  }
  .wallet-finance-content-item {
    width: 49%;
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 10px;
    height: 40px;
    margin-bottom: 25px;
  }
  .wallet-finance-content-item img {
    width: 37px;
    height: 37px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .wallet-finance-content-item-main-top,.wallet-finance-content-item-main-bottom {
    height: 20px;
    line-height: 20px;
    /* 字体之间的横向间距*/
    letter-spacing: 1px;
  }
  .wallet-finance-content-item-main-bottom {
    font-size: 13px;
    color: #8f8f8f;
    font-weight: 300;
  }
</style>
