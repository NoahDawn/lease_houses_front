<template>
    <div id="record">
      <record-nav-bar class="nav-bar"/>
      <scroll class="content"
              ref="Scroll"
              :probe-type="3"
              @scroll="getPosition" >
        <record-content :record-list="recordList"/>
      </scroll>
      <!--对组件的点击事件需要加.native后缀-->
      <back-top @click.native="backTop" v-show="ifBackTop" />
    </div>
</template>

<script>
  import RecordNavBar from './childComponents/RecordNavBar'
  import RecordContent from './childComponents/RecordContent'

  import Scroll from 'components/common/scroll/Scroll'

  import { getRecord } from "network/record";
  import { backTop } from "common/mixin"
  import BackTop from "../../components/content/backTop/BackTop";

  export default {
    name: "Record",
    data() {
      return {
        recordList: []
      }
    },
    components: {
      BackTop,
      RecordNavBar,
      RecordContent,

      Scroll
    },
    mixins: [backTop],
    mounted() {
      getRecord(this.$store.state.loginUserMS.id).then(res => {
        this.recordList = res.listData
      })
    },
    methods: {
      getPosition(position) {
        this.ifShowBackTop(position)
      }
    }
  }
</script>

<style scoped>
  #record {
    position: relative;
    height: 100vh;
    background-color: white;
    z-index: 10;
  }
  .nav-bar {
    box-shadow: 0 2px 1px rgba(100,100,100,.1);
  }
  .content {
    height: calc(100% - 44px);
    position: relative;
    overflow: hidden;
  }
</style>
