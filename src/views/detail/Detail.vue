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
      /* ?????????GoodsListItem??????????????????query??????*/
      houseid() {
        return this.$route.query.houseid
      }
    },
    methods: {
      /* ??????????????????*/
      /* ??????????????????*/
      getHouseDetail(houseid, myid) {
        getHouseDetail(houseid, myid).then(res => {
          /* ??????????????????*/
          this.pictures = res.data.picture.split(';')

          /* ??????????????????????????????????????????*/
          const data = res.data
          this.houseDetail = new House(data.id, data.houseName,
            data.houseType, data.location, data.direction, data.floor,
            data.roomType, data.rent, data.owner, data.ownerId,
            data.phone, data.detail, data.rentCount, data.area,
            data.occupancy, data.leaseTerm, data.houseInspection,
            data.facilities, data.shelfTime, data.intermediary)


          /* ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????*/
          /* ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????*/
          /* ?????????????????????????????????created???mounted?????????????????????????????????????????????????????????????????????*/
          /* ?????????-44?????????????????????????????????*/
          this.$nextTick(() => {
            this.titlesHeight.push((this.$refs.base.$el.offsetTop-54))
            this.titlesHeight.push((this.$refs.message.$el.offsetTop-54))

            /* ?????????????????????????????????????????????????????????????????????????????????????????????????????????*/
            this.titlesHeight.push((this.$refs.news.$el.offsetTop-54))
            /* ??????????????????????????????js???????????????????????????????????????*/
            this.titlesHeight.push(Number.MAX_VALUE)
            /*console.log(this.titlesHeight)*/
          })

          // ??????????????????
          this.getCollectType(this.houseDetail.id, myid)
        })
      },
      // ?????????????????????????????????
      getCollectType(houseId, myid) {
        let currentUserId = this.$store.state.loginUserMS.id
        // ??????????????????????????????????????????????????????????????????
        this.ifLogin = (currentUserId !== 0)
        // ??????????????????????????????????????????
        if(this.ifLogin) {
          getCollectType(currentUserId, houseId).then(res => {
            if (res.data) {
              // ??????????????????????????????????????????
              /* ???????????????????????????????????????state???,??????mutations????????????????????????????????????state*/
              this.$store.commit('storageCollectType', res.data)
              console.log(this.$store.state.loginUserMS)
            } else {
              // ??????????????????????????????????????????id?????????????????????
              let currentCollect = {
                houseId: houseId,
                userId: myid,
                currentType: 0
              }
              this.$store.commit('storageCollectType', currentCollect)
            }
            // ????????????????????????????????????????????????true???????????????
            this.collectTypeChange()
          })
        }
      },
      // ??????????????????
      collectTypeChange() {
        this.ifCollect = (this.$store.state.loginUserMS.currentCollect.currentType !== 0)
      },
      // ?????????????????????????????????
      getHouseNews(houseId) {
        getHouseNews(houseId).then(res => {
          this.news.push(...res.data)
        })
      },

      /* ??????????????????*/
      /* ??????????????????????????????????????????*/
      titleClick(index) {
        this.$refs.Scroll.scrollTo(0, -this.titlesHeight[index], 200)
      },
      /* ???????????????????????????????????????????????????*/
      contentScroll(position) {
        const positionY = -position.y
        const length = this.titlesHeight.length
        for (let i = 0; i < length-1; i++) {
          /* ???????????????????????????*/
          /*if (this.currentIndex !== i && ((i < length -1 && positionY >= this.titlesHeight[i] && positionY < this.titlesHeight[i+1])
          || (i === length - 1 && positionY >= this.titlesHeight[i]))) {
            this.currentIndex = i
            this.$refs.navBar.currentIndex = this.currentIndex
          }*/

          /* ?????????????????????????????????*/
          if (this.currentIndex !== i && (positionY >= this.titlesHeight[i] && positionY < this.titlesHeight[i+1])) {
            this.currentIndex = i
            this.$refs.navBar.currentIndex = this.currentIndex
          }
        }

        /* ???????????????backTop??????*/
        this.ifShowBackTop(position)
      },

      /* ??????????????????*/
      // ???????????????????????????????????????????????????????????????????????????????????????????????????
      ifLoginCurrent() {
        if(this.$store.state.loginUserMS.id === 0) {
          this.$toast.show('???????????????', 1000, false)
          setTimeout(() => {
            this.$router.replace('/profile')
          }, 1000)
          return false
        }
        return true
      },
      /* ??????????????????*/
      toOrder() {
        // ??????????????????????????????
        if(this.ifLoginCurrent()) {
          // ???????????????????????????????????????????????????
          ifReOrder(this.houseDetail.id, this.$store.state.loginUserMS.id).then(res => {
            // ????????????????????????????????????????????????
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
              this.$toast.show('??????????????????????????????????????????', 2000, false)
            }
          })
        }
      }
    },
    beforeDestroy() {
      if(this.$store.state.loginUserMS.id !== 0) {
        // ???????????????????????????????????????????????????????????????????????????
        // ????????????ifCollectExit??????id??????????????????????????????
        let ifCollectExit = this.$store.state.loginUserMS.currentCollect
        if(ifCollectExit.id) {
          // ?????????????????????????????????????????????????????????????????????????????????
          if(ifCollectExit.currentType === 0) {
            // ?????????????????????????????????????????????????????????
            // ????????????????????????????????????????????????????????????????????????
            let collectDeleteList = []
            collectDeleteList.push({id:ifCollectExit.id,houseId:ifCollectExit.houseId},'inDetail')
            deleteCollectData(collectDeleteList).then(res => {
              console.log(res)
            })
          }
          // ????????????????????????????????????????????????
        } else {
          // ?????????????????????????????????????????????????????????????????????????????????
          if(ifCollectExit.currentType === 1) {
            // ??????????????????????????????????????????????????????
            newCollectData(ifCollectExit.houseId, ifCollectExit.userId).then(res => {
              console.log(res)
            })
          }
          // ?????????????????????????????????????????????
        }
      }
    }
  }
</script>

<style scoped>
  #detail {
    /* tabBar???fixed???????????????????????????????????????????????????????????????*/
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
