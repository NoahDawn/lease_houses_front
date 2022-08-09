<template>
  <div class="profile-tools">
    <div class="profile-tools-content">
      <profile-tools-item link="/record" activeColor="gray">
        <img slot="item-icon" src="~assets/img/profile/tools/record.svg" alt="">
        <div slot="item-text" class="item-font">浏览记录</div>
      </profile-tools-item>
      <profile-tools-item link="/" activeColor="gray">
        <img slot="item-icon" src="~assets/img/profile/tools/visit.svg" alt="">
        <div slot="item-text" class="item-font">看房管理</div>
      </profile-tools-item>
      <profile-tools-item link="/orderCheck" activeColor="gray">
        <img slot="item-icon" src="~assets/img/profile/tools/order.svg" alt="">
        <div slot="item-text" class="item-font">交易订单</div>
      </profile-tools-item>
      <profile-tools-item link="/coupon" activeColor="gray">
        <img slot="item-icon" src="~assets/img/profile/tools/discount.svg" alt="">
        <div slot="item-text" class="item-font">优惠券</div>
      </profile-tools-item>
    </div>

    <div class="profile-tools-content">
      <profile-tools-item link="/entrust" activeColor="gray">
        <img slot="item-icon" src="~assets/img/profile/tools/agent.svg" alt="">
        <div slot="item-text" class="item-font">经纪人</div>
      </profile-tools-item>
      <profile-tools-item link="/comment" activeColor="gray">
        <img slot="item-icon" src="~assets/img/profile/tools/comment.svg" alt="">
        <div slot="item-text" class="item-font">我的点评</div>
      </profile-tools-item>
      <profile-tools-item link="/" activeColor="gray">
        <img slot="item-icon" src="~assets/img/profile/tools/reply.svg" alt="">
        <div slot="item-text" class="item-font">我的咨询</div>
      </profile-tools-item>
      <profile-tools-item link="/wallet" activeColor="gray">
        <img slot="item-icon" src="~assets/img/profile/tools/wallet.svg" alt="">
        <div slot="item-text" class="item-font">钱包</div>
      </profile-tools-item>
    </div>

    <!-- 经纪人服务 -->
    <div class="agent-server" @click="toIntermediary">
      <img src="~assets/img/profile/agent_server.png" alt="">
    </div>
  </div>
</template>

<script>
  import ProfileToolsItem from './ProfileToolsItem'

  export default {
    name: "ProfileTools",
    components: {
      ProfileToolsItem
    },
    methods: {
      // 跳转到经纪人路由
      toIntermediary() {
        this.$router.push({
          path: '/intermediary'
        })
      }
    }
  }
</script>

<style scoped>
  .profile-tools-content {
    display: flex;
    background-color: white;
  }
  .item-font {
    margin-top: 5px;
  }
  .agent-server {
    margin-top: 10px;
    padding: 10px 20px 20px 20px;
    width: 100%;
   }
  .agent-server img {
    width: 100%;
    border-radius: 5px;
  }
</style>
