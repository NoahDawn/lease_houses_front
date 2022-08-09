<template>
    <div class="information-content">
      <div v-for="item in subscribe">
        <information-content-item :subscribe="item" />
      </div>
    </div>
</template>

<script>
  import InformationContentItem from './InformationContentItem'

  export default {
    name: "InformationContent",
    components: {
      InformationContentItem
    },
    data() {
      return {
        subscribe: [
          {
            /* 动态绑定本地图片，使用require导入，同时不同标签中的~，此处使用系统定义src符号@*/
            image: require('@/assets/img/information/subscribe_system.svg'),
            time: '06-28 13:31',
            title: '订阅号',
            content: '感谢您使用本租房APP'
          },
          {
            image: require('@/assets/img/information/subscribe_mine.svg'),
            time: '07-21 17:16',
            title: '订阅号',
            content: '海外置业：【资讯】全球放假分析，哪些国家房价将涨？'
          },
          {
            image: require('@/assets/img/information/subscribe_others.svg'),
            time: '12-22 09:02',
            title: '订阅号',
            content: '关注牛逼租房，随时获取想要的房屋信息'
          },
          {
            image: require('@/assets/img/information/subscribe_server.svg'),
            time: '08-30 12:11',
            title: '订阅号',
            content: '咨询人工服务，及时反馈使用上遇到的问题'
          },
          {
            image: require('@/assets/img/information/subscribe_demand.svg'),
            time: '08-30 12:11',
            title: '订阅号',
            content: '活用系统反馈，及时提出建议与意见，谢谢您的配合'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
