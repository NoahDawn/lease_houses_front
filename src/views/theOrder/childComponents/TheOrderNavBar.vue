<template>
    <div class="order-nav-bar">
      <nav-bar>
        <div slot="left" class="back" @click="back">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center">订单确认</div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "TheOrderNavBar",
    components: {
      NavBar
    },
    methods: {
      back() {
        this.$router.replace('/orderCheck')
      }
    }
  }
</script>

<style scoped>
  .back img {
    width: 30px;
    height: 22px;
    margin-top: 11px;
    margin-left: 15px;
  }
</style>
