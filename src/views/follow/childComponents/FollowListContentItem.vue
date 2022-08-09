<template>
  <div class="collect-list-item" :class="{change_display:ifManageSystem}" @click="detail">
    <!--左方选择按钮，未管理状态下隐藏-->
    <div v-if="ifManageSystem" class="item-selector" :class="{change_width:ifManageSystem}" @click.stop="checkChange">
      <check-button :is-check="collectItem.ifCheck"></check-button>
    </div>

    <!--收藏记录的信息-->
    <div>
      <!--上半部分展示图-->
      <div class="item-top">
        <img class="item-top-img-house" :src="collectItem.picture.split(';')[0]" alt="">
        <!--关注显示数目，可点击实现单独取关，管理模式下隐藏-->
        <div class="item-top-collect-count" v-if="!ifManageSystem" @click.stop="followCancel">
          <img class="item-top-img-collect" src="~assets/img/follow/follow_fill.png" alt="">
          <span>{{collectItem.collectCount}}人关注</span>
        </div>
      </div>
      <!--下半部分展示信息-->
      <div class="item-bottom">
        <div class="item-bottom-top">{{collectItem.houseName}}</div>
        <div class="item-bottom-middle">
          <div>{{collectItem.houseType}} |</div>
          <div>{{collectItem.roomType}} |</div>
          <div>{{collectItem.direction}}</div>
        </div>
        <div class="item-bottom-bottom"><span>￥</span> {{collectItem.rent}} <span>/月</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "FollowListContentItem",
    components: {
      CheckButton
    },
    props: {
      ifManageSystem: { // 用于判断是否是管理模式，控制选择按钮的显示与隐藏
        type: Boolean,
        default() {
          return false
        }
      },
      collectItem: {
        type: Object,
        default() {
          return {}
        }
      },
      index: {
        type: Number,
        default: -1
      }
    },
    methods: {
      // 管理模式下修改选中状态
      checkChange() {
        // 传出事件，修改当前操作的收藏记录的选中判断值
        this.$emit('checkChange', this.index)
      },
      /* 进入详情页*/
      detail() {
        this.$router.push({
          path: '/detail',
          query: {
            houseid: this.collectItem.id
          }
        })
      },
      // 点击单独取关,弹出层显示
      followCancel() {
        // 传出事件
        this.$emit('followCancel', '')
      }
    }
  }
</script>

<style scoped>
  /* 管理模式下修改展示样式*/
  .change_display {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .collect-list-item {
    height: 250px;
    background-color: white;
    margin-bottom: 15px;
    width: 100%;
  }
  .change_width {
    width: 87%;
  }

  /* 选择按钮部分*/
  .item-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 250px;
    width: 10%;
    margin-right: 3%;
  }

  /* 收藏信息上半部分*/
  .item-top {
    position: relative;
    width: 100%;
    height: 150px;
  }
  .item-top-img-house {
    width: 100%;
    height: 150px;
    border-radius: 5px 5px 0 0;
  }
  .item-top-collect-count {
    background-color: white;
    border-radius: 5px;
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 8px 10px;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-top-img-collect {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }

  /* 收藏信息下半部分*/
  .item-bottom {
    height: 100px;
    padding: 10px 10px 0;
    background-color: #f7f7f7;
    display: flex;
    flex-direction: column;
  }
  .item-bottom-top, .item-bottom-middle, .item-bottom-bottom {
    flex: 1;
    height: 30px;
    line-height: 30px;
  }
  .item-bottom-top {
    font-size: 19px;
    font-weight: bold;
  }
  .item-bottom-middle {
    display: flex;
    align-items: center;
  }
  .item-bottom-middle div {
    margin-right: 5px;
    font-size: 13px;
  }
  .item-bottom-bottom {
    font-size: 18px;
    font-weight: bold;
    color: red;
  }
  .item-bottom-bottom span {
    font-size: 14px;
  }
</style>
