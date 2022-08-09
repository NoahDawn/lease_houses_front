<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav-bar"
                      @itemClick="titleClick"
                      @collectTypeChange="collectTypeChange"
                      ref="navBar"
                      :if-collect="ifCollect"></detail-nav-bar>
      <scroll class="content"
              ref="Scroll"
              @scroll="contentScroll"
              :probe-type="3">
        <detail-swiper :picture="pictures"></detail-swiper>
        <detail-base-info ref="base" :house="houseDetail"></detail-base-info>
        <detail-message ref="message" :house="houseDetail"></detail-message>
        <detail-news ref="news" :news="news" :house-id="houseDetail.id"></detail-news>
        <detail-to-be-renter :house-id="houseDetail.id"/>
      </scroll>

      <detail-bottom-bar :intermediary="houseDetail.intermediary" @toOrder="toOrder"></detail-bottom-bar>
      <back-top @click.native="backTop" v-show="ifBackTop"></back-top>
    </div>
</template>

<script>
  import DetailNavBar from './childComponents/DetailNavBar'
  import DetailSwiper from './childComponents/DetailSwiper'
  import DetailBaseInfo from './childComponents/DetailBaseInfo'
  import DetailMessage from './childComponents/DetailMessage'
  import DetailNews from './childComponents/DetailNews'
  import DetailToBeRenter from './childComponents/DetailToBeRenter'
  import DetailBottomBar from './childComponents/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'

  import { backTop } from 'common/mixin'
  import { getHouseDetail, getHouseNews, House } from "network/detail";
  import { getCollectType, deleteCollectData, newCollectData } from "network/collect";
  import { ifReOrder } from "network/order";

  export default {
    name: "Detail",
    data() {
      return {
        houseDetail: {},
        news: [],
        pictures: [],
        titlesHeight: [0],
        currentIndex: 0,
        addHeight: false,
        ifLogin: false,
        ifCollect: false
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailMessage,
      DetailNews,
      DetailToBeRenter,
      DetailBottomBar,

      Scroll,
    },
    mixins: [backTop],
    created() {
      this.getHouseDetail(this.houseid, this.$store.state.loginUserMS.id)
      this.getHouseNews(this.houseid)
    },
    computed: {
      /* 接受从GoodsListItem组件中传来的query参数*/
      houseid() {
        return this.$route.query.houseid
      }
    },
    methods: {
      /* 网络请求部分*/
      /* 获取详情信息*/
      getHouseDetail(houseid, myid) {
        getHouseDetail(houseid, myid).then(res => {
          /* 取出展示图片*/
          this.pictures = res.data.picture.split(';')

          /* 将其余信息放入类对象构造函数*/
          const data = res.data
          this.houseDetail = new House(data.id, data.houseName,
            data.houseType, data.location, data.direction, data.floor,
            data.roomType, data.rent, data.owner, data.ownerId,
            data.phone, data.detail, data.rentCount, data.area,
            data.occupancy, data.leaseTerm, data.houseInspection,
            data.facilities, data.shelfTime, data.intermediary)


          /* 在数据请求并发送后回调该函数，动态添加组件的高度，该方法是在没有图片的情况下使用*/
          /* 如果后续显示内容包含图片的加载，可以在图片加载后传出事件，刷新该高度，然后使用防抖解决过多重复*/
          /* 注意此处不能在生命周期created和mounted等中实现，否则子组件可能未渲染完就动态获取高度*/
          /* 此处的-44是顶部导航栏的占用高度*/
          this.$nextTick(() => {
            this.titlesHeight.push((this.$refs.base.$el.offsetTop-54))
            this.titlesHeight.push((this.$refs.message.$el.offsetTop-54))

            /* 暂时无法解决从不同的数据进行渲染后的回调函数顺序问题，第三高度直接写死*/
            this.titlesHeight.push((this.$refs.news.$el.offsetTop-54))
            /* 给该数组末端添加一个js中最大值，用于页面区域划分*/
            this.titlesHeight.push(Number.MAX_VALUE)
            /*console.log(this.titlesHeight)*/
          })

          // 获取收藏状态
          this.getCollectType(this.houseDetail.id, myid)
        })
      },
      // 获取当前房源的收藏情况
      getCollectType(houseId, myid) {
        let currentUserId = this.$store.state.loginUserMS.id
        // 详情页顶部导航栏创建完成后，判断当前是否登录
        this.ifLogin = (currentUserId !== 0)
        // 若已登录，获取当前的收藏状态
        if(this.ifLogin) {
          getCollectType(currentUserId, houseId).then(res => {
            if (res.data) {
              // 此前已有收藏记录，获取该数据
              /* 将当前页面的收藏状态保存在state中,调用mutations函数来实现，避免直接操作state*/
              this.$store.commit('storageCollectType', res.data)
              console.log(this.$store.state.loginUserMS)
            } else {
              // 此前未收藏，伪造一个不含收藏id的临时收藏信息
              let currentCollect = {
                houseId: houseId,
                userId: myid,
                currentType: 0
              }
              this.$store.commit('storageCollectType', currentCollect)
            }
            // 改变传入导航栏收藏状态的参数，为true则是已收藏
            this.collectTypeChange()
          })
        }
      },
      // 更换收藏状态
      collectTypeChange() {
        this.ifCollect = (this.$store.state.loginUserMS.currentCollect.currentType !== 0)
      },
      // 获取当前房源的评论信息
      getHouseNews(houseId) {
        getHouseNews(houseId).then(res => {
          this.news.push(...res.data)
        })
      },

      /* 事件点击部分*/
      /* 点击导航栏页面滑动到对应部分*/
      titleClick(index) {
        this.$refs.Scroll.scrollTo(0, -this.titlesHeight[index], 200)
      },
      /* 页面滑动，导航栏根据页面高度改变值*/
      contentScroll(position) {
        const positionY = -position.y
        const length = this.titlesHeight.length
        for (let i = 0; i < length-1; i++) {
          /* 一般思路的完整写法*/
          /*if (this.currentIndex !== i && ((i < length -1 && positionY >= this.titlesHeight[i] && positionY < this.titlesHeight[i+1])
          || (i === length - 1 && positionY >= this.titlesHeight[i]))) {
            this.currentIndex = i
            this.$refs.navBar.currentIndex = this.currentIndex
          }*/

          /* 末端添加最大值后的简写*/
          if (this.currentIndex !== i && (positionY >= this.titlesHeight[i] && positionY < this.titlesHeight[i+1])) {
            this.currentIndex = i
            this.$refs.navBar.currentIndex = this.currentIndex
          }
        }

        /* 返回顶部的backTop显示*/
        this.ifShowBackTop(position)
      },

      /* 事件监听部分*/
      // 判断当前是否登录（直接用前置守卫会出现父子组件传递数据为空的问题）
      ifLoginCurrent() {
        if(this.$store.state.loginUserMS.id === 0) {
          this.$toast.show('您尚未登录', 1000, false)
          setTimeout(() => {
            this.$router.replace('/profile')
          }, 1000)
          return false
        }
        return true
      },
      /* 跳转订单页面*/
      toOrder() {
        // 优先判断当前是否登录
        if(this.ifLoginCurrent()) {
          // 判断当前用户是否曾向该房源发起订单
          ifReOrder(this.houseDetail.id, this.$store.state.loginUserMS.id).then(res => {
            // 若无返回数据则跳转，否则弹窗禁止
            if(!res.data) {
              this.houseDetail.picture = this.pictures[0]
              this.$router.push({
                path: '/order',
                query: {
                  houseDetail: this.houseDetail
                }
              })
            } else {
              console.log(res.data)
              this.$toast.show('您已发起过订单，请勿重复发起', 2000, false)
            }
          })
        }
      }
    },
    beforeDestroy() {
      if(this.$store.state.loginUserMS.id !== 0) {
        // 页面销毁前判断已登录的用户对当前房源的收藏记录情况
        // 有记录的ifCollectExit存在id属性，无记录的不存在
        let ifCollectExit = this.$store.state.loginUserMS.currentCollect
        if(ifCollectExit.id) {
          // 若存在收藏记录，判断当前状态是保持收藏，或者是取消收藏
          if(ifCollectExit.currentType === 0) {
            // 存在记录且当前已取消收藏，则删除该记录
            // 传入对象数组，此方法可同时用作单一取关和多项取关
            let collectDeleteList = []
            collectDeleteList.push({id:ifCollectExit.id,houseId:ifCollectExit.houseId},'inDetail')
            deleteCollectData(collectDeleteList).then(res => {
              console.log(res)
            })
          }
          // 存在记录且当前保持收藏，不做操作
        } else {
          // 若不存在收藏记录，判断当前状态是已收藏，或者是仍未收藏
          if(ifCollectExit.currentType === 1) {
            // 不存在记录且当前已收藏，则添加该记录
            newCollectData(ifCollectExit.houseId, ifCollectExit.userId).then(res => {
              console.log(res)
            })
          }
          // 不存在记录且仍未收藏，不做操作
        }
      }
    }
  }
</script>

<style scoped>
  #detail {
    /* tabBar是fixed布局，已经脱标，需要设定详情页进行页面覆盖*/
    position: relative;
    z-index: 20;
    background-color: white;
    height: 100vh;
  }
  .detail-nav-bar {
    background-color: white;
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
