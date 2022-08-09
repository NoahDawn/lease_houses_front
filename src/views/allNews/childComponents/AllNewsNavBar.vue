<template>
    <div>
      <nav-bar>
        <div slot="left" class="back" @click="back">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="titles">
          <div>评论</div>
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "AllNewsNavBar",
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
  .titles {
    font-size: 14px;
  }
</style>
