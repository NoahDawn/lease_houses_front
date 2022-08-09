<template>
    <div class="order-check-nav-bar">
      <nav-bar>
        <div slot="left" class="back" @click="back">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center">
          <div class="order-check-type">
            <div class="renter" @click="change" :class="{active: ifActive}">租赁订单</div>
            <div class="owner" @click="change" :class="{active: !ifActive}">出租订单</div>
          </div>
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "OrderCheckNavBar",
    data() {
      return {
        ifActive: true
      }
    },
    components: {
      NavBar
    },
    methods: {
      back() {
        this.$router.replace('/profile')
      },
      change() {
        /* 身份转换，同时传出转换身份*/
        this.ifActive = !this.ifActive
        const type = this.ifActive ? 'renter' : 'owner'
        this.$emit('typeChange', type)
      }
    }
  }
</script>

<style scoped>
  .back img {
    width: 30px;
    height: 22px;
    margin-top: 11px;
    margin-left: 15px;
  }
  .order-check-type {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .order-check-type div {
    border: 1px solid #eee;
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .renter {
    border-radius: 20px 0 0 20px;
  }
  .owner {
    border-radius: 0 20px 20px 0;
  }

  .active {
    background-color: cornflowerblue;
    color: white;
  }
</style>
