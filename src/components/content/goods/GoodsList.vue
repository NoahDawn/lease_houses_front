<template>
    <div class="goods-list">
      <goods-list-item v-for="item in goods" :goodsItem="item"></goods-list-item>
    </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
