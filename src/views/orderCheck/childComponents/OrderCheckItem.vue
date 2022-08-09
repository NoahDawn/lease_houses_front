<template>
    <!-- 订单对象的主体部分 -->
    <div class="goods-list-item" id="goods-list-item" @click="toOrderCheck">
      <img :src="houseMS.picture" alt="">

      <!-- 房源的基本信息部分 -->
      <div class="goods-list-item-message">
        <div class="house-name">{{houseMS.houseName}}</div>
        <div class="house-location">地址：{{houseMS.location}}</div>
        <div class="house-rent">
          <div class="house-rent-price">租金：￥{{houseMS.rent}}/月</div>
          <div class="house-rent-count">月数：{{orderItem.rentMonth}}</div>
        </div>

        <!-- 双方的状态部分 -->
        <div class="rent-status">状态：
          <div v-if="ifFinish" class="order-trade-finish">订单交易成功</div>
          <div v-else class="order-trade-wait">
            <div>户主：
              <span v-if="orderItem.ownerState === 0" class="wait">等待确认</span>
              <span v-else-if="orderItem.ownerState === 1" class="check">已经确认</span>
              <span v-else-if="orderItem.ownerState === 2" class="cancel">申请取消</span>
              <span v-else="orderItem.ownerState === 2" class="refund">完成退租</span>
            </div>
            <div>租户：
              <span v-if="orderItem.renterState === 0" class="wait">等待确认</span>
              <span v-else-if="orderItem.renterState === 1" class="check">已经确认</span>
              <span v-else-if="orderItem.renterState === 2" class="cancel">申请取消</span>
              <span v-else="orderItem.renterState === 3" class="refund">申请退租</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { getHouseMain } from "network/detail";

  export default {
    name: "OrderCheckItem",
    data() {
      return {
        houseMS: {},
        ifOwnerCheck: true,
        ifRenterCheck: true,
      }
    },
    props: {
      orderItem: {
        type: Object,
        default() {
          return {}
        }
      },
      orderType: ''
    },
    created() {
      this.getHouseMain(this.orderItem.houseId)
    },
    computed: {
      // 判断当前订单是否完全处理，即双方已完成退租
      ifFinish() {
        return this.orderItem.ownerState === 3 && this.orderItem.renterState === 3
      }
    },
    methods: {
      // 根据订单的房源id查询该房源的信息
      getHouseMain(houseId) {
        getHouseMain(houseId).then(res => {
          this.houseMS = res.data
          this.houseMS.picture = this.houseMS.picture.split(';')[0]
        })
      },
      // 跳转到订单确认页面
      toOrderCheck() {
        this.$router.replace({
          path: '/theOrder',
          query: {
            orderDetail: this.orderItem,
            houseDetail: this.houseMS,
            orderType: this.orderType
          }
        })
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    height: 130px;
    padding: 10px 5px 10px;
    display: block;
    border-bottom: 1px solid #eee;
    background-color: white;
    border-radius: 5px;
  }
  .goods-list-item img {
    height: 115px;
    width: 47%;
    float: left;
    border-radius: 5px;
  }
  .goods-list-item-message {
    height: 115px;
    width: 53%;
    float: right;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    line-height: 21px;
  }
  .house-name {
    height: 35px;
    line-height: 35px;
    font-size: 18px;
    color: darkred;
  }
  .house-location {
    height:20px;
    font-size: 12px;
    white-space: nowrap;/*内容超宽后禁止换行显示*/
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/*文字超出部分以省略号显示*/
  }
  .house-rent {
    height: 20px;
    display: flex;
    line-height: 20px;
  }
  .house-rent-price {
    font-size: 12px;
    width: calc(100% - 65px);
  }
  .house-rent-count {
    font-size: 10px;
    color: #5c6b77;
    width: 65px;
  }
  .rent-status {
    flex: 1;
    font-size: 12px;
  }
  .order-trade-finish {
    color: deepskyblue;
    font-size: 14px;
    text-align: center;
  }
  .order-trade-wait {
    display: flex;
  }
  .order-trade-wait div {
    flex: 1;
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
</style>
