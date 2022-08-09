<template>
  <div class="content-subscribe">
    <div class="subscribe-img">
      <img :src="subscribe.image" alt="">
    </div>
    <div class="subscribe-message">
      <div class="message-time">{{subscribe.time}}</div>
      <div class="message-title">{{subscribe.title}}</div>
      <div class="message-content">{{subscribe.content}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InformationContentItem",
    props: {
      subscribe: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .content-subscribe {
    display: flex;
    height: 70px;
    margin-top: 10px;
  }
  .subscribe-img {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .subscribe-img img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .subscribe-message {
    display: flex;
    flex-direction: column;
    height: 70px;
    width: calc(100% - 70px);
    border-bottom: 1px solid #eee;
  }
  .message-time {
    height: 10px;
    line-height: 20px;
    color: #5c6b77;
    font-size: 12px;
    text-align: right;
    padding-right: 10px;
  }
  .message-title {
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    font-weight: bold;
  }
  .message-content {
    flex: 1;
    padding-right: 10px;
    line-height: 25px;
    font-size: 13px;
    color: #5c6b77;
    white-space: nowrap;/*内容超宽后禁止换行显示*/
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/*文字超出部分以省略号显示*/
  }
</style>
