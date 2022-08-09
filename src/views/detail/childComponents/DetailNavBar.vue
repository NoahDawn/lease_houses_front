<template>
    <div>
      <nav-bar>
        <div slot="left" class="back" @click="back">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="titles">
          <div v-for="(item, index) in titles"
               class="titles-item"
               :class="{active: index === currentIndex}"
               @click="itemClick(index)">{{item}}</div>
        </div>
        <div slot="right" class="collect" @click="collectTypeChange">
          <img v-if="!ifCollect" src="~assets/img/follow/follow.png" alt="">
          <img v-else src="~assets/img/follow/follow_fill.png" alt="">
        </div>
      </nav-bar>
    </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'

  import { getCollectType } from "network/collect";

  export default {
    name: "DetailNavBar",
    data() {
      return {
        titles: ['房源', '参数', '简介', '评论'],
        currentIndex: 0
      }
    },
    props: {
      ifCollect: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    components: {
      NavBar
    },
    methods: {
      // 顶部导航栏y轴定位
      itemClick(index) {
        this.currentIndex = index
        this.$emit('itemClick', index)
      },
      // 返回上一页面
      back() {
        this.$router.back()
      },
      // 当前房源的收藏与取消收藏
      collectTypeChange() {
        if(this.$store.state.loginUserMS.id === 0) {
          this.$toast.show('您尚未登录',1000,false)
          setTimeout(() => {
            this.$router.replace('/profile')
          }, 1000)
        } else {
          this.$store.commit('collectTypeChange', '')
          // 事件传出，重新复制父级传入子级的收藏状态值
          this.$emit('collectTypeChange')
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
  .titles {
    display: flex;
    font-size: 15px;
  }
  .titles-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .collect {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .collect img {
    width: 20px;
    height: 20px;
  }
</style>
