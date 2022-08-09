<template>
    <div id="the-house">
      <the-house-nav-bar
        class="nav-bar"
        @deleteHouse="deleteHouse"
        :can-delete="canInput"/>
      <scroll class="content">
        <the-house-content
          :house-item="houseItem"
          ref="houseContent"
          :can-input="canInput"/>
      </scroll>
      <the-house-submit :if-submit="canInput" @submitHouseMessage="submitHouseMessage"/>
    </div>
</template>

<script>
  import TheHouseNavBar from './childComponents/TheHouseNavBar'
  import TheHouseContent from './childComponents/TheHouseContent'
  import TheHouseSubmit from './childComponents/TheHouseSubmit'

  import Scroll from 'components/common/scroll/Scroll'

  import { postUpdateHouse, postDeleteHouse } from "network/house";

  export default {
    name: "TheHouse",
    data() {
      return {
        houseItem: {},
        canInput: true  // 控制是否可删和修改项是否可选中
      }
    },
    components: {
      TheHouseNavBar,
      TheHouseContent,
      TheHouseSubmit,

      Scroll
    },
    mounted() {
      this.houseItem = this.$route.query.houseItem
      this.caninput = this.canInputState(this.houseItem)
    },
    methods: {
      // 房源出租类型，出租状态等多因素，控制初步该页面时，可选中\删除\提交的布尔值
      canInputState(houseItem) {
        // 逾期且存在租户，返回false，不可修改
        if(houseItem.state === 3 && houseItem.rentCount > 0 && houseItem.ifLeased === 1) {
          return false
        } else {
          // 未逾期，未出租，返回true，可修改
          if(houseItem.ifLeased === 0) {
            return true
          } else {
            // 未逾期，已出租，根据出租类型判断，整租不可修改，合租可修改
            return houseItem.leaseType === 'together'
          }
        }
      },
      /* 判断主要信息是否为空*/
      ifNull(updateHouse) {
        if(!updateHouse.currentIntermediary ||
            updateHouse.currentIntermediary.id === 0 ||
            !updateHouse.rent || updateHouse.rentCount === '' ||
            !updateHouse.detail || !updateHouse.phone) {
          this.$toast.show('存在未输入项', 2000, false)
          return false
        }
        return true
      },
      /* 判断是否还有人在租赁中，有则返回true*/
      ifHaveRenter(houseItem) {
        return houseItem.rentCount !== 0 && houseItem.rentCount !== ''
      },
      /* 房源信息修改网络请求*/
      submitHouseMessage() {
        /* 当修改项符合内容时可进行网络请求*/
        if(this.ifNull(this.$refs.houseContent.houseItem)) {
          console.log(this.$refs.houseContent.houseItem)
          postUpdateHouse(this.$refs.houseContent.houseItem).then(res => {
            this.$toast.show(res.message, 2000, true)
          })
        }
      },
      /* 房源信息删除网络请求*/
      deleteHouse() {
        /* 删除前判断当前房源是否还有人在租赁中*/
        if(!this.ifHaveRenter(this.$refs.houseContent.houseItem)) {
          /* 将可输入项和按钮变为不可选中*/
          this.canInput = false
          /* 发送删除网络请求*/
          postDeleteHouse(this.$refs.houseContent.houseItem).then(res => {
            if(res) {
              // message是显示结果信息，result是显示结果布尔值
              this.$toast.show(res.message, 2000, res.result)
            }
          })
        } else {
          this.$toast.show('当前还有人在租赁中', 2000, false)
        }
      }
    }
  }
</script>

<style scoped>
  #the-house {
    position: relative;
    height: 100vh;
    background-color: white;
    z-index: 10;
  }
  .nav-bar {
    box-shadow: 0 2px 1px rgba(100,100,100,.1);
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    position: relative;
  }
</style>
