<template>
    <div class="home-nav-bar">
      <nav-bar class="home-nav">
        <div slot="center" class="center">
          <div class="position-find">
            <div class="find-now">全国</div>
            <div class="find-input">
              <img src="~assets/img/common/find.svg" alt="">
              <input type="text" @change.lazy="addressChoose" placeholder="搜索地址" class="input-content">
            </div>
          </div>
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "HomeNavBar",
    components: {
      NavBar
    },
    methods: {
      addressChoose(e) {
        /*console.log(e.target.value)*/
        this.$emit('addressChoose',e.target.value)
      }
    }
  }
</script>

<style scoped>
  .center {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .position-find {
    height: 40px;
    width: 100%;
    border: 1px solid #eee;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .find-now {
    width: 60px;
    height: 20px;
    line-height: 20px;
    border-right: 1px solid #eee;
  }
  .find-input {
    width: calc(100% - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding-left: 10px;
  }
  .find-input img {
    width: 15px;
    height: 15px;
  }
  .input-content {
    border: 0;
    width: calc(100% - 25px);
    padding-left: 5px;
    margin-left: 10px;
    height: 25px;
  }
</style>
