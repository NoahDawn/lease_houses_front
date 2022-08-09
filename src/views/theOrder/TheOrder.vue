<template>
    <div id="the-order">
      <the-order-nav-bar class="nav-bar"/>

      <scroll class="content">
        <!-- 房源的部分信息 -->
        <the-order-house-message :goods-item="houseDetail" class="order-house-ms"/>

        <!-- 户主的部分信息 -->
        <div class="order-user-ms">
          <div class="ms-title">户主信息
            <span class="identity" v-if="ifOwner">(您的经纪人)</span>
          </div>
          <div class="user-ms">联系姓名: {{houseDetail.intermediary.realname}}</div>
          <div class="user-ms">联系方式: {{houseDetail.intermediary.phone}}</div>
          <div class="user-ms">确认状态:
            <span v-if="orderDetail.ownerState === 0" class="wait">等待确认订单</span>
            <span v-else-if="orderDetail.ownerState === 1" class="check">已确认订单</span>
            <span v-else-if="orderDetail.ownerState === 2" class="cancel">申请取消订单</span>
            <span v-else="orderDetail.ownerState === 3" class="refund">已处理退租</span>
          </div>
          <div class="lease-cancel" v-if="orderDetail.renterState === 3 && orderType==='owner'">
            <div class="lease-cancel-tips">
              <span v-if="orderDetail.ownerState < 3">对方申请退租，请尽快处理</span>
              <span v-else>您已处理退租申请</span>
            </div>
            <div class="lease-cancel-button" @click="ownerCheck(3)">确认退租</div>
          </div>
        </div>

        <!-- 租户的部分信息 -->
        <div class="order-user-ms">
          <div class="ms-title">租户信息
            <span class="identity" v-if="!ifOwner">(您当前的身份)</span>
          </div>
          <div class="user-ms">租户姓名: {{renterDetail.realname}}</div>
          <div class="user-ms">联系方式: {{renterDetail.phone}}</div>
          <div class="user-ms">确认状态:
            <span v-if="orderDetail.renterState === 0" class="wait">等待确认订单</span>
            <span v-else-if="orderDetail.renterState === 1" class="check">已确认订单</span>
            <span v-else-if="orderDetail.renterState === 2" class="cancel">申请取消订单</span>
            <span v-else="orderDetail.renterState === 3" class="refund">申请退租</span>
          </div>
          <div class="lease-cancel" v-if="(orderDetail.renterState === 1 || orderDetail.renterState === 3) && orderType==='renter'">
            <div class="lease-cancel-tips">
              <span v-if="orderDetail.renterState < 3">申请前请与户主沟通处理事项</span>
              <span v-else>请耐心等待对方处理</span>
            </div>
            <div class="lease-cancel-button" @click="renterCheck(3)">申请退租</div>
          </div>
        </div>

        <!-- 租房意向 -->
        <div class="order-intention-ms">
          <div class="intention-title">租房意向</div>
          <div class="rent-month">
            <div>预租月数：</div>
            <input type="text" class="select" :value="orderDetail.rentMonth" disabled="disabled">
            <div>月</div>
          </div>
          <div class="rent-detail">备注信息：</div>
          <textarea class="textarea" :value="orderDetail.detail" disabled="disabled" name="detail" id="detail" cols="30" rows="10"></textarea>
        </div>
      </scroll>

      <!-- 底部所有确认按钮 -->
      <div class="bottom-bar">
        <!-- 订单完成显示（此时可退租） -->
        <div v-if="ifFinish" class="order-finish">
          <img src="~assets/img/common/success.svg" alt="">
          <div class="finish-content">该订单已完成确认</div>
        </div>

        <!-- 未完成时的确认 -->
        <div v-else class="button-check">
          <!-- 户主订单（左边的按钮显示） -->
          <div class="button-confirm" v-if="orderType==='owner'">
            <button v-if="orderDetail.renterState===2" disabled="disabled" class="confirm-forbid">
              <img src="~assets/img/common/forbidden.svg" alt="">对方申请取消</button>
            <button v-else-if="orderDetail.ownerState===0" class="confirm-wait" @click="ownerCheck(1)">
              <img src="~assets/img/common/success.svg" alt="">确认无误</button>
            <button v-else-if="orderDetail.ownerState===1" disabled="disabled" class="confirm-forbid">您已确认</button>
            <button v-else-if="orderDetail.ownerState===2" disabled="disabled" class="confirm-forbid">您已取消</button>
          </div>

          <!-- 租户订单（左边的按钮显示） -->
          <div class="button-confirm" v-else>
            <button v-if="orderDetail.ownerState===2" disabled="disabled" class="confirm-forbid">
              <img src="~assets/img/common/forbidden.svg" alt="">对方申请取消</button>
            <button v-else-if="orderDetail.renterState===0" class="confirm-wait" @click="renterCheck(1)">
              <img src="~assets/img/common/success.svg" alt="">确认无误</button>
            <button v-else-if="orderDetail.renterState===1" disabled="disabled" class="confirm-forbid">您已确认</button>
            <button v-else-if="orderDetail.renterState===2" disabled="disabled" class="confirm-forbid">您已取消</button>
          </div>

          <!-- 户主订单（右边的按钮显示） -->
          <div class="button-cancel" v-if="orderType==='owner'">
            <button v-if="orderDetail.renterState===2 && orderDetail.ownerState<2" class="cancel-cancel" @click="ownerCheck(2)">
              <img src="~assets/img/common/false.svg" alt="">确认取消</button>
            <button v-else-if="orderDetail.renterState<1 && orderDetail.ownerState<2" class="cancel-cancel" @click="ownerCheck(2)">
              <img src="~assets/img/common/false.svg" alt="">申请取消</button>
            <button v-else-if="orderDetail.ownerState===2" disabled="disabled" class="confirm-forbid">您已取消</button>
          </div>

          <!-- 租户订单（右边的按钮显示） -->
          <div class="button-cancel" v-else>
            <button v-if="orderDetail.ownerState===2 && orderDetail.renterState<2" class="cancel-cancel" @click="renterCheck(2)">
              <img src="~assets/img/common/false.svg" alt="">确认取消</button>
            <button v-else-if="orderDetail.ownerState<2 && orderDetail.renterState<2" class="cancel-cancel" @click="renterCheck(2)">
              <img src="~assets/img/common/false.svg" alt="">申请取消</button>
            <button v-else-if="orderDetail.renterState===2" disabled="disabled" class="confirm-forbid">您已取消</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import TheOrderNavBar from './childComponents/TheOrderNavBar'
  import TheOrderHouseMessage from './childComponents/TheOrderHouseMessage'

  import Scroll from 'components/common/scroll/Scroll'
  import { postOrderCheck } from "network/order";
  import { getUserDetail } from "network/wallet";

  export default {
    name: "TheOrder",
    data() {
      return {
        houseDetail: {},
        orderDetail: {},
        renterDetail: {},  // 租户信息
        orderType: ''
      }
    },
    components: {
      TheOrderNavBar,
      TheOrderHouseMessage,

      Scroll
    },
    created() {
      this.houseDetail = this.$route.query.houseDetail
      this.orderDetail = this.$route.query.orderDetail
      this.orderType = this.$route.query.orderType
      console.log(this.houseDetail)

      // 获取租户的信息
      getUserDetail(this.orderDetail.renterId).then(res => {
        this.renterDetail = res.data
      })
    },
    computed: {
      ifOwner() {
        return this.orderType === 'owner'
      },
      ifFinish() {
        // 判断双方确认状态是否符合完成范围（owner：1、3，renter：1、3）
        // 相等下，+值只能为2或6，不等下，+值只能为4
        return (this.orderDetail.ownerState !== this.orderDetail.renterState &&
                  this.orderDetail.ownerState + this.orderDetail.renterState === 4) ||
               (this.orderDetail.ownerState === this.orderDetail.renterState &&
                 (this.orderDetail.ownerState + this.orderDetail.renterState === 2 ||
                   this.orderDetail.ownerState + this.orderDetail.renterState === 6))
      }
    },
    methods: {
      /* 租户修改订单状态*/
      renterCheck(state) {
        if(parseInt(state) === 3 && parseInt(this.orderDetail.renterState) === 3) {
          this.$toast.show('您已申请，请勿重复发起!', 1500, false)
          return false
        }
        this.orderDetail.renterState = state
        this.postOrderCheck(state)
      },
      /* 户主修改订单状态*/
      ownerCheck(state) {
        if(parseInt(state) === 3 && parseInt(this.orderDetail.ownerState) === 3) {
          this.$toast.show('您已处理，请勿重复操作!', 1500, false)
          return false
        }
        this.orderDetail.ownerState = state
        this.postOrderCheck(state)
      },
      /* 确认状态*/
      sureOrCancel(state) {
        switch(parseInt(state)) {
          case 1: return 'sure';
          case 2: return 'cancel';
          case 3: return 'refund';
          default: return ''
        }
      },
      /* 订单确认网络请求*/
      postOrderCheck(state) {
        let orderCheckPost = {
          id: this.orderDetail.id,
          myid: this.$store.state.loginUserMS.id,
          type: this.orderType,
          confirm: this.sureOrCancel(state)
        }
        postOrderCheck(orderCheckPost).then(res => {
          this.$toast.show(res.message, 1000, true)
        })
      }
    }
  }
</script>

<style scoped>
  #the-order {
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
  .identity {
    font-size: 15px;
    color: darkred;
    margin-left: 20px;
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
    color: black;
    text-align: center;
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
    color: black;
  }
  .wait {
    color: orange;
  }
  .check {
    color: green;
  }
  .cancel {
    color: red;
  }
  .refund {
    color: deepskyblue;
  }

  .lease-cancel {
    border-top: 1px solid #EEEEEE;
    margin-top: 5px;
    padding-top: 10px;
  }
  .lease-cancel-tips {
    width: 65%;
    color: #666666;
    font-size: 13px;
    display: inline-block;
  }
  .lease-cancel-button {
    border-radius: 20px;
    border: 1px solid #666666;
    text-align: center;
    line-height: 30px;
    height: 30px;
    width: 30%;
    color: #666666;
    font-size: 15px;
    display: inline-block;
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

  .order-finish {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: limegreen;
  }
  .order-finish img {
    height: 30px;
    width: 30px;
  }
  .finish-content {
    color: white;
    margin-left: 10px;
  }

  .button-check {
    height: 49px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-confirm {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .button-confirm button {
    height: 70%;
    width: 70%;
    border-radius: 5px;
    color: white;
  }
  .confirm-wait {
    background-color: orange;
    border: 1px solid orange;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .confirm-wait  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .confirm-forbid {
    background-color: silver;
    border: 1px solid silver;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .confirm-forbid  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .button-cancel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .button-cancel button {
    height: 70%;
    width: 70%;
    border-radius: 5px;
    color: white;
  }
  .cancel-cancel {
    background-color: red;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cancel-cancel  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
</style>
