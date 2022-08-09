<template>
  <div class="detail-message">
    <!--房源简介-->
    <div class="detail-message-part">
      <div class="title-ms">房源简介</div>
      <div class="message-facilities">
        <div v-for="(item,index) in facilities" class="message-facilities-item">
          <img v-if="item.value" :src="facilitiesImg[item.key].imageFill" alt="">
          <img v-else :src="facilitiesImg[item.key].image" alt="">
          <div :class="{facilities_not_fill:!item.value}">{{facilitiesImg[item.key].title}}</div>
        </div>
      </div>
    </div>

    <!--广告-->
    <img src="~assets/img/detail/advertisement.png" class="advertisement" alt="">
    
    <!--租约信息-->
    <div class="detail-message-part">
      <div class="title-ms">租约信息</div>
      <p class="message-content">租期: {{leaseTerm}}以内</p>
      <p class="message-content">看房: {{house.houseInspection}}</p>
      <p class="message-content">风险提示: 用户风险提示</p>
      <p class="message-content">贝士官方投诉电话: 10106199</p>
      <p class="message-content">房源简介: {{house.detail}}</p>
    </div>

    <!--费用详情-->
    <div class="detail-message-part">
      <div class="title-ms">费用详情</div>
      <div class="message-cost-tips">年租价 当租期不足1年时租金可能会上浮，详询管家</div>
      <div class="message-cost-main">
        <div class="message-cost-main-item">
          <div>付款方式</div>
          <div class="message-cost-main-item-middle"></div>
          <div style="color: #8f8f8f;">{{house.leaseTerm}}付</div>
        </div>
        <div class="message-cost-main-item">
          <div>租金</div>
          <div class="message-cost-main-item-middle">(元/月)</div>
          <div style="color: orangered;">{{house.rent}}</div>
        </div>
        <div class="message-cost-main-item">
          <div>押金</div>
          <div class="message-cost-main-item-middle">(元)</div>
          <div>{{house.rent}}</div>
        </div>
        <div class="message-cost-main-item">
          <div>服务费</div>
          <div class="message-cost-main-item-middle">(元)</div>
          <div>0</div>
        </div>
        <div class="message-cost-main-item">
          <div>中介费</div>
          <div class="message-cost-main-item-middle">(元)</div>
          <div style="color: #8f8f8f;">需咨询</div>
        </div>
      </div>
      <div class="message-cost-main-other">请谨慎选择半年/年付产品</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailMessage",
    data() {
      return {
        facilitiesImg: {
          'washingMachine':{
            imageFill: require('@/assets/img/detail/facilities/washingMachine_fill.svg'),
            image: require('@/assets/img/detail/facilities/washingMachine.svg'),
            title: '洗衣机'
          },
          'airConditioner':{
            imageFill: require('@/assets/img/detail/facilities/airConditioner_fill.svg'),
            image: require('@/assets/img/detail/facilities/airConditioner.svg'),
            title: '空调'
          },
          'wardrobe':{
            imageFill: require('@/assets/img/detail/facilities/wardrobe_fill.svg'),
            image: require('@/assets/img/detail/facilities/wardrobe.svg'),
            title: '衣柜'
          },
          'television':{
            imageFill: require('@/assets/img/detail/facilities/television_fill.svg'),
            image: require('@/assets/img/detail/facilities/television.svg'),
            title: '电视'
          },
          'refrigerator':{
            imageFill: require('@/assets/img/detail/facilities/refrigerator_fill.svg'),
            image: require('@/assets/img/detail/facilities/refrigerator.svg'),
            title: '冰箱'
          },
          'heater':{
            imageFill: require('@/assets/img/detail/facilities/heater_fill.svg'),
            image: require('@/assets/img/detail/facilities/heater.svg'),
            title: '热水器'
          },
          'bed':{
            imageFill: require('@/assets/img/detail/facilities/bed_fill.svg'),
            image: require('@/assets/img/detail/facilities/bed.svg'),
            title: '床'
          },
          'heating':{
            imageFill: require('@/assets/img/detail/facilities/heating_fill.svg'),
            image: require('@/assets/img/detail/facilities/heating.svg'),
            title: '暖气'
          },
          'broadband':{
            imageFill: require('@/assets/img/detail/facilities/broadband_fill.svg'),
            image: require('@/assets/img/detail/facilities/broadband.svg'),
            title: '宽带'
          },
          'naturalGas':{
            imageFill: require('@/assets/img/detail/facilities/naturalGas_fill.svg'),
            image: require('@/assets/img/detail/facilities/naturalGas.svg'),
            title: '天然气'
          }
        }
      }
    },
    props: {
      house: {
        type: Object,
        default: {}
      }
    },
    computed: {
      // 租期显示转换
      leaseTerm() {
        switch (this.house.leaseTerm) {
          case '年': return '1年';break;
          case '半年': return '半年';break;
          case '季度': return '季度';break;
          case '月': return '月数商量';break;
          default: return '1年';
        }
      },
      // 设备对象转换为数组
      facilities() {
        let facilities = []
        for(let item in this.house.facilities) {
          if(item !== 'id' && item !== 'houseId') {
            let obj = {key:item,value:this.house.facilities[item]}
            facilities.push(obj)
          }
        }
        return facilities
      }
    }
  }
</script>

<style scoped>
  .detail-message {
    padding: 20px 0 0;
    border-bottom: 10px solid #eee;
  }
  .detail-message-part {
    padding: 0 3%;
    margin-bottom: 20px;
  }
  .title-ms {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 20px;
  }
  .advertisement {
    width: 100%;
    height: 80px;
    margin-top: -10px;
    margin-bottom: 20px;
  }

  /* 租约内容*/
  .message-content {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    letter-spacing: 1px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  /* 简介内容*/
  .message-facilities {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0;
  }
  .message-facilities-item {
    width: 20%;
    text-align: center;
    margin-bottom: 20px;
  }
  .message-facilities-item img {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }
  .facilities_not_fill {
    color: #8f8f8f;
  }

  /* 费用详情*/
  .message-cost-tips, .message-cost-main, .message-cost-main-other {
    font-size: 13px;
    letter-spacing: 1px;
  }
  .message-cost-tips {
    text-align: center;
  }
  .message-cost-main {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    border: 2px solid #eeeeee;
    border-radius: 5px;
    padding: 10px;
  }
  .message-cost-main-item-middle {
    font-size: 12px;
    color: #8f8f8f;
    height: 15px;
    line-height: 15px;
    margin: 5px 0 10px;
  }
  .message-cost-main-other {
    margin-top: 10px;
    text-align: right;
    color: #8f8f8f;
  }
</style>
