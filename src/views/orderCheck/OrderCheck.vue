<template>
    <div id="order-check">
      <order-check-nav-bar class="nav-bar" @typeChange="typeChange" />
      <scroll class="content" ref="Scroll">
        <order-check-content
          :order-list="orderList[theOrderType].list"
          :order-type="theOrderType"
          @resetOrderList="resetOrderList"/>
      </scroll>
    </div>
</template>

<script>
  import OrderCheckNavBar from './childComponents/OrderCheckNavBar'
  import OrderCheckContent from './childComponents/OrderCheckContent'

  import Scroll from 'components/common/scroll/Scroll'

  import { getOrderList } from "network/order";
  import { dateCodeChange } from 'common/Utils'

  export default {
    name: "OrderCheck",
    data() {
      return {
        orderList: {
          'renter': {list:[]},
          'owner': {list:[]},
        },
        theOrderType: 'renter'
      }
    },
    components: {
      OrderCheckNavBar,
      OrderCheckContent,
      Scroll
    },
    mounted() {
      if(this.$store.state.loginUserMS.id !== 0) {
        const myid = this.$store.state.loginUserMS.id
        console.log(this.$store.state.loginUserMS)
        this.getOrderList(myid, this.theOrderType)
      }
      this.$refs.Scroll.refresh()
    },
    // 该页面设为可保持活跃，目的是保存页签的选中
    activated() {
      this.resetOrderList()
      console.log("确认列表活跃")
    },
    methods: {
      /* 网络请求*/
      getOrderList(myid, type) {
        getOrderList(myid, type).then(res => {
          let effectList = []
          let overdueList = []
          // 处理逾期订单全部向后靠
          res.data.forEach((item) => {
            this.ifOverdue(item) ? overdueList.push(item) : effectList.push(item)
          })
          this.orderList[type].list = []
          this.orderList[type].list.push(...effectList,...overdueList)
        })
      },
      // 判断是否逾期
      ifOverdue(item) {
        return dateCodeChange(new Date(item.invalidTime)) < dateCodeChange(new Date())
      },
      // 切换订单类型
      typeChange(type) {
        this.theOrderType = type
        this.resetOrderList()
      },
      // 刷新订单列表
      resetOrderList() {
        const myid = this.$store.state.loginUserMS.id
        this.getOrderList(myid, this.theOrderType)
      }
    }
  }
</script>

<style scoped>
  #order-check {
    position: relative;
    height: 100vh;
    background-color: white;
    z-index: 10;
  }
  .nav-bar {
    box-shadow: 0 2px 1px rgba(100,100,100,.1)
  }
  .content {
    position: relative;
    height: calc(100% - 44px);
    overflow: hidden;
    background-color: white;
  }
</style>
