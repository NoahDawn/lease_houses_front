<template>
    <div id="follow">
      <!--顶部控制栏-->
      <follow-control-bar
        @collectManage="collectManage"
        :if-manage-system="ifManageSystem"/>

      <!--排序卡片和房型删选的切换-->
      <!--<div class="order-type" v-if="!ifManageSystem && collectList.length>0">-->
      <div class="order-type" v-if="!ifManageSystem && ifShowThisDom">
        <!--卡片部分-->
        <div class="card-choice" v-for="(cardItem, cardIndex) in card">
          <div class="the-card" @click.stop="cardShowOrClose(cardIndex)">
            <span v-if="cardItem.currentIndex===0" class="the-card-span">
              {{cardItem.defaultName}}
            </span>
            <span v-else class="the-card-span" :class="{the_card_span_show:cardItem.currentIndex!==0}">
              {{cardItem.cardContent[cardItem.currentIndex].contentName}}
            </span>
            <img v-if="!cardItem.ifOpen || currentCardIndex!==cardIndex" class="the-card-img" src="~assets/img/common/screen_close.png" alt="">
            <img v-else class="the-card-img" src="~assets/img/common/screen_show.png" alt="">
          </div>

          <!--卡片展开后内容-->
          <div class="the-card-open" v-if="cardItem.ifOpen && currentCardIndex===cardIndex">
            <div class="the-card-open-content"
                 v-for="(contentItem, contentIndex) in cardItem.cardContent">
              <div class="the-card-open-content-item"
                   @click="changeCurrentIndex(cardIndex,contentIndex)">
                {{contentItem.contentName}}
              </div>
            </div>
            <div class="the-card-open-shadow"></div>
          </div>
        </div>

        <!--复原部分-->
        <div class="card-reset" @click="resetCondition">
          <span class="the-card-span" :class="{the_card_span_show:resetClick}">条件复位</span>
          <img v-if="!resetClick" class="the-card-img-reset" src="~assets/img/follow/reset.svg" alt="">
          <img v-else class="the-card-img-reset" src="~assets/img/follow/reset_fill.svg" alt="">
        </div>
      </div>

      <!--切换显示总数量与空关注图片-->
      <div>
        <!--总数量显示-->
        <div class="all-count" v-if="!ifManageSystem && ifShowThisDom">
          <div class="all-count-content">全部({{collectList.length}})</div>
        </div>

        <!--空收藏提示-->
        <div v-if="collectList.length===0">
          <div class="content-img">
            <img src="~assets/img/follow/follow_none.png" alt="">
          </div>
          <div class="content-ms">您还没有关注的房源</div>
          <div class="content-tips">关注之后能获得更多的房源动态消息</div>
        </div>
      </div>

      <!--收藏的主体内容-->
      <scroll class="content" :class="{content_top:ifManageSystem}" ref="Scroll" v-if="collectList.length>0">
        <div v-for="(item,index) in collectList">
          <follow-list-content-item
            :key="item.id"
            :collect-item="item"
            :index="index"
            :if-manage-system="ifManageSystem"
            @checkChange="checkChange(index)"
            @followCancel="followCancel(item)"></follow-list-content-item>
        </div>
      </scroll>

      <!--管理操作栏-->
      <div class="collect-manage-bar" v-if="ifManageSystem && collectList.length>0">
        <div class="collect-manage-bar-left" @click="allCheck">
          <check-button class="all-check-button" :class="{active: (ifAllCheckActive || ifAllCheckPassive)}"></check-button>
          <div class="all-check-content">全选</div>
        </div>
        <div class="collect-manage-bar-right">
          <button type="button" class="all-check-cancel"
                  :disabled="!ifAllCheckActive && !ifAllCheckPassive" @click="followCancelAll">取消关注</button>
        </div>
      </div>

      <!--屏幕幕布-->
      <back-mask :if-show="toastTab.ifShow" @maskHidden="confirmCancel()">
        <!--确认弹窗-->
        <toast-tab
          slot="upper"
          :tab="toastTab.tab"
          :if-show="toastTab.ifShow"
          mask-area="all"
          @checkRight="checkRight()"
          @confirmCancel="confirmCancel()"/>
      </back-mask>
    </div>
</template>

<script>
  import FollowControlBar from './childComponents/FollowControlBar'
  import FollowListContentItem from './childComponents/FollowListContentItem'

  import CheckButton from 'components/content/checkButton/CheckButton'
  import BackMask from 'components/common/backMask/BackMask'
  import ToastTab from 'components/content/toastTab/ToastTab'
  import Scroll from 'components/common/scroll/Scroll'

  import { getCollectList, deleteCollectData } from 'network/collect'
  import { getHouseTypeList } from "network/house";

  export default {
    name: "Follow",
    data() {
      return {
        card: [  // 排序卡片与房型卡片
          { // 排序卡片
            cardName: 'orderCard',
            ifOpen: false,  // 判断选项卡是否展开
            currentIndex: 0,  // 默认的选项下标
            defaultName: '收藏顺序',
            cardContent: [
              {contentValue:'drop',contentType:'collectId',contentName:'默认排序'},
              {contentValue:'rise',contentType:'rent',contentName:'价格升序'},
              {contentValue:'drop',contentType:'rent',contentName:'价格降序'},
              {contentValue:'rise',contentType:'collectId',contentName:'加入升序'},
              {contentValue:'drop',contentType:'collectId',contentName:'加入降序'},
            ]
          },
          { // 房型卡片
            cardName: 'typeCard',
            ifOpen: false,  // 判断选项卡是否展开
            currentIndex: 0,  // 默认的选项下标
            defaultName: '房型选择',
            cardContent: [
              {contentValue: 'all', contentName: '全部'},
            ]
          },
        ],
        currentCardIndex: 0,  // 当前可展开卡片内容的卡片下标
        resetClick: false,  // 条件复位按钮判断值
        ifManageSystem: false, // 判断是否是管理模式
        currentControlType: 'single',  // 顶部控制tab的选项类型，用于切换需要展示的收藏数据
        dataList: {'single':[],'together':[]},  // 网络请求的收藏数据
        collectList: [],  // 用于展示的列表
        ifAllCheckActive: false,  // 用于判断是否是全选(主动，控制所有选择按钮的的变化)
        toastTab: {  //  幕布遮盖弹出层显示信息
          tab: {
            title: "",
            content: ""
          },
          ifShow: false  // 弹出层与屏幕幕布的显示选项
        },
        collectCancelAll: [],  // 多项取关数组
        collectCancelSingle: {}  // 单一取关对象
      }
    },
    components: {
      Scroll,
      FollowControlBar,
      FollowListContentItem,
      CheckButton,
      BackMask,
      ToastTab
    },
    mounted() {
      // 挂载后获取收藏列表数据
      this.getCollectList()
      // 挂载后获取房源类型列表数据
      this.getHouseTypeList()

      // 切换控制bar的值
      this.$bus.$on('tabClick', controlType => {
        this.currentControlType = controlType
        // 触发一次条件复位
        this.resetCondition()
        // 重新赋值
        this.collectList = []
        this.collectList.push(...this.dataList[this.currentControlType])
      })
    },
    computed: {
      // 用于判断是否是全选(被动，根据所有选择按钮变化产生影响)
      ifAllCheckPassive() {
        // find函数查询并返回符合条件的第一个对象
        // 若存在未选中态即ifCheck为false，则返回该对象，因此返回值有值，根据!，return的结果是true
        // 否则return的结果是false
        return !this.collectList.find((item) => item.ifCheck === false)
      },
      // 用于判断是否应该隐藏，特别针对房型筛选后无内容，导致显示列表为空，但是总收藏列表存在
      ifShowThisDom() {
        if(this.collectList.length>0) {
          return true
        } else if(this.dataList[this.currentControlType].length>0) {
          return true
        }
        // 当前展示列表为空，且网络请求的当前类型收藏数据为空，返回false，其余情况为true
        return false
      }
    },
    methods: {
      // 网络请求房源类型的列表
      getHouseTypeList() {
        getHouseTypeList().then(res => {
          if(res.data) {
            // 将获取的数据类型键值对进行转化
            res.data.forEach(item => {
              item.contentValue = item.typeValue
              item.contentName = item.typeName
            })
            this.card[1].cardContent.push(...res.data)
          }
        })
      },
      // 初步请求收藏数据与取关后的再请求
      getCollectList() {
        // 先清空
        this.dataList = {'single':[],'together':[]}
        this.collectList = []
        getCollectList(this.$store.state.loginUserMS.id).then(res => {
          // 给请求的每一项数据，添加ifCheck判断值，默认值false为未选中
          res.data.forEach((item) => {
            item.ifCheck = false
            // 根据当前的已租赁人数分为单租与合租组
            this.dataList[item.leaseType].push(item)
          })
          // 展示列表push入当前controlType的列表
          this.collectList.push(...this.dataList[this.currentControlType])
          // 存入请求值后按照收藏的降序排列
          this.collectList.sort((last, next) => next.collectId - last.collectId)
          console.log(this.collectList)
        })
      },
      // 控制卡片的展开与收起
      cardShowOrClose(cardIndex) {
        this.card[cardIndex].ifOpen = !this.card[cardIndex].ifOpen
        this.currentCardIndex = cardIndex
        // 将不同于当前下标的卡片展开判断改为false
        for(let cardItem in this.card) {
          if(parseInt(cardItem) !== this.currentCardIndex) {
            this.card[cardItem].ifOpen = false
          }
        }
      },
      // 修改选显卡内容的下标
      changeCurrentIndex(cardIndex, contentIndex) {
        this.card[cardIndex].currentIndex = contentIndex
        // 控制卡片展开内容的收起
        this.cardShowOrClose(cardIndex)
        // 判断卡片名称，根据不同下标执行不容的收藏选择
        if(this.card[cardIndex].cardName === 'orderCard') {
          // 序列卡片排序变化
          this.orderCardChange(cardIndex, contentIndex)
        } else if(this.card[cardIndex].cardName === 'typeCard'){
          // 房源类型筛选变化
          this.typeCardChange(cardIndex, contentIndex)
        }
      },
      // 顺序卡片内容排序
      orderCardChange(cardIndex, contentIndex) {
        // 根据升降序条件和判断属性来更改顺序
        let order = this.card[cardIndex].cardContent[contentIndex]
        if(order.contentValue === "drop") {
          this.collectList.sort((last,next) => next[order.contentType] - last[order.contentType])
        } else if(order.contentValue === "rise") {
          this.collectList.sort((last,next) => last[order.contentType] - next[order.contentType])
        }
      },
      // 房型卡片内容排序
      typeCardChange(cardIndex, contentIndex) {
        // 重新将展示列表获取值，防止筛选后的数据丢失
        this.collectList = []
        this.collectList.push(...this.dataList[this.currentControlType])
        // 根据房源类型来进行筛选，返回新的数组
        let type = this.card[cardIndex].cardContent[contentIndex]
        // 判断当前是不是全选，不是则过滤，是则不做处理
        if(type.contentValue !== 'all') {
          this.collectList = this.collectList.filter((item) => item.houseType === type.contentName)
          console.log('当前要筛选的类型', type.contentName)
        }
      },
      // 条件复位按钮点击
      resetCondition() {
        this.resetClick = true
        // 循环变化每张卡片内容的当前下标为0
        this.card.forEach((item) => {
          item.currentIndex = 0
        })
        // 已切换的卡片内容复位
        this.orderCardChange(0, 4)
        this.typeCardChange(1, 0)
        setTimeout(() => {
          this.resetClick = false
        }, 1000)
      },
      // 切换为收藏管理模式
      collectManage() {
        if(this.collectList.length === 0) {
          // 若当前无收藏记录，禁止管理模式
          this.$toast.show('您当前暂无收藏进行管理', 1000 , false)
        } else {
          this.ifManageSystem = !this.ifManageSystem
        }
      },
      /* 全选/全不选*/
      allCheck() {
        // 切换主动判断值
        this.ifAllCheckActive = !this.ifAllCheckActive
        // 根据主动判断值修改每项收藏记录的选中情况
        this.collectList.forEach((item) => {
          item.ifCheck = this.ifAllCheckActive
        })
      },
      // 修改对应收藏记录的选中状态
      checkChange(index) {
        this.collectList[index].ifCheck = !this.collectList[index].ifCheck
      },
      // 打开遮盖幕布
      maskShow() {
        this.toastTab.ifShow = true
        this.toastTab.tab.title = "确认"
        this.toastTab.tab.content = "您确定不再关注了吗?"
      },
      // 点击单独取关
      followCancel(collectItem) {
        this.maskShow()
        this.collectCancelAll = []
        this.collectCancelAll.push(collectItem)
        console.log(this.collectCancelAll)
      },
      // 点击批量取关
      followCancelAll() {
        this.maskShow()
        this.collectCancelAll = []
        this.collectCancelAll.push(...this.collectList)
        console.log(this.collectCancelAll)
      },
      // 点击幕布遮盖的确认按钮
      checkRight() {
        deleteCollectData(this.collectCancelAll,'inFollow').then(res => {
          this.$toast.show(res.message, 2000, true)
          // 关闭遮盖幕布
          this.confirmCancel()
          // 重新获取收藏列表
          this.getCollectList()
          // 判断该当前的收藏列表是否有数据，无，则可能是全体取关或者本身无数据
          // 此时将管理模式设置为false
          if(this.collectList.length === 0) {
            this.ifManageSystem = false
          }
        })
      },
      // 点击幕布遮盖的取消按钮
      confirmCancel() {
        this.toastTab.ifShow = false
        this.collectCancelSingle = {}
        this.collectCancelAll = []
      }
    }
  }
</script>

<style scoped>
  #follow {
    position: relative;
    z-index: 9;
    background-color: white;
    height: calc(100vh - 49px);
  }

  /* 显示顺序的卡片切换*/
  .order-type {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    width: 100vw;
    box-shadow: 0 2px 1px rgba(100,100,100,.1);
  }
  .card-choice, .card-reset, .the-card {
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  .card-choice, .card-reset {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .the-card {
    flex: 1;
  }
  .the-card-span {
    font-size: 14px;
  }
  .the_card_span_show {
    color: #169BD5;
  }
  .the-card-img {
    width: 9px;
    height: 7px;
    margin-left: 5px;
  }
  .the-card-img-reset {
    width: 15px;
    height: 15px;
    margin-left: 5px;
  }

  /* 展开后内容*/
  .the-card-open {
    height: calc(100vh - 55px - 44px);
    z-index: 30;
    position: fixed;
    top: 99px;
    left: 0;
    right: 0;
    bottom: 49px;
  }
  /* 展开后阴影*/
  .the-card-open-shadow {
    height: 100%;
    background-color: black;
    opacity: 0.6;
  }
  .the-card-open-content {
    background-color: white;
  }
  .the-card-open-content-item {
    margin-bottom: -1px;
    height: 45px;
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    text-align: left;
    padding-left: 25px;
  }

  /* 显示总数*/
  .all-count {
    background-color: aliceblue;
    border: 1px solid lightskyblue;
    border-radius: 5px;
    margin: 15px 0 15px 25px;
    display: inline-block;
    height: 32px;
  }
  .all-count-content {
    margin: 7px 12px;
    font-size: 14px;
    font-weight: bold;
    color: dodgerblue;
  }

  /* 空关注提示*/
  .content-img {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content-img img {
    width: 60%;
    height: 60%;
  }
  .content-ms {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .content-tips {
    margin-top: 10px;
    text-align: center;
    font-size: 13px;
    color: #5c6b77;
  }

  /* 收藏的主体内容*/
  .content {
    background-color: white;
    position: absolute;
    overflow: hidden;
    top: 161px;
    bottom: 0;
    left: 3%;
    right: 3%;
  }
  .content_top {
    top: 55px;
    bottom: 62px;
  }

  /* 管理导航栏*/
  .collect-manage-bar {
    height: 62px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 3%;
    right: 3%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 -1px 1px rgba(100,100,100,.1);
  }
  .collect-manage-bar-left,.collect-manage-bar-right {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
  }
  .collect-manage-bar-left {
    justify-content: left;
  }
  /* 全选按钮活跃样式*/
  .active {
    background-color: orange;
    border: 1px solid orange;
  }
  .all-check-content {
    margin-left: 10px;
    font-size: 15px;
  }
  .all-check-cancel {
    background-color: white;
    height: 60%;
    width: 55%;
    margin-left: 45%;
    border: 1px solid darkgray;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
  }
</style>
