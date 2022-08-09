<template>
  <!--点评顶部导航栏-->
  <div>
    <nav-bar class="nav">
      <div slot="left" @click="backProfile" class="nav-left">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="nav-center">我的点评</div>
      <div slot="right" class="nav-right">
        <img src="~assets/img/comment/comment_question.svg" alt="">
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "CommentNavBar",
    components: {
      NavBar,
    },
    methods: {
      // 回到主页面
      backProfile() {
        this.$router.replace('/profile')
      }
    }
  }
</script>

<style scoped>
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
    font-weight: 500;
  }
  .nav-right {
    text-align: center;
  }
  .nav-right img {
    margin-top: 10px;
    width: 24px;
    height: 24px;
  }
</style>
