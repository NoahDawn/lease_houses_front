<template>
  <div id="init-data">
    <button type="button" @click="back">返回到主页面</button>
    <br/>
    <button type="button" @click="initUser">初始化用户</button>
    <br/>
    <button type="button" @click="initIntermediary">初始化经纪人</button>
    &nbsp; &nbsp; &nbsp;
    <button type="button" @click="initEntrust">初始化委托关系</button>
    <br/>
    <button type="button" @click="initHouse">初始化房源</button>
    &nbsp; &nbsp; &nbsp;
    <button type="button" @click="initFacility">初始化设施配备</button>
    <br/>
    <button type="button" @click="initOrder">初始化订单</button>
    <br/>
  </div>
</template>

<script>
  import { initIntermediaryData, initEntrustData, initHouseData, initFacilityData, initUserData, initOrderData } from 'network/initData'
  import intermediatyData from "./data/intermediary"
  import userData from "./data/user"
  import houseData from "./data/house"
  import entrustData from "./data/entrust"
  import facilityData from "./data/facility"
  import orderData from "./data/order"

  export default {
    name: "InitData",
    data() {
      return {
        intermediary: [],  // 经纪人数据
        entrust: [],  // 委托数据
        user: [],  // 用户数据
        house: [],  // 房源数据
        facility: [],  // 设施配备数据
        order: [],  // 订单数据
      }
    },
    created() {
      // 从js中引入的数据赋值
      this.intermediary = [...intermediatyData()]
      this.entrust = [...entrustData()]
      this.user = [...userData()]
      this.house = [...houseData()]
      this.facility = [...facilityData()]
      this.order = [...orderData()]
    },
    methods: {
      back() {
        this.$router.push("/profile")
      },
      // 初始化经纪人网络请求
      initIntermediary() {
        console.log(this.intermediary)
        initIntermediaryData(this.intermediary).then(res => {
          console.log("初始化经纪人")
        })
      },
      // 初始化委托关系网络请求
      initEntrust() {
        console.log(this.entrust)
        initEntrustData(this.entrust).then(res => {
          console.log("初始化委托")
        })
      },
      // 初始化房源网络请求
      initHouse() {
        console.log(this.house)
        initHouseData(this.house).then(res => {
          console.log("初始化房源")
        })
      },
      // 初始化用户网络请求
      initUser() {
        console.log(this.user)
        initUserData(this.user).then(res => {
          console.log("初始化用户")
        })
      },
      // 初始化订单网络请求
      initOrder() {
        console.log(this.order)
        initOrderData(this.order).then(res => {
          console.log("初始化订单")
        })
      },
      // 初始化设施配备网络请求
      initFacility() {
        console.log(this.facility)
        initFacilityData(this.facility).then(res => {
          console.log("初始化设施配备")
        })
      }
    }
  }
</script>

<style scoped>
  #init-data {
    position: relative;
    height: 100vh;
    background-color: white;
    z-index: 10;
  }
  button {
    margin: 20px;
    padding: 10px;
  }
</style>
