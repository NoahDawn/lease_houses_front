<template>
  <div id="entrust">
    <!-- 导航栏部分 -->
    <EntrustNavBar class="nav-bar"/>

    <!-- 主体部分 -->
    <scroll class="content" ref="Scroll">
      <div class="container" v-if="entrustArr.length > 0">
        <div class="intermediary-items" v-for="(entrust,index) in entrustArr" :key="entrust.intermediary.id">
          <!-- 头像 -->
          <div>
            <img :src="entrust.intermediary.avatar" alt="">
            <div class="mission-state">
              <span v-if="entrust.mission === 1" style="color: mediumseagreen">在职</span>
              <span v-else style="color: orange">等待</span>
            </div>
          </div>

          <!-- 信息 -->
          <div class="intermediary-items-profile">
            <div class="intermediary-items-profile-name">{{entrust.intermediary.realname}}</div>
            <div class="intermediary-items-profile-location">{{entrust.intermediary.location}}</div>
            <div class="intermediary-items-profile-detail">
              <span class="intermediary-items-profile-detail-items" v-for="(detail,index) in entrust.intermediary.detail">{{detail}}</span>
            </div>
            <!-- 展示三个数据 -->
            <div v-if="entrust.mission === 0" class="intermediary-items-profile-count">
              <div>
                <div class="intermediary-items-profile-count-num">{{entrust.intermediary.dealCount}}</div>
                <div class="intermediary-items-profile-count-tips">历史成交</div>
              </div>
              <div>
                <div class="intermediary-items-profile-count-num">{{entrust.intermediary.credit}}</div>
                <div class="intermediary-items-profile-count-tips">用户信誉</div>
              </div>
              <div>
                <div class="intermediary-items-profile-count-num">{{entrust.intermediary.integral}}</div>
                <div class="intermediary-items-profile-count-tips">贝士积分</div>
              </div>
            </div>

            <!-- 展示负责房源名称 -->
            <div v-else>
              <div style="font-size: 16px;">负责房源</div>
              <div style="font-size: 17px;margin-top:8px;color: dodgerblue">{{entrust.houseName}}</div>
            </div>
          </div>

          <!-- 解除委托 -->
          <div class="intermediary-items-entrust">
            <div v-if="entrust.mission !== 1"
                 class="intermediary-items-entrust-right"
                 @click="intermediaryFire(index)">卸任</div>
          </div>
        </div>
      </div>

      <div v-else class="no-data">
        <img src="~assets/img/entrust/entrust_none.png" alt="">
        <h4>暂无为您服务的经纪人</h4>
      </div>
    </scroll>

    <!--屏幕幕布-->
    <back-mask :if-show="toastTab.ifShow" mask-area="withoutTop" @maskHidden="confirmCancel()">
      <!--确认弹窗-->
      <toast-tab
        slot="upper"
        :tab="toastTab.tab"
        :if-show="toastTab.ifShow"
        @checkRight="checkRight()"
        @confirmCancel="confirmCancel()"/>
    </back-mask>
  </div>
</template>

<script>
  import EntrustNavBar from "./childComponents/EntrustNavBar"
  import Scroll from 'components/common/scroll/Scroll'
  import BackMask from 'components/common/backMask/BackMask'
  import ToastTab from 'components/content/toastTab/ToastTab'

  import { getEntrustList, entrustFire } from "network/intermediary.js"

  export default {
    name: "Intermediary",
    components: {
      EntrustNavBar,
      Scroll,
      BackMask,
      ToastTab
    },
    data() {
      return {
        entrustArr: [],  // 经纪人列表
        toastTab: {  // 弹出层显示信息
          tab: {
            title: "",
            content: ""
          },
          ifShow: false  // 弹出层与屏幕幕布的显示选项
        },
        currentIntermediary: {}  // 当前操作的经纪人对象
      }
    },
    created() {
      const userId = this.$store.state.loginUserMS.id
      this.getEntrustList(userId)
    },
    methods: {
      // 获取个人经纪人列表
      getEntrustList(userId) {
        this.entrustArr = []
        getEntrustList(userId).then(res => {
          if(res.data.length > 0) {
            this.entrustArr.push(...res.data)
            console.log(this.entrustArr)
          }
        })
      },
      // 点击委托后弹出确认层
      intermediaryFire(index) {
        this.toastTab.ifShow = true
        this.toastTab.tab.title = "确认"
        this.toastTab.tab.content = "您确定要卸任 " + this.entrustArr[index].intermediary.realname + " 吗?"
        this.currentIntermediary = this.entrustArr[index].intermediary
      },
      // 确认卸任
      checkRight() {
        this.confirmCancel()
        const userId = this.$store.state.loginUserMS.id
        entrustFire(userId, this.currentIntermediary.id).then(res => {
          if(res) {
            this.$toast.show(res.message, 2000, true)
            this.getEntrustList(userId)
          }
        })
      },
      // 取消卸任
      confirmCancel() {
        this.toastTab.ifShow = false
      }
    }
  }
</script>

<style scoped>
  #entrust {
    position: relative;
    height: 100vh;
    background-color: white;
    z-index: 10;
  }
  .nav-bar {
    box-shadow: 0 2px 1px rgba(100,100,100,.1)
  }
  .content {
    position: relative;
    height: calc(100% - 44px);
    overflow: hidden;
    background-color: white;
  }

  /*主体容器*/
  .container {
    padding: 20px 5%;
  }

  /*经纪人个体信息展示部分*/
  .intermediary-items {
    display: flex;
    justify-content: center;
    width: 100%;
    border-bottom: solid 1px #EEEEEE;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  /*头像部分*/
  .intermediary-items img {
    width: 70px;
    height: 90px;
    border-radius: 5px;
  }

  /*个人信息部分*/
  .intermediary-items-profile {
    margin: 0 20px;
    width: calc(100% - 70px - 40px - 40px);
  }
  .intermediary-items-profile-name {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .intermediary-items-profile-location {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .intermediary-items-profile-detail {
    margin-bottom: 10px;
  }
  .intermediary-items-profile-detail-items {
    padding: 5px 7px;
    border-radius: 3px;
    background-color: #EEEEEE;
    color: silver;
    font-size: 13px;
    margin-right: 7px;
  }
  .intermediary-items-profile-count {
    display: flex;
    justify-content: space-between;
  }
  .intermediary-items-profile-count-num {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 3px;
  }
  .intermediary-items-profile-count-tips {
    font-size: 14px;
    color: #666666;
  }

  /*委托部分*/
  .intermediary-items-entrust {
    width: 40px;
    text-align: center;
  }
  .intermediary-items-entrust-right {
    width: 100%;
    height: 25px;
    color: red;
    background-color: #f2dede;
    border-radius: 5px;
    line-height: 25px;
    font-size: 14px;
  }

  /*任务状态*/
  .mission-state {
    margin-top: 15px;
    text-align: center;
    font-weight: 600;
  }

  /*无数据时样式*/
  .no-data {
    text-align: center;
    margin-top: 100px;
  }
  .no-data img {
    width: 200px;
    height: 200px;
  }
</style>
