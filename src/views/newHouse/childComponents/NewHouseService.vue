<template>
    <div class="service">
      <div class="message_title">服务内容</div>
      <div v-for="item in service" class="service-item">
        <img :src="item.image" alt="">
        <div class="service-title">{{item.title}}</div>
        <div class="service-content">{{item.content}}</div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        service: [
          { image: require('@/assets/img/house/service/house_VR.png'),
            title: '免费VR拍摄',
            content: '免费拍全景展示，永久存老屋记忆'},
          { image: require('@/assets/img/house/service/house_resources.png'),
            title: '丰富买家资源',
            content: '全国上下14万+专业经纪人，线上千万级浏览器'},
          { image: require('@/assets/img/house/service/house_team.png'),
            title: '专业经纪人团队',
            content: '政策咨询，房屋定价，专业带看'}
        ]
      }
    },
    name: "NewHouseService"
  }
</script>

<style scoped>
  .message_title {
    font-size: 22px;
    font-weight: bold;
    padding-left: 20px;
    padding-top: 20px;
    border-top: 10px solid #eee;
  }
  .service-item {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
  }
  .service-item img {
    width: 80%;
    height: 200px;
  }
  .service-title {
    margin-top: 10px;
    font-size: 20px;
  }
  .service-content {
    margin-top: 10px;
    font-size: 14px;
    color: #8a8a8a;
  }
</style>
