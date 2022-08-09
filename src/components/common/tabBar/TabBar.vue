<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  #tab-bar {
    /*显示样式为内容均分*/
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /*阴影：x坐标、y坐标（逆向为正）、扩散度、色彩*/
    box-shadow: 0px -2px 1px rgba(100,100,100,.1);
  }

</style>
