<template>
  <div class="entrust-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" style="font-size: 18px;font-weight: 400;">
        我的经纪人
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar"

  export default {
    name: "EntrustNavBar",
    components: {
      NavBar
    },
    methods: {
      back() {
        this.$router.push("/profile")
      },
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
