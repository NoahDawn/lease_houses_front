<template>
    <div class="follow-control-bar">
      <div class="control-left">
        <tab-control :titles="titles"/>
      </div>
      <div class="control-right" @click="collectManage">{{manageType}}</div>
    </div>
</template>

<script>
  import TabControl from 'components/content/tabControl/TabControl'

  export default {
    name: "FollowControlBar",
    data() {
      return {
        titles: ['单人租', '多人租']
      }
    },
    props: {
      ifManageSystem: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    components: {
      TabControl
    },
    computed: {
      manageType() {
        return this.ifManageSystem ? '完成' : '管理'
      }
    },
    methods: {
      // 传出事件，转换为收藏管理模式
      collectManage() {
        this.$emit('collectManage')
      }
    }
  }
</script>

<style scoped>
  .follow-control-bar {
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .control-left {
    width: 50%;
  }
  .control-right {
    height: 55px;
    width: 50%;
    line-height: 55px;
    text-align: right;
    padding-right: 20px;
    font-weight: bold;
  }
</style>
