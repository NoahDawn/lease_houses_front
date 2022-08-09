<template>
  <!--此处加入判断对象的长度是否为0，为0则表示该对象没有值，不为0则显示-->
  <div class="detail-base-info" v-if="Object.keys(house).length !== 0">
    <!--轻量信息-->
    <div class="detail-base-info-light">
      <!--轻量租金部分-->
      <div class="detail-base-info-light-rent">
        <div class="rent-left">
          <span class="rent-count">{{house.rent}}</span>
          <span class="rent-explain">元/月(季付价)</span>
        </div>
        <div class="rent-right">
          <img src="~assets/img/detail/consult.svg" alt="">
          <span>咨询详情</span>
        </div>
      </div>

      <!--轻量名部分-->
      <div class="detail-base-info-light-name">{{house.houseType}} {{house.houseName}} {{house.roomType}}</div>

      <!--轻量安全部分-->
      <div class="detail-base-info-light-security">
        <img src="~assets/img/detail/security.svg" alt="">
        在线签约支付，法律保障 更安全 更方便
      </div>

      <!--轻量面积朝向等-->
      <div class="detail-base-info-light-area">
        <div><p class="area-top">{{house.direction}}</p><p class="area-bottom">朝向</p></div>
        <div><p class="area-top">{{house.area}}m²</p><p class="area-bottom">面积</p></div>
        <div><p class="area-top">高/{{house.floor}}层</p><p class="area-bottom">楼层</p></div>
        <div><p class="area-top">{{house.occupancy}}</p><p class="area-bottom">入住</p></div>
      </div>

      <!--轻量标签部分-->
      <div class="detail-base-info-light-label">
        <div v-for="(item,index) in label">{{item}}</div>
      </div>

      <!--轻量所在地部分-->
      <div class="detail-base-info-light-location">
        <p class="location-ms">位于{{house.location}}</p>
        <div class="location-image"><img src="~assets/img/detail/location.svg" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    data() {
      return {
        label: ['权属核验','精装修','有卫生间','民水民电','支持看房','卫生保证','安全认证']  // 标签
      }
    },
    props: {
      house: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .detail-base-info {
    margin-top: 10px;
  }

  /* 轻量信息*/
  .detail-base-info-light {
    padding: 0 3%;
    border-bottom: 10px solid #eee;
  }

  /* 名*/
  .detail-base-info-light-name {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
  }

  /* 租金*/
  .detail-base-info-light-rent {
    display: flex;
    justify-content: space-between;
  }
  .detail-base-info-light-rent div, .detail-base-info-light-name {
    height: 35px;
    line-height: 35px;
  }
  .rent-count,.rent-explain {
    font-size: 25px;
    color: orangered;
    letter-spacing: 1px;
  }
  .rent-explain {
    margin-left: 5px;
    font-size: 16px;
    font-weight: bold;
  }
  .rent-right {
    height: 25px;
    line-height: 25px;
    text-align: right;
    color: #007aff;
    font-size: 14px;
    font-weight: 400;
  }
  .rent-right img {
    margin-right: 10px;
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-left: 15px;
  }

  /* 安全*/
  .detail-base-info-light-security {
    background-color: #f5f0e9;
    color: #c68831;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin-top: 10px;
  }
  .detail-base-info-light-security img {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }

  /* 地表*/
  .detail-base-info-light-area {
    margin-top: 20px;
    height: 80px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    text-align: center;
  }
  .area-top, .area-bottom {
    letter-spacing: 1px;
  }
  .area-bottom {
    margin-top: 8px;
    font-size: 15px;
    color: #cccccc;
  }

  /* 标签*/
  .detail-base-info-light-label {
    margin: 20px 0 10px 0;
    display: flex;
    flex-wrap: wrap;
  }
  .detail-base-info-light-label div {
    background-color: #eff0f7;
    color: #6c74ea;
    padding: 7px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    border-radius: 5px;
  }

  /* 坐标*/
  .detail-base-info-light-location {
    padding: 15px 20px 0;
    border: 1px solid #cccccc;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(100,100,100,.1);
    margin-bottom: 10px;
  }
  .location-image {
    text-align: right;
  }
  .location-image img{
    width: 25px;
    height: 25px;
    margin-top: 5px;
  }
  .location-ms {
    letter-spacing: 1px;
  }
</style>
