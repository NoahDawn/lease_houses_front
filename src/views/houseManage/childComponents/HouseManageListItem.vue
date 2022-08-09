<template>
    <div class="house-list-item" @click="houseManage">
      <!--此处的@load相当于原生的img.onload-->
      <!--此处使用了图片懒加载，使用v-lazy代替:src-->
      <img :src="houseItem.picture.split(';')[0]" alt="">
      <div class="goods-list-item-message">
        <p class="house-name">{{houseItem.houseName}}</p>
        <p class="house-location">{{houseItem.location}}</p>
        <p class="house-type">
          <span class="house-type-house">{{houseItem.houseType}}</span>
          <span class="house-type-room">{{houseItem.roomType}}</span>
        </p>
        <p class="house-rent">
          <span class="house-rent-price">￥{{houseItem.rent}}</span>
          <span class="house-rent-count">{{houseItem.rentCount}}人已租</span>
        </p>
      </div>
    </div>
</template>

<script>
  export default {
    name: "HouseManageListItem",
    props: {
      houseItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      /* 进入管理页*/
      houseManage() {
        this.$router.replace({
          path: '/theHouse',
          query: {
            houseItem: this.houseItem
          }
        })
      }
    }
  }
</script>

<style scoped>
  .house-list-item {
    height: 150px;
    padding: 10px;
    display: block;
    border-bottom: 1px solid #eee;
    z-index: 15;
  }
  .house-list-item img {
    height: 135px;
    width: 50%;
    float: left;
    border-radius: 5px;
  }
  .goods-list-item-message {
    height: 135px;
    width: 50%;
    float: right;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    line-height: 21px;
  }
  .house-name {
    flex: 1;
    font-size: 16px;
    font-weight: bold;
  }
  .house-location {
    flex: 1;
    font-size: 12px;
    white-space: nowrap;/*内容超宽后禁止换行显示*/
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/*文字超出部分以省略号显示*/
  }
  .house-type {
    flex: 1;
    font-size: 10px;
    color: #5c6b77;
  }
  .house-type-house {

  }
  .house-type-room {
    margin-left: 10px;
  }
  .house-rent {
    flex: 1;
  }
  .house-rent-price {
    color: red;
  }
  .house-rent-count {
    margin-left: 10px;
    font-size: 10px;
    color: #5c6b77;
  }
</style>
