<template>
  <label>
    <div class="goods-list-item" @click="detail" v-if="goodsItem.state === 0">
      <!--此处的@load相当于原生的img.onload-->
      <!--此处使用了图片懒加载，使用v-lazy代替:src-->
      <img v-lazy="goodsItem.picture.split(';')[0]" alt="" @load="imageLoad">
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
  </label>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      /* 监听图片的加载问题，使用事件总线监听该步骤，实时刷新BScroll的可滚动高度*/
      imageLoad() {
        /* 因为该组件可被复用，所以监听图片加载所在的页面，到对应页面进行刷新滚动区域*/
        if (this.$route.path.indexOf('/home')) {
          this.$bus.$emit('homeItemImageLoad')
        }
      },
      /* 进入详情页*/
      detail() {
        this.$router.push({
          path: '/detail',
          query: {
            houseid: this.goodsItem.id
          }
        })
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
