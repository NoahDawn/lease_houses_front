<template>
  <div class="goods-list-item">
    <img :src="goodsItem.picture" alt="">
    <div class="goods-list-item-message">
      <p class="house-name">{{goodsItem.houseName}}</p>
      <p class="house-location">{{goodsItem.location}}</p>
      <p class="house-type">
        <span class="house-type-house">{{goodsItem.houseType}}</span>
        <span class="house-type-room">{{goodsItem.roomType}}</span>
      </p>
      <p class="house-rent">
        <span class="house-rent-price">￥{{goodsItem.rent}}</span>
        <span class="house-rent-count">{{goodsItem.rentCount}}人已租</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TheOrderHouseMessage",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    height: 150px;
    padding: 10px 5px 10px;
    display: block;
    border-bottom: 1px solid #eee;
  }
  .goods-list-item img {
    height: 125px;
    width: 50%;
    float: left;
    border-radius: 5px;
  }
  .goods-list-item-message {
    height: 125px;
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
    font-size: 14px;
    white-space: nowrap;/*内容超宽后禁止换行显示*/
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/*文字超出部分以省略号显示*/
  }
  .house-type {
    flex: 1;
    font-size: 12px;
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
    font-size: 12px;
    color: #5c6b77;
  }
</style>
