<template>
  <div id="intermediary">
    <!-- 导航栏部分 -->
    <IntermediaryNavBar class="nav-bar"/>

    <!-- 主体部分 -->
    <scroll class="content" ref="Scroll">
      <div class="container">
        <div class="intermediary-items" v-for="(intermediary,index) in intermediaryArr" :key="intermediary.id">
          <!-- 头像 -->
          <img :src="intermediary.avatar" alt="">

          <!-- 信息 -->
          <div class="intermediary-items-profile">
            <div class="intermediary-items-profile-name">{{intermediary.realname}}</div>
            <div class="intermediary-items-profile-location">{{intermediary.location}}</div>
            <div class="intermediary-items-profile-detail">
              <span class="intermediary-items-profile-detail-items" v-for="(detail,index) in intermediary.detail">{{detail}}</span>
            </div>
            <div class="intermediary-items-profile-count">
              <div>
                <div class="intermediary-items-profile-count-num">{{intermediary.dealCount}}</div>
                <div class="intermediary-items-profile-count-tips">历史成交</div>
              </div>
              <div>
                <div class="intermediary-items-profile-count-num">{{intermediary.credit}}</div>
                <div class="intermediary-items-profile-count-tips">用户信誉</div>
              </div>
              <div>
                <div class="intermediary-items-profile-count-num">{{intermediary.integral}}</div>
                <div class="intermediary-items-profile-count-tips">贝士积分</div>
              </div>
            </div>
          </div>

          <!-- 委托 -->
          <div class="intermediary-items-entrust" @click="intermediaryEntrust(index)">
            <div class="intermediary-items-entrust-right">委托</div>
          </div>
        </div>
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
  import IntermediaryNavBar from "./childComponents/IntermediaryNavBar"
  import Scroll from 'components/common/scroll/Scroll'
  import BackMask from 'components/common/backMask/BackMask'

  import ToastTab from 'components/content/toastTab/ToastTab'

  import { getIntermediaryList, intermediaryEntrust } from "network/intermediary.js"

  export default {
    name: "Intermediary",
    components: {
      IntermediaryNavBar,
      Scroll,
      BackMask,
      ToastTab
    },
    data() {
      return {
        intermediaryArr: [],  // 经纪人列表
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
      this.getIntermediaryList(userId)
    },
    methods: {
      // 获取经纪人列表
      getIntermediaryList(userId) {
        this.intermediaryArr = []
        getIntermediaryList(userId).then(res => {
          if(res.data.length > 0) {
            this.intermediaryArr.push(...res.data)
          }
        })
      },
      // 点击委托后弹出确认层
      intermediaryEntrust(index) {
        this.toastTab.ifShow = true
        this.toastTab.tab.title = "确认"
        this.toastTab.tab.content = "您确定要委托 " + this.intermediaryArr[index].realname + " 吗?"
        this.currentIntermediary = this.intermediaryArr[index]
      },
      // 确认委托
      checkRight() {
        this.confirmCancel()
        const userId = this.$store.state.loginUserMS.id
        intermediaryEntrust(userId, this.currentIntermediary.id).then(res => {
          if(res.data) {
            this.$toast.show("委托经纪人成功", 2000, true)
            const userId = this.$store.state.loginUserMS.id
            this.getIntermediaryList(userId)
          }
        })
      },
      // 取消委托
      confirmCancel() {
        this.toastTab.ifShow = false
      }
    }
  }
</script>

<style scoped>
  #intermediary {
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
    font-weight: 600;
  }
  .intermediary-items-entrust-right {
    width: 100%;
    height: 25px;
    color: #007aff;
    background-color: powderblue;
    border-radius: 5px;
    line-height: 25px;
    font-size: 14px;
  }
</style>
