<template>
  <!--设置主页-->
  <div id="set">
    <!--设置顶部导航栏-->
    <nav-bar >
      <div slot="left" @click="backProfile" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center">设置</div>
      <div slot="right" class="customer_service">
        <img src="~assets/img/set/customer_service.svg" alt="">
      </div>
    </nav-bar>

    <!--设置主内容-->
    <scroll class="content">
      <!--选择项-->
      <div class="set-content">
        <div v-for="(item,index) in setList" :class="{addBorder: ifAdd(index)}">
          <set-bar :set-item="item" />
        </div>
      </div>

      <!--登出按钮-->
      <div class="set-bottom-bar" v-if="$store.state.loginUserMS.id!==0">
        <div class="quit" @click="quitLogin">退出登录</div>
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
  import NavBar from 'components/common/navBar/NavBar'
  import SetBar from 'components/common/setBar/SetBar'
  import Scroll from 'components/common/scroll/Scroll'
  import BackMask from 'components/common/backMask/BackMask'

  import ToastTab from 'components/content/toastTab/ToastTab'

  export default {
    name: "Set",
    data() {
      return {
        setList: ['推送设置','清理缓存','检查更新',  // 设置列表
          '推荐设置','免打扰设置','联系客服',
          '在线客服','违法和不良信息举报','关于我们',
          '去评分','用户隐私与规则中心','证照资质中心'],
        toastTab: {  // 弹出层显示信息
          tab: {
            title: "",
            content: ""
          },
          ifShow: false  // 弹出层与屏幕幕布的显示选项
        }
      }
    },
    components: {
      NavBar,
      SetBar,
      Scroll,
      BackMask,

      ToastTab
    },
    methods: {
      // 回到主页面
      backProfile() {
        this.$router.replace('/profile')
      },
      /* 动态添加边框*/
      ifAdd(index) {
        if(index === 0 || index === 5 || index === 7 || index === 8) {
          return true
        } else {
          return false
        }
      },
      // 弹出登录确认框
      quitLogin() {
        this.toastTab.ifShow = true
        this.toastTab.tab.title = "确认"
        this.toastTab.tab.content = "您确定要退出登录吗?"
      },
      // 确认登出
      checkRight() {
        this.confirmCancel()
        this.$store.state.loginUserMS = {id:0}
        this.backProfile()
      },
      // 取消登出
      confirmCancel() {
        this.toastTab.ifShow = false
      }
    }
  }
</script>

<style scoped>
  #set {
    position: relative;
    background-color: white;
    z-index: 10;
    height: 100vh;
  }
  /* 顶部导航*/
  .back {
    display: flex;
    align-items: center;
    height: 44px;
    padding-left: 10px;
  }
  .center {
    font-size: 18px;
    font-weight: 500;
  }
  .customer_service {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
  }
  .customer_service img {
    height: 20px;
    width: 20px;
  }

  /* 主内容区*/
  .content {
    position: relative;
    height: calc(100% - 44px);
    overflow: hidden;
    background-color: white;
  }
  .addBorder {
    border-top: 15px solid #eee;
  }

  /* 底部登出*/
  .set-bottom-bar {
    height: 49px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .quit {
    height: 100%;
    width: 100%;
    color: red;
    border-radius: 5px;
    background-color: white;
    line-height: 49px;
    text-align: center;
  }
</style>
