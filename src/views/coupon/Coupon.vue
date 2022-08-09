<template>
  <!--优惠券部分-->
  <div id="coupon">
    <!--顶部导航栏-->
    <nav-bar class="nav">
      <div slot="left" @click="backProfile" class="nav-left">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="nav-center">我的优惠券</div>
    </nav-bar>

    <!--控制导航栏-->
    <tab-control style="margin-top: 10px;" :titles="titles" @tabClick="tabClick"/>

    <!--内容主体-->
    <div class="coupon-main">
      <!--有内容时显示-->

      <!--无内容时显示-->
      <div v-for="(item,index) in noneContent.tips"
           v-if="index === currentControlIndex"
           class="coupon-main-none">
        <img :src="noneContent.image" alt="">
        <div>{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'

  export default {
    name: "Coupon",
    data() {
      return {
        titles: ['未使用','使用记录','已失效'],  // 控制导航栏显示标题
        currentControlIndex: 0,  // 当前的控制导航栏下标
        noneContent: {
          image: require('@/assets/img/coupon/coupon_none.png'),
          tips: ['您还没有优惠券','您还没有已使用的优惠券','你还没有已失效的优惠券']
        }
      }
    },
    components: {
      NavBar,
      TabControl
    },
    methods: {
      // 回到主页面
      backProfile() {
        this.$router.replace('/profile')
      },
      // 切换控制栏的下标
      tabClick(controlIndex) {
        this.currentControlIndex = controlIndex
      }
    }
  }

</script>

<style scoped>
  #coupon {
    position: relative;
    background-color: white;
    z-index: 10;
    height: 100vh;
  }
  /* 顶部导航*/
  .nav {
    padding: 0 3%;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }
  .nav-left {
    display: flex;
    align-items: center;
    height: 44px;
  }
  .nav-left img {
    width: 20px;
    height: 20px;
  }
  .nav-center {
    line-height: 44px;
    text-align: center;
    height: 44px;
    font-size: 18px;
    font-weight: 600;
  }

  /* 无内容时显示的主体区域*/
  .coupon-main-none {
    text-align: center;
    margin: 25% 0;
  }
  .coupon-main-none div {
    margin-top: 10px;
    color: #cccccc;
    font-weight: 400;
    letter-spacing: 1px;
  }
</style>
