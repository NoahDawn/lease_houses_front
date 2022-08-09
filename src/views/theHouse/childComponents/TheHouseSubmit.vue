<template>
    <div class="the-house-submit">
      <div :class="{submitCheck:ifSubmit,submitDisabled:!ifSubmit}"
           @click="submitHouseMessage"
           :disabled="!ifSubmit">确认修改</div>
    </div>
</template>

<script>
  export default {
    name: "TheHouseSubmit",
    props: {
      ifSubmit: {  // 控制确认按钮是否可点击
        type: Boolean,
        default: true
      }
    },
    methods: {
      submitHouseMessage() {
        this.$emit('submitHouseMessage')
      }
    }
  }
</script>

<style scoped>
  .the-house-submit {
    height: 49px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .the-house-submit div {
    height: 40px;
    width: 95%;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
  }
  .submitCheck {
    background-color: lightblue;
    color: white;
  }
  .submitDisabled {
    background-color: darkgray;
    color: black;
  }
</style>
