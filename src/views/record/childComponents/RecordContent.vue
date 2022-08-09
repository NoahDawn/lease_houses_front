<template>
    <div class="record-content">
      <none v-if="Object.keys(recordList).length===0" :none-content="noneContent" />

      <div v-else v-for="item in recordList" class="record-item">
        <goods-list-item :goods-item="item"/>
      </div>
    </div>
</template>

<script>
  import GoodsListItem from 'components/content/goods/GoodsListItem'
  import None from 'components/common/none/None'

  export default {
    name: "RecordContent",
    data() {
      return {
        noneContent: {
          image: require('@/assets/img/common/none.png'),
          content: '您还没有浏览过任何房源',
          tips: '浏览首页中任意房源并选择合适的房子'
        }
      }
    },
    props: {
      recordList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem,
      None
    }
  }
</script>

<style scoped>
  .record-item {
    padding: 0 10px 10px 0;
    border-bottom: 5px solid #eee;
  }
</style>
