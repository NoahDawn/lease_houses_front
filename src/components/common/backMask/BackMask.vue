<template>
  <!--遮盖幕布-->
  <div id="back-mask">
    <!--幕布本体-->
    <div class="the-mask"
         :class="{mask_all:area['all'],mask_without_top:area['withoutTop'],mask_without_bottom:area['withoutBottom']}"
         v-if="ifShow"
         @click="maskHidden()"></div>
    <!--幕布上的弹出层-->
    <slot name="upper"></slot>
  </div>
</template>

<script>
  export default {
    name: "BackMask",
    data() {
      return {
        area: {
          'all': false,
          'withoutTop': false,
          'withoutBottom': false
        }
      }
    },
    props: {
      ifShow: {
        type: Boolean,
        default: false
      },
      maskArea: {
        type: String,
        default: 'all'
      }
    },
    created() {
      // 创建完成后根据传入值选择遮盖面积
      this.area[this.maskArea] = true
    },
    methods: {
      // 点击遮盖幕布隐藏自身和所有的弹窗
      maskHidden() {
        this.$emit('maskHidden')
      }
    }
  }
</script>

<style scoped>
  .the-mask {
    height: calc(100vh - 44px);
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 40;
    background-color: rgba(0,0,0,0.4);
  }
  .mask_all {
    top: 0;
  }
  .mask_without_top {
    top: 44px;
  }
  .mask_without_bottom {
    top: 49px;
  }
</style>
