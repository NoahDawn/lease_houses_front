<template>
    <div class="set-bar">
      <div class="content">
        <div class="set-item">{{setItem}}</div>
        <img src="~assets/img/common/right.svg" alt="">
      </div>
    </div>
</template>

<script>
  export default {
    name: "SetBar",
    props: {
      setItem: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .set-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }
  .content {
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
  .set-item {
    font-size: 16px;
    font-weight: 600;
    width: calc(100% - 25px);
  }
  .set-bar img {
    width: 25px;
    height: 25px;
  }
</style>
