<template>
    <div class="information-nav-bar">
      <nav-bar class="nav-bar">
        <div slot="center">消息</div>
        <div slot="right" class="right-img">
          <img src="~assets/img/information/contacts.svg" alt="">
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'
  
  export default {
    name: "InformationNavBar",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .nav-bar {
    box-shadow: 0 2px 1px rgba(100,100,100,.1);
  }
  .right-img {
    display: flex;
    height: 44px;
    align-items: center;
    justify-content: center;
  }
  .right-img img {
    width: 20px;
    height: 20px;
  }
</style>
