<template>
  <div id="intermediary-select">
    <div class="intermediary-select-nav" @click="hiddenSelect">选择经纪人</div>
    <div class="intermediary-select-content">
      <!-- 个人已委托的经纪人 -->
      <div style="height: 130px;">
        <div class="intermediary-select-content-title">您的列表
          <span style="margin-left: 30px" v-if="currentEntrustIndex === 0"></span>
          <img @click="currentIndexChange('entrust','cut')" v-show="currentEntrustIndex !== 0" class="intermediary-select-content-title-img" src="~assets/img/common/arrow_small_left.svg" alt="">请选择
          <img @click="currentIndexChange('entrust','add')" v-show="currentEntrustIndex !== entrustArr.length-1" class="intermediary-select-content-title-img" src="~assets/img/common/arrow_small_right.svg" alt="">
        </div>
        <div class="intermediary-select-content-main">
          <div class="intermediary-items"
               v-for="(entrust,index) in entrustArr"
               v-if="index === currentEntrustIndex"
               @click="intermediaryChecked(entrust.intermediary,index,'entrust')">
            <!-- 头像 -->
            <img :src="entrust.intermediary.avatar" alt="">

            <!-- 信息 -->
            <div class="intermediary-items-profile">
              <div class="intermediary-items-profile-name">
                {{entrust.intermediary.realname}}
                <span v-if="ifMatch(entrust.intermediary)" style="color:orangered;font-size: 14px;">(已选)</span>
              </div>
              <div class="intermediary-items-profile-count">
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
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐经纪人部分 -->
      <div style="height: 130px">
        <div class="intermediary-select-content-title">为您推荐
          <span style="margin-left: 30px" v-if="currentIntermediaryIndex === 0"></span>
          <img @click="currentIndexChange('intermediary','cut')" v-show="currentIntermediaryIndex !== 0" class="intermediary-select-content-title-img" src="~assets/img/common/arrow_small_left.svg" alt="">请选择
          <img @click="currentIndexChange('intermediary','add')" v-show="currentIntermediaryIndex !== intermediaryArr.length-1" class="intermediary-select-content-title-img" src="~assets/img/common/arrow_small_right.svg" alt="">
        </div>
        <div class="intermediary-select-content-main">
          <div class="intermediary-items"
               v-for="(intermediary,index) in intermediaryArr"
               v-if="index === currentIntermediaryIndex"
               @click="intermediaryChecked(intermediary,index,'intermediary')">
            <!-- 头像 -->
            <img :src="intermediary.avatar" alt="">

            <!-- 信息 -->
            <div class="intermediary-items-profile">
              <div class="intermediary-items-profile-name">
                {{intermediary.realname}}
                <span v-if="ifMatch(intermediary)" style="color:orangered;font-size: 14px;">(已选)</span>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getIntermediaryList, getEntrustList } from "network/intermediary.js"

  export default {
    name: "IntermediarySelect",
    data() {
      return {
        intermediaryArr: [],  // 经纪人列表
        entrustArr: [],  // 委托列表
        currentIntermediaryIndex: 0, // 默认显示经纪人下标
        currentEntrustIndex: 0, // 默认显示委托下标
      }
    },
    props: {
      currentIntermediary: {  // 当前选中的经纪人
        type: Object,
        default: {}
      }
    },
    created() {
      const userId = this.$store.state.loginUserMS.id
      this.getIntermediaryList(userId)
      this.getEntrustList(userId)
      this.changeCurrentIndex()
    },
    methods: {
      // 控制选项组件的关闭
      hiddenSelect() {
        this.$emit('hiddenSelect')
      },
      // 获取经纪人列表
      getIntermediaryList(userId) {
        this.intermediaryArr = []
        getIntermediaryList(userId).then(res => {
          if (res.data.length > 0) {
            this.intermediaryArr.push(...res.data)
          }
        })
      },
      // 获取个人经纪人列表
      getEntrustList(userId) {
        this.entrustArr = []
        getEntrustList(userId,'houseManage').then(res => {
          if(res.data.length > 0) {
            this.entrustArr.push(...res.data)
          }
        })
      },
      // 控制下标增加
      currentIndexChange(witch, type) {
        witch === 'intermediary' ? (type === 'add' ? ++this.currentIntermediaryIndex : --this.currentIntermediaryIndex)
          : (type === 'add' ? ++this.currentEntrustIndex : --this.currentEntrustIndex)
      },
      // 传出当前选中的经纪人
      intermediaryChecked(intermediary,index,type) {
        intermediary.index = index
        intermediary.type = type
        this.$emit("intermediaryChecked",intermediary)
        this.hiddenSelect()
      },
      // 控制当前选中的提示词是否显示
      ifMatch(obj) {
        const currentIntermediary = this.currentIntermediary
        if(currentIntermediary.id === 0) {
          return false
        } else {
          // 根据传入的对象判断返回值，是否追加“当前选中字样”
          return obj.id === currentIntermediary.id
        }
      },
      // 修改对应选中数组的下标
      changeCurrentIndex() {
        const currentIntermediary = this.currentIntermediary
        if(currentIntermediary.id > 0) {
          currentIntermediary.type === 'entrust' ?
            (this.currentEntrustIndex = currentIntermediary.index) :
            (this.currentIntermediaryIndex = currentIntermediary.index)
        }
      }
    }
  }
</script>

<style scoped>
  #intermediary-select {
    position: fixed;
    height: 300px;
    width: 60%;
    top: 150px;
    left: 20%;
    right: 20%;
    background-color: whitesmoke;
    z-index: 40;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(100,100,100,.4);
  }

  .intermediary-select-nav {
    background-color: lightblue;
    color: white;
    font-weight: 600;
    font-size: 15px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 5px 5px 0 0;
  }
  .intermediary-select-content {
    padding: 5px;
  }

  .intermediary-select-content-title {
    height: 25px;
    line-height: 25px;
    font-size: 14px;
  }
  .intermediary-select-content-title-img {
    width: 10px;
    height: 10px;
    background-color: lightblue;
    margin: 0 10px;
  }
  .intermediary-select-content-main {
    background-color: white;
    border-radius: 5px;
    height: 105px;
  }

  /*经纪人个体信息展示部分*/
  .intermediary-items {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  /*头像部分*/
  .intermediary-items img {
    width: 70px;
    height: 90px;
    border-radius: 5px;
  }

  /*个人信息部分*/
  .intermediary-items-profile {
    margin: 10px 20px;
    width: calc(100% - 70px - 40px);
  }
  .intermediary-items-profile-name {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .intermediary-items-profile-count {
    display: flex;
    justify-content: space-between;
  }
  .intermediary-items-profile-count-num {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 3px;
  }
  .intermediary-items-profile-count-tips {
    font-size: 10px;
    color: #666666;
  }
</style>
