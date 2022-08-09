<template>
  <!--一键到出租-->
  <div class="detail-tobe-renter">
    <!--上半部分-->
    <div class="detail-tobe-renter-top">
      <div class="detail-tobe-renter-top-title">考虑出租？我们可以帮你</div>
      <div class="detail-tobe-renter-top-tips">一键出租收益稳定更省心</div>
      <div class="detail-tobe-renter-top-button" @click="toNewHouse">我要出租</div>
    </div>

    <!--下半部分-->
    <div class="detail-tobe-renter-bottom">
      <div class="detail-tobe-renter-bottom-content">
        <div class="detail-tobe-renter-bottom-content-id">房源编号: {{houseId}}</div>
        <div class="detail-tobe-renter-bottom-content-tips">贝士承诺真实房源假一赔十</div>
      </div>
      <div class="detail-tobe-renter-bottom-report">
        <img src="~assets/img/detail/report.svg" alt="">
        <p>举报</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailToBeRenter",
    props: {
      houseId: {
        type: Number,
        default: 0
      }
    },
    methods: {
      // 跳转到新建房源
      toNewHouse() {
        // 判断当前是否登录
        const loginMS = this.$store.state.loginUserMS
        if(loginMS.id) {
          this.$router.push("/newHouse")
        } else {
          this.$toast.show("您当前未登录", 1500, false)
        }
      }
    }
  }
</script>

<style scoped>
  .detail-tobe-renter {
    height: 250px;
    width: 100%;
    background-color: #f7f7f7;
  }

  /* 上半部分*/
  .detail-tobe-renter-top {
    text-align: center;
    padding: 20px 3%;
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #eeeeee;
    letter-spacing: 1px;
  }
  .detail-tobe-renter-top-title {
    font-size: 20px;
  }
  .detail-tobe-renter-top-tips {
    color: #8f8f8f;
    font-size: 15px;
    margin-top: 10px;
  }
  .detail-tobe-renter-top-button {
    width: 40%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #cccccc;
    border-radius: 20px;
    margin: 20px 30%;
  }

  /* 下半部分*/
  .detail-tobe-renter-bottom {
    text-align: center;
    width: 100%;
    height: 100px;
    padding: 20px 5%;
    display: flex;
    justify-content: space-between;
  }
  .detail-tobe-renter-bottom-content div {
    height: 30px;
    line-height: 30px;
    letter-spacing: 1px;
    text-align: left;
  }
  .detail-tobe-renter-bottom-content-id {
    font-weight: 500;
  }
  .detail-tobe-renter-bottom-content-tips {
    color: #8f8f8f;
    font-size: 14px;
  }
  .detail-tobe-renter-bottom-report {
    vertical-align: middle;
    padding-top: 10px;
  }
  .detail-tobe-renter-bottom-report img {
    width: 20px;
    height: 20px;
    margin-bottom: 5px;
  }
</style>
