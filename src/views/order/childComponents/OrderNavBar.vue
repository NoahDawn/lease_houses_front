<template>
    <div class="order-nav-bar">
      <nav-bar>
        <div slot="left" class="back" @click="back">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center">发起订单</div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "OrderNavBar",
    components: {
      NavBar
    },
    methods: {
      back() {
        this.$router.back()
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
