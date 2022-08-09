<template>
  <div class="tab-bar-item" @click="itemClick()">
    <div><slot name="item-icon"></slot></div>
    <div><slot name="item-text" class="item-font"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "ProfileToolsItem",
    props: {
      // 接受从点击item传来的路由
      link: String,
    },
    methods: {
      itemClick() {
        if(this.link !== '/') {
          this.$router.push(this.link)
        }
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 60px;
    font-size: 13px;
  }
  .tab-bar-item img {
    width: 27px;
    height: 27px;
    margin-top: 4px;
    margin-bottom: 2px;
    /*该元素放置在父元素的中部*/
    vertical-align: middle;
  }
</style>
