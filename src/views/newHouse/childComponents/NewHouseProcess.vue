<template>
  <div class="house_process">
    <div class="message_title">出租流程</div>
    <div class="process_item">
      <div class="process_content" v-for="(item,index) in process">
        <div class="process_image">
          <img :src="item.image" alt="">
          <div class="process_title">{{item.title}}</div>
        </div>
        <img v-if="ifInterval(index)" src="~assets/img/house/process/interval.svg" class="interval" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NewHouseProcess",
    data() {
      return {
        process: [
          {image:require('@/assets/img/house/process/house_release.svg'),title:"发布房源"},
          {image:require('@/assets/img/house/process/house_verify.svg'),title:"电话联系"},
          {image:require('@/assets/img/house/process/house_visit.svg'),title:"房屋实勘"},
          {image:require('@/assets/img/house/process/house_order_launch.svg'),title:"接收订单"},
          {image:require('@/assets/img/house/process/house_order_deal.svg'),title:"订单确认"},
        ]
      }
    },
    methods: {
      ifInterval(index) {
        return index !== 4
      }
    }
  }
</script>

<style scoped>
  .house_process {
    margin-top: 20px;
    width: 100%;
  }
  .message_title {
    font-size: 22px;
    font-weight: bold;
    margin-left: 20px;
  }
  .process_item {
    display: flex;
    width: 100%;
    margin: 20px 0 20px 0;
    padding-left: 15px;
  }
  .process_content {
    flex: 1;
    display: flex;
  }
  .process_image {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .process_image img {
    width: 25px;
    height: 25px;

  }
  .process_title {
    color: #8a8a8a;
    font-size: 13px;
    margin-top: 5px;
  }
  .interval {
    width: 20px;
    height: 20px;
    margin-top: 5px;
  }
</style>
