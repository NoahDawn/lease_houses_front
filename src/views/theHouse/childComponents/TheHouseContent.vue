<template>
    <div class="the-house-content">
      <!-- 房源展示信息 -->
      <the-house-message :goods-item="houseItem" class="house-ms"/>

      <!-- 房源基本信息 -->
      <div class="order-user-ms">
        <div class="ms-title">基本信息</div>
        <div class="user-ms">房源名称:
          <input type="text" class="input-ms" :value="houseItem.houseName" readonly="disabled">
        </div>
        <div class="user-ms">房源类型:
          <input type="text" class="input-ms" :value="houseItem.houseType" readonly="disabled">
        </div>
        <div class="user-ms">房源地址:
          <input type="text" class="input-ms" :value="houseItem.location" readonly="true">
        </div>
        <div class="user-ms">房源朝向:
          <input type="text" class="input-ms" :value="houseItem.direction" readonly="disabled">
        </div>
        <div class="user-ms">房源楼层:
          <input type="text" class="input-ms" :value="houseItem.floor" readonly="disabled">
        </div>
        <div class="user-ms">房源占地:
          <input type="text" class="input-ms" :value="houseItem.area + ' m²'" readonly="disabled">
        </div>
        <div class="user-ms">房间类型:
          <input type="text" class="input-ms" :value="houseItem.roomType" readonly="disabled">
        </div>
        <div class="user-ms">出租类型:
          <input type="text" class="input-ms" :value="thisLeaseType" readonly="disabled">
        </div>
      </div>

      <!-- 经纪人选择 -->
      <div class="order-intention-ms">
        <div class="intention-title">您的经纪人情况</div>
        <!-- 当前房源无经纪人的情况下 -->
        <div :disabled="ifAbled" class="state-ms" v-if="houseItem.state === 2">代行委托：
          <!-- 选择经纪人的按钮 -->
          <div @click="intermediarySelect" class="state-content" style="justify-content: center;align-items: center">
            <button class="intermediary-select" :disabled="ifAbled">请选择经纪人</button>
          </div>
        </div>

        <!-- 当前房源有经纪人的情况下 -->
        <div class="state-ms" v-else-if="houseItem.intermediaryId > 0" style="align-items: center">当前委托：
          <div class="state-content">
            <img class="intermediary-select-avatar" :src="houseItem.intermediary.avatar" alt="">
            <div>
              <div class="intermediary-select-ms"><strong>{{houseItem.intermediary.realname}}</strong></div>
              <div class="intermediary-select-ms">联系方式：{{houseItem.intermediary.phone}}</div>
            </div>
          </div>
        </div>

        <!-- 无经纪人但选中后的信息展示 -->
        <div class="state-ms" v-if="currentIntermediary.id > 0" style="align-items: center">当前选择：
          <div class="state-content">
            <img class="intermediary-select-avatar" :src="currentIntermediary.avatar" alt="">
            <div>
              <div class="intermediary-select-ms"><strong>{{currentIntermediary.realname}}</strong></div>
              <div class="intermediary-select-ms">联系方式：{{currentIntermediary.phone}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 可变信息 -->
      <div class="order-intention-ms">
        <div class="intention-title">可变信息</div>

        <!-- 房源状态修改 -->
        <div class="state-ms">租赁状态:
          <div class="state-content" v-if="houseItem.state === 1 && houseItem.leaseType === 'single' && houseItem.rentCount > 0" style="justify-content: center;color:red">当前房源出租中</div>
          <div class="state-content" v-else-if="houseItem.state === 2" style="justify-content: center;color:red">当前房源暂无经纪人托管</div>
          <div class="state-content" v-else-if="houseItem.state === 3" style="justify-content: center;color:red">房源已逾期，仅可处理退租情况</div>
          <div class="state-content" v-else>
            <label for="renting">
              <input type="radio" class="check-select" id="renting" value="0" v-model="houseItem.state" :disabled="ifAbled">
              <span class="check-ms">房源出租</span>
            </label>
            <label for="unrent">
              <input type="radio" class="check-select" id="unrent" value="1" v-model="houseItem.state" :disabled="ifAbled">
              <span class="check-ms">暂停出租</span>
            </label>
          </div>
          <span class="red-star">*</span>
        </div>

        <!-- 其余可变信息 -->
        <div class="user-ms">每月租金:
          <input type="text" class="input-ms" v-model.lazy.number="houseItem.rent" :disabled="ifAbled" :readonly="ifReadOnlyOthers">
          <span class="red-star">*</span>
        </div>
        <div class="user-ms">租赁人数:
          <!-- 未出租且默认租赁人数为0的时候，只读不可修改 -->
          <input type="text" class="input-ms"
                 v-model.lazy.number="houseItem.rentCount"
                 :readonly="ifReadOnlyRentCount"
                 :disabled="ifAbled">
          <span class="red-star">*</span>
        </div>
        <div class="user-ms">联系电话:
          <input type="tel" class="input-ms" v-model.lazy="houseItem.phone" :disabled="ifAbled" :readonly="ifReadOnlyOthers">
          <span class="red-star">*</span>
        </div>
        <div class="rent-detail">备注信息：</div>
        <textarea class="textarea"
                  v-model.lazy="houseItem.detail"
                  name="detail" id="detail" cols="30" rows="10"
                  :readonly="ifReadOnlyOthers"
                  :disabled="ifAbled">
        </textarea>
      </div>

      <!-- 经纪人选择组件 -->
      <IntermediarySelect
        v-if="intermediarySelectShow"
        @hiddenSelect="hiddenSelect"
        @intermediaryChecked="intermediaryChecked"
        :current-intermediary="currentIntermediary"/>
    </div>
</template>

<script>
  import TheHouseMessage from './TheHouseMessage'
  import IntermediarySelect from "components/content/intermediarySelect/IntermediarySelect"

  export default {
    name: "TheHouseContent",
    data() {
      return {
        intermediarySelectShow: false, // 控制选择经纪人组件的显示
        currentIntermediary: {id:0},  // 当前选中的经纪人
        readOnlyControl: false  // 控制是否只读
      }
    },
    props: {
      houseItem: {
        type: Object,
        default() {
          return {}
        }
      },
      canInput: {  // 控制修改项的是否可选中状态
        type: Boolean,
        default: true
      }
    },
    components: {
      TheHouseMessage,
      IntermediarySelect
    },
    mounted() {
      this.setCurrentIntermediary()
    },
    computed: {
      // 返回值控制当前房源可更改信息的选中状态，最终由disabled和readonly控制
      // 正常房源仅由disabled控制是否可删，逾期房源由readonly控制是否可选，同时存在时disabled优先级更高
      ifAbled() {
        return !this.canInput
      },
      // 控制是否只读(控制人数)
      ifReadOnlyRentCount() {
        /*
        * 条件判断:
        * 1. 逾期直接返回true，readonly生效
        * 2. 在期，未出租返回true，readonly生效
        * 3. 在期，已出租，整租返回true，readonly生效
        * 3. 在期，已出租，整租返回false，readonly无效
        * */
        return this.houseItem.state === 3 ||
               this.houseItem.ifLeased === 0 ||
               this.houseItem.leaseType === 'single'
      },
      // 控制是否只读(控制租金、联系电话、备注)
      ifReadOnlyOthers() {
        /*
        * 条件判断:
        * 1. 逾期直接返回true，readonly生效法拉瑟
        * 2. 在期，未出租返回false，readonly无效
        * 3. 在期，已出租，整租返回true，readonly生效
        * 3. 在期，已出租，合租返回false，readonly无效
        * */
        return this.houseItem.state === 3 ||
              (this.houseItem.ifLeased === 1 && this.houseItem.leaseType === 'single')
      },
      // 控制整租合租的显示
      thisLeaseType() {
        return this.houseItem.leaseType==='single' ? '整租' : '合租'
      }
    },
    methods: {
      // 选择经纪人组件打开控制
      intermediarySelect() {
        this.intermediarySelectShow = true
      },
      // 选择经纪人组件关闭
      hiddenSelect() {
        this.intermediarySelectShow = false
      },
      // 通过组件设置当前选中的经纪人
      intermediaryChecked(intermediary) {
        this.currentIntermediary = intermediary
        this.houseItem.currentIntermediary = intermediary
      },
      // 若已有经纪人，设置对应属性，否则可能出现提示项空的情况
      setCurrentIntermediary() {
        if(this.houseItem.state !== 2) {
          this.$nextTick(() => {
            this.houseItem.currentIntermediary = this.houseItem.intermediary
          })
        }
      }
    }
  }
</script>

<style scoped>
  .house-ms {
    margin: 10px 5px 10px 5px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(100,100,100,.4);
  }
  .order-user-ms {
    margin: 10px 5px 10px 5px;
    padding: 10px 5px 10px 5px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(100,100,100,.4);
    display: flex;
    flex-direction: column;
  }
  .order-user-ms div {
    flex: 1;
    line-height: 30px;
    padding-left: 5px;
  }
  .ms-title {
    font-size: 18px;
    font-weight: bold;
  }
  .user-ms {
    font-size: 14px;
  }
  .order-intention-ms {
    margin: 10px 5px 10px 5px;
    padding: 10px 5px 10px 5px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(100,100,100,.4);
    display: flex;
    flex-direction: column;
  }
  .order-intention-ms div {
    flex: 1;
    line-height: 30px;
    padding-left: 5px;
  }
  .intention-title {
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    padding-left: 5px;
    height: 30px;
  }
  .red-star {
    color: red;
    width: 20px;
  }
  .input-ms {
    height: 28px;
    margin: 3px 20px 3px 20px;
    width: calc(100% - 120px);
    border-radius: 5px;
    border: 1px solid #eee;
    color: black;
    text-align: center;
    padding: 0 5px;
    overflow: auto;
  }
  .state-ms {
    font-size: 14px;
    display: flex;
  }
  .state-content {
    width: calc(100% - 120px);
    display: flex;
  }
  .check-select {
    margin: 0 10px 0 19px;
  }
  .check-ms {
    margin-right: 20px;
  }
  .rent-detail {
    display: flex;
    font-size: 14px;
    line-height: 30px;
    padding-left: 5px;
    height: 30px;
  }
  .textarea {
    width: 96%;
    margin: auto;
    border: 1px solid #eee;
    background-color: #eee;
    font-size: 14px;
    padding: 3px;
    color: black;
  }

  .intermediary-select {
    background-color: lightblue;
    color: white;
    padding: 0 10px;
    border: none;
    border-radius: 5px;
    height: 90%;
  }
  .intermediary-select-avatar {
    width: 60px;
    height: 80px;
    border-radius: 5px;
    margin: 7px 0 0 10px;
  }
  .intermediary-select-ms {
    font-size: 14px;
    margin-top: 10px;
  }
</style>
