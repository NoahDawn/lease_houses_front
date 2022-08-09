<template>
    <div class="none-content">
      <div class="content-img">
        <img :src="noneContent.image" alt="">
      </div>
      <div class="content-ms">{{noneContent.content}}</div>
      <div class="content-tips">{{noneContent.tips}}</div>
    </div>
</template>

<script>
  export default {
    name: "None",
    props: {
      noneContent: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .content-img {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content-img img {
    width: 60%;
    height: 60%;
  }
  .content-ms {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .content-tips {
    text-align: center;
    font-size: 14px;
    color: #5c6b77;
    margin: 20px 5% 0;
  }
</style>
