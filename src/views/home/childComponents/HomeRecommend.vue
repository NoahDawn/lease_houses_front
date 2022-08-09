<template>
    <div class="recommend">
      <div v-for="item in recommends" class="recommend-item">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    padding: 10px 0 15px;
  }

  .recommend-item {
    flex: 1;
    color: black;
    text-align: center;
    font-size: 13px;
  }

  .recommend-item img{
    height: 40px;
    width: 40px;
    margin-bottom: 10px;
  }
</style>
