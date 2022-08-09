<template>
    <div id="house-manage">
      <house-manage-nav-bar class="nav-bar"/>
      <scroll class="content"
              ref="Scroll"
              :probe-type="3"
              @scroll="getPosition" >
        <house-manage-content :house-list="houseList" @resetHouseList="resetHouseList"/>
      </scroll>
      <!--对组件的点击事件需要加.native后缀-->
      <back-top @click.native="backTop" v-show="ifBackTop" />
    </div>
</template>

<script>
  import HouseManageNavBar from './childComponents/HouseManageNavBar'
  import HouseManageContent from './childComponents/HouseManageContent'

  import Scroll from 'components/common/scroll/Scroll'

  import { getOwnerHouseList } from "network/house";
  import { backTop } from "common/mixin"
  import { dateCodeChange } from 'common/Utils'
  import BackTop from "../../components/content/backTop/BackTop";

  export default {
    name: "HouseManage",
    data() {
      return {
        houseList: []
      }
    },
    components: {
      BackTop,
      HouseManageNavBar,
      HouseManageContent,

      Scroll
    },
    mixins: [backTop],
    mounted() {
      this.getOwnerHouseList()
    },
    methods: {
      // 请求个人房源管理列表
      getOwnerHouseList() {
        this.houseList = []
        getOwnerHouseList(this.$store.state.loginUserMS.id, 'houseManage').then(res => {
          let effectList = []
          let overdueList = []
          // 处理逾期订单全部向后靠
          res.data.forEach((item) => {
            this.ifOverdue(item) ? overdueList.push(item) : effectList.push(item)
          })
          this.houseList.push(...effectList,...overdueList)
          console.log(this.houseList)
        })
      },
      // 判断是否逾期
      ifOverdue(item) {
        return dateCodeChange(new Date(item.destroyTime)) < dateCodeChange(new Date())
      },
      // 获取位置显示返回顶部
      getPosition(position) {
        this.ifShowBackTop(position)
      },
      // 重新请求数据列表
      resetHouseList() {
        this.getOwnerHouseList()
      }
    }
  }
</script>

<style scoped>
  #house-manage {
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
