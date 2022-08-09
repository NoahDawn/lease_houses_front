<template>
    <div class="order-check-content">
      <none v-if="Object.keys(orderList).length===0" :none-content="noneContent" />

      <div v-else v-for="item in orderList" style="position: relative">
        <order-check-item
          :order-item="item"
          :order-type="orderType"
          :key="item.id"/>
        <!-- 逾期时出现隔层 -->
        <div v-if="ifMask(item)" style="margin-bottom: 5px;"></div>
        <!-- 逾期的遮盖幕布 -->
        <div class="mask" v-if="ifMask(item)"></div>
        <!-- 遮盖幕布上的确认删除按钮 -->
        <div class="overtime-check-button" v-if="ifMask(item)" @click="insertOrderState(item.id)">确认删除</div>
      </div>
    </div>
</template>

<script>
  import OrderCheckItem from './OrderCheckItem'

  import None from 'components/common/none/None'
  import { dateCodeChange } from 'common/Utils'
  import { insertOrderState } from 'network/order'

  export default {
    name: "OrderCheckContent",
    data() {
      return {
        noneContent: {
          image: require('@/assets/img/common/none.png'),
          content: '您还没有发起或接受任何订单',
          tips: '您可选择中意的房源并发起订单'
        }
      }
    },
    props: {
      orderList: {
        type: Array,
        default() {
          return []
        }
      },
      orderType: ''
    },
    components: {
      OrderCheckItem,
      None
    },
    methods: {
      // 是否需要展示逾期的遮盖幕布
      ifMask(item) {
        // 状态为逾期，且未租出去
        return dateCodeChange(new Date(item.invalidTime)) < dateCodeChange(new Date())
      },
      // 删除逾期的订单信息
      insertOrderState(orderId) {
        const user = this.$store.state.loginUserMS
        insertOrderState(user.id,orderId,this.orderType).then(res => {
          if(res.data.result) {
            this.$toast.show(res.data.message, 1500, res.data.result)
            // 插入数据成功后向外发起刷新列表的请求
            this.$emit('resetOrderList')
          }
        })
      }
    }
  }
</script>

<style scoped>
  /* 确认删除按钮 */
  .overtime-check-button {
    position: absolute;
    top: 40px;
    left: calc((100% - 160px)/2);
    right: 0;
    bottom: 0;
    z-index: 30;
    width: 160px;
    height: 50px;
    border-radius: 5px;
    border: 2px solid red;
    color: white;
    font-weight: bold;
    line-height: 50px;
    text-align: center;
    background-color: orange;
    opacity: 0.8;
  }

  /*房子预期后的遮盖层*/
  .mask {
    width: 100%;
    height: 130px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
