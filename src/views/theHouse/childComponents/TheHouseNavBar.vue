<template>
  <div class="manage-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">房源信息修改</div>
      <div slot="right" class="delete" @click="deleteHouse">删除</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    name: "TheHouseNavBar",
    props: {
      canDelete: {
        type: Boolean,
        default: true
      }
    },
    components: {
      NavBar
    },
    methods: {
      back() {
        this.$router.replace('/houseManage')
      },
      deleteHouse() {
        if(this.canDelete) {
          this.$emit('deleteHouse')
        } else {
          this.$toast.show('当前房源已被删除', 2000, false)
        }
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
  .delete {
    font-size: 14px;
    color: red;
  }
</style>
