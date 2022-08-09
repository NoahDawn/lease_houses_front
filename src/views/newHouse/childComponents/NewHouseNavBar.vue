<template>
    <div class="new-house-nav-bar">
      <nav-bar class="bar">
        <div slot="left" @click="backProfile" class="back">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="center">房源发布</div>
        <div slot="right" class="check-right" @click="housePost">
          <img src="~assets/img/common/success.svg" alt="">
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "NewHouseNavBar",
    components: {
      NavBar
    },
    methods: {
      backProfile() {
        this.$emit('back')
        this.$router.replace('/profile')
      },
      /* 传出房源新建点击事件*/
      housePost() {
        this.$emit('housePost')
      }
    }
  }
</script>

<style scoped>
  .bar {
    box-shadow: 0 2px 2px rgba(100,100,100,.1);
  }
  .back {
    display: flex;
    align-items: center;
    height: 44px;
    padding-left: 10px;
  }
  .center {
    font-size: 18px;
    font-weight: 500;
  }
  .check-right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
  }
  .check-right img {
    height: 20px;
    width: 20px;
  }
</style>
