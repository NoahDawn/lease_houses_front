<template>
  <!--可点击选项的toast-->
  <div id="toast-tab" v-if="ifShow">
    <!--标题-->
    <div class="tab-title">{{tab.title}}</div>
    <!--确认内容-->
    <div class="tab-content">{{tab.content}}</div>
    <!--确认选项-->
    <div class="tab-confirm">
      <span @click="changeShowState()">取消</span>
      <span @click="check()">确定</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ToastTab",
    props: {
      tab: {  // 弹出层的内容
        type: Object,
        default() {
          return {
            title: "",
            content: ""
          }
        }
      },
      ifShow: {  // 控制弹出层的显示
        type: Boolean,
        default: false
      }
    },
    methods: {
      // 确定操作
      check() {
        this.$emit('checkRight')
      },
      // 点击遮盖幕布隐藏自身和所有的弹窗
      changeShowState() {
        this.$emit('confirmCancel')
      }
    }
  }
</script>

<style scoped>
  #toast-tab {
    z-index: 45;
    position: absolute;
    top: 40%;
    left: 5%;
    right: 5%;
    background-color: white;
    padding: 15px 30px;
    border-radius: 4px;
  }
  .tab-title {
    text-align: center;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
  }
  .tab-content {
    padding: 25px 0;
    color: #5c6b77;
    font-size: 15px;
  }
  .tab-confirm {
    color: lightseagreen;
    height: 30px;
    display: flex;
    align-items: center;
    padding-left: calc(100% - 160px);
  }
  .tab-confirm span {
    width: 80px;
    text-align: right;
    font-size: 15px;
  }
</style>
