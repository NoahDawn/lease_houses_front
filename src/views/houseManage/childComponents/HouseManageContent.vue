<template>
    <div class="house-manage-content">
      <none v-if="Object.keys(HouseList).length===0" :none-content="noneContent" />

      <div v-else v-for="item in HouseList" class="house-item" :key="item.id">
        <house-manage-list-item :house-item="item"/>
        <div class="house-item-situation">当前房源情况:
          <strong v-if="item.state === 0" style="color: lawngreen">已发布</strong>
          <strong v-if="item.state === 1" style="color: orangered">暂停发布</strong>
          <strong v-if="item.state === 2" style="color: orange">未选择经纪人</strong>
          <strong v-if="item.state === 3 && item.ifLeased === 0" style="color: silver">房子逾期</strong>
          <strong v-if="item.state === 3 && item.ifLeased === 1" style="color: deepskyblue">上架逾期，请完成订单后删除</strong>
        </div>

        <!-- 逾期的遮盖幕布 -->
        <div class="mask" v-if="ifMask(item)"></div>
        <!-- 遮盖幕布上的确认删除按钮 -->
        <div class="overtime-check-button" v-if="ifMask(item)" @click="deleteHouse(item.id)">确认删除</div>
      </div>
    </div>
</template>

<script>
  import HouseManageListItem from './HouseManageListItem'
  import None from 'components/common/none/None'

  import { postDeleteHouse } from 'network/house.js'

  export default {
    name: "HouseManageContent",
    data() {
      return {
        noneContent: {
          image: require('@/assets/img/common/none.png'),
          content: '您还没有发布过任何房源',
          tips: '请在发布房源处发布你想要出租的房源'
        }
      }
    },
    props: {
      HouseList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      HouseManageListItem,
      None
    },
    methods: {
      // 是否需要展示逾期的遮盖幕布
      ifMask(item) {
        // 状态为逾期，且未租出去
        return item.state === 3 && item.ifLeased === 0
      },
      // 删除逾期的房源
      deleteHouse(houseId) {
        console.log('删除房源：',houseId)
        const user = this.$store.state.loginUserMS
        const destObj = {
          id: houseId,
          ownerId: user.id
        }
        postDeleteHouse(destObj).then(res => {
          console.log(res)
          if(res) {
            // message是显示结果信息，result是显示结果布尔值
            this.$toast.show(res.message, 2000, res.result)
            // 若删除成功，向外发起刷新当前列表
            if(res.result) {
              this.$emit('resetHouseList')
            }
          }
        })
      }
    },
  }
</script>

<style scoped>
  .house-item {
    padding-bottom: 10px;
    border-bottom: 5px solid #eee;
    position: relative;
  }
  .house-item-situation {
    display: flex;
    align-items: center;
    margin-left: 3%;
    margin-top: 5px;
  }
  .house-item-situation strong {
    margin-left: 10px;
  }

  /* 确认删除按钮 */
  .overtime-check-button {
    position: absolute;
    top: 50px;
    left: calc((100% - 160px)/2);
    right: 0;
    bottom: 0;
    z-index: 30;
    width: 160px;
    height: 50px;
    border-radius: 5px;
    border: 2px solid red;
    color: white;
    font-weight: bold;
    line-height: 50px;
    text-align: center;
    background-color: orange;
    opacity: 0.8;
  }

  /*房子预期后的遮盖层*/
  .mask {
    width: 100%;
    height: 150px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
