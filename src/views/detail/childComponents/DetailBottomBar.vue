<template>
    <div class="bottom-bar">
      <div class="house-owner">
        <div class="house-owner-name">
          <img src="~assets/img/detail/owner.svg" alt="">
          <div class="house-owner-content">{{intermediary.realname}}</div>
        </div>
        <div class="house-owner-phone">
          <img src="~assets/img/detail/phone.svg" alt="">
          <div class="house-owner-content">{{intermediary.phone}}</div>
        </div>
      </div>
      <div class="house-contact">
        <!--<button type="button" class="house-contact-online">在线问</button>-->
        <!--<button type="button" class="house-contact-phone">打电话</button>-->
        <button type="button" class="house-contact-order" @click="toOrder">发订单</button>
      </div>
    </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    props: {
      intermediary: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      toOrder() {
         /* 传出页面跳转时间*/
        this.$emit('toOrder')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;
    z-index: 9;
    background-color: white;
    height: 49px;
    /*阴影：x坐标、y坐标（逆向为正）、扩散度、色彩*/
    box-shadow: 0px -2px 1px rgba(100,100,100,.1);
  }
  .house-owner {
    width: 35%;
    height: 24px;
    line-height: 24px;
  }
  .house-owner img {
    width: 18px;
    height: 18px;
    margin-left: 10px;
    margin-top: 3px;
  }
  .house-owner-name {
    display: flex;
  }
  .house-owner-phone {
    display: flex;
  }
  .house-owner-content {
    margin-left: 5px;
    font-size: 13px;
    font-weight: bold;
    color: #5c6b77;
  }
  .house-contact {
    width: 65%;
    display: flex;
    align-items: center;
  }
  .house-contact button {
    flex: 1;
    height: 75%;
    width: 45%;
    color: white;
    font-size: 14px;
    border-radius: 5px;
    margin-right: 5%;
  }
  .house-contact-online {
     border: 1px solid mediumseagreen;
     background-color: mediumseagreen;
   }
  .house-contact-phone {
    border: 1px solid dodgerblue;
    background-color: dodgerblue;
  }
  .house-contact-order {
    border: 1px solid orange;
    background-color: orange;
  }
</style>
