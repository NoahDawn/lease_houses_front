<template>
  <div class="check-button" :class="{active: isCheck}">
    <img src="~assets/img/follow/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isCheck: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    width: 16px;
    height: 16px;
    border: 1px solid darkgray;
    background-color: white;
    border-radius: 50%;
  }
  .active {
    background-color: orange;
    border: 1px solid orange;
  }
</style>
