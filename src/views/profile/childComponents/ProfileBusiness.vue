<template>
    <div class="profile-business">
      <div class="business-content border-middle" @click="houseManage">
        <img src="~assets/img/profile/business/entrust.svg" alt="">
        <div class="content-font">管理房源</div>
      </div>
      <div class="business-content" @click="houseRelease">
        <img src="~assets/img/profile/business/sell_house.svg" alt="">
        <div class="content-font">发布房源</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "ProfileBusiness",
    methods: {
      houseManage() {
        this.$router.push('/houseManage')
      },
      houseRelease() {
        this.$router.push('/newHouse')
      }
    }
  }
</script>

<style scoped>
  .profile-business {
    margin: 20px 20px 0 20px;
    width: calc(100% - 40px);
    border: 1px solid #eee;
    border-radius: 5px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .business-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .border-middle {
    border-right: 1px solid #eee;
  }
  .business-content img {
    width: 30px;
    height: 30px;
  }
  .content-font {
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    margin-left: 5px;
  }
</style>
