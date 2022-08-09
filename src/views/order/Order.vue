<template>
    <div id="order">
      <order-nav-bar class="nav-bar"/>

      <scroll class="content" ref="Scroll">
        <order-house-message :goods-item="houseDetail" class="order-house-ms"/>

        <div class="order-user-ms">
          <div class="ms-title">您可联系</div>
          <div class="user-ms">联系人名: {{houseDetail.intermediary.realname}}</div>
          <div class="user-ms">联系方式: {{houseDetail.intermediary.phone}}</div>
        </div>
        <div class="order-user-ms">
          <div class="ms-title">您的信息</div>
          <div class="user-ms">租户姓名: {{$store.state.loginUserMS.realname}}</div>
          <div class="user-ms">联系方式: {{$store.state.loginUserMS.phone}}</div>
        </div>

        <div class="order-intention-ms">
          <div class="intention-title">租房意向</div>
          <div class="rent-month">
            <div>预租月数：</div>
            <select name="rentMonth" id="rentMonth" class="select" v-model="orderPost.rentMonth">
              <option v-for="item in month" :value="item">{{item}}</option>
            </select>
            <div>月</div>
          </div>
          <div class="rent-detail">备注信息：</div>
          <textarea  class="textarea" name="detail" id="detail" cols="30" rows="10" v-model.lazy="orderPost.detail"></textarea>
        </div>
      </scroll>

      <div class="bottom-bar">
        <button class="button" @click="newOrder">点击提交</button>
      </div>
    </div>
</template>

<script>
  import OrderNavBar from './childComponents/OrderNavBar'
  import OrderHouseMessage from './childComponents/OrderHouseMessage'

  import Scroll from 'components/common/scroll/Scroll'
  import { postNewOrder } from "network/order";
  import { dateCodeChange, addDate } from 'common/Utils.js'

  export default {
    name: "Order",
    data() {
      return {
        houseDetail: {},
        month: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        orderPost: {
          rentMonth: '3',
          detail: '',
          myId: '',
          houseId: '',
          invalidTime: ''  // 订单有效日期
        }
      }
    },
    components: {
      OrderNavBar,
      OrderHouseMessage,

      Scroll
    },
    created() {
      this.houseDetail = this.$route.query.houseDetail
      this.$nextTick(() => {
        this.$refs.Scroll.refresh()
      })
    },
    methods: {
      // 判断是否房主本人发起订单，直接禁止
      ifOwnerOrder(renterId) {
        return renterId === this.houseDetail.ownerId
      },
      // 新建订单
      newOrder() {
        this.orderPost.myId = this.$store.state.loginUserMS.id
        this.orderPost.houseId = this.houseDetail.id
        if(this.ifOwnerOrder(this.orderPost.myId)) {
          this.$toast.show('禁止房主向本屋发起订单', 2000, false)
        } else {
          // 计算订单未确认前的无效时间，设定为订单创建后的24小时内有效
          this.orderPost.invalidTime = dateCodeChange(addDate(new Date(), 1))
          /* 发起订单网络请求*/
          postNewOrder(this.orderPost).then(res => {
            if(res.data) {
              this.$toast.show('发起订单成功，稍后请确认', 2000, true)
              setTimeout(() => {
                this.$router.back()
              }, 2000)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  #order {
    position: relative;
    height: 100vh;
    background-color: white;
    z-index: 10;
  }
  .nav-bar {
    box-shadow: 0 2px 10px rgba(100,100,100,.4);
    position: relative;
    z-index: 11;
  }
  .content {
    height: calc(100% - 44px - 49px);
    position: relative;
    overflow: hidden;
    top: 10px;
  }
  .order-house-ms {
    margin: 10px 5px 10px 5px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(100,100,100,.4);
  }
  .order-user-ms {
    height: 110px;
    margin: 10px 5px 10px 5px;
    padding: 10px 5px 10px 5px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(100,100,100,.4);
    display: flex;
    flex-direction: column;
  }
  .order-user-ms div {
    flex: 1;
    line-height: 30px;
    padding-left: 5px;
  }
  .ms-title {
    font-size: 18px;
    font-weight: bold;
  }
  .user-ms {
    font-size: 14px;
  }

  .order-intention-ms {
    height: 240px;
    margin: 10px 5px 10px 5px;
    padding: 10px 5px 10px 5px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(100,100,100,.4);
    display: flex;
    flex-direction: column;
  }
  .intention-title {
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    padding-left: 5px;
    height: 30px;
  }
  .rent-month {
    display: flex;
    font-size: 14px;
    line-height: 30px;
    padding-left: 5px;
    height: 30px;
  }
  .select {
    height: 24px;
    margin: 3px 20px 3px 20px;
    width: calc(100% - 220px);
    border-radius: 5px;
    border: 1px solid #eee;
    padding-left: 10px;
  }
  .rent-detail {
    display: flex;
    font-size: 14px;
    line-height: 30px;
    padding-left: 5px;
    height: 30px;
  }
  .textarea {
    width: 96%;
    margin: auto;
    border: 1px solid #eee;
    background-color: #eee;
    font-size: 14px;
    padding: 3px;
  }

  .bottom-bar {
    position: relative;
    z-index: 11;
    bottom: 0;
    left: 0;
    right: 0;

    height: 49px;
    background-color: white;
    border-top: 1px solid #eee;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button {
    width: 95%;
    height: 90%;
    background-color: orange;
    color: white;
    border: 1px solid orange;
  }
</style>
