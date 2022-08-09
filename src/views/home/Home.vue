<template>
    <div id="home">
      <home-nav-bar @addressChoose="addressChoose"/>
      <!--父传子值的时候最好使用小写分隔符的形式-->

      <!--偷天换日，与下面包含在BScroll的tabControl达到替换效果-->
      <tab-control :titles="['单人租房','多人合租']"
                   class="tab-control"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   v-show="ifShowControl"></tab-control>

      <scroll class="content" ref="Scroll"
              :probe-type="3"
              :pull-up-load="true"
              @scroll="getPosition"
              @pullingUp="getMoreData">
        <home-swiper :banners="banners" @swiper="getHeight"></home-swiper>
        <home-recommend :recommends="recommends"></home-recommend>
        <home-featrue></home-featrue>
        <tab-control :titles="['单人租房','多人合租']"
                     @tabClick="tabClick"
                     ref="tabControl2"></tab-control>
        <goods-list v-if="ifHaveGoods" :goods="showMessage"></goods-list>
        <none v-else :none-content="noneGoods"/>
      </scroll>

      <!--组件不能直接监听事件，需要属性.native监听组件根元素-->
      <back-top @click.native="backTop" v-show="ifBackTop"></back-top>
    </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import None from 'components/common/none/None'

  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import HomeNavBar from './childComponents/HomeNavBar'
  import HomeSwiper from "./childComponents/HomeSwiper"
  import HomeRecommend from "./childComponents/HomeRecommend"
  import HomeFeatrue from './childComponents/HomeFeatrue'

  import { backTop } from 'common/mixin'
  import { getHomeMultiData, getHouseList } from "network/home";
  import { debounce, throttle } from 'common/Utils'

  export default {
    name: "Home",
    components: {
      Scroll,
      None,

      TabControl,
      GoodsList,

      HomeNavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeatrue
    },
    data() {
      return {
        banners: [
          {image: require('@/assets/img/home/banners/banners_1.jpg')},
          {image: require('@/assets/img/home/banners/banners_2.jpg')},
          {image: require('@/assets/img/home/banners/banners_3.jpg')},
          {image: require('@/assets/img/home/banners/banners_4.jpg')}
        ],
        recommends: [
          {image: require('@/assets/img/home/recommends/house_old.svg'), title: '二手房'},
          {image: require('@/assets/img/home/recommends/house_new.svg'), title: '新房'},
          {image: require('@/assets/img/home/recommends/house_sell.svg'), title: '卖房'},
          {image: require('@/assets/img/home/recommends/house_lease.svg'), title: '租房'},
          {image: require('@/assets/img/home/recommends/questionnaire.svg'), title: '调查问卷'}
        ],
        goods: {
          '单人租房': {page: 0, list: []},
          '多人合租': {page: 0, list: []},
        },
        maxEveryCount: 3, // 每页最大数量
        currentType: '单人租房',
        contentHeight: 0,
        ifShowControl: false,
        locationY: 0,
        keyword: '',
        noneGoods: {
          image: require('@/assets/img/common/none.png'),
          content: '当前暂无数据',
          tips: '请换一种类别或定位重新获取房源数据'
        },
        ifFirstInHome: true  //判断是否是第一次进入首页
      }
    },
    /* 引用混入*/
    mixins: [backTop],
    /* 创建时请求必要数据*/
    /* 注意：不要在created回调函数中直接操作组件*/
    created() {
      /* 调用数据的加载方法*/
      this.getHouseList('单人租房')
      this.getHouseList('多人合租')
    },
    mounted() {
      /* 自定义refresh来接受调用防抖动(debounce)/节流(throttle)的返回结果，是函数*/
      /* 注意此处防抖动(debounce)/节流(throttle)的传参，参数是是方法对象，但是该方法不能加()，否则是传入返回值，报错*/
      /* refresh是防抖动(debounce)/节流(throttle)中return后的结果，并不会执行return前的timer实例化*/
      const refresh = debounce(this.$refs.Scroll.refresh, 200)
      //const refresh = throttle(this.$refs.Scroll.refresh, 3000)

      /* 监听图片的加载*/
      this.$bus.$on('homeItemImageLoad', ()=> {
        /* 调用scroll组件中封装好的实时刷新方法*/
        /* 再次进行判断，保护路由切换后可能还会遇到找不到scroll.refresh()的问题*/
        /* 箭头函数是闭包函数，每次调用refresh的时候，refresh中重定义的timer并不会被销毁*/
        this.$refs.Scroll && refresh()
      })
    },
    /* 活跃时的回调函数*/
    activated() {
      /* 活跃时，直接回到保留的y轴，以此记录切换路由时保留上一路由的浏览位置*/
      this.$refs.Scroll.scrollTo(0, this.locationY, 100)
      this.$refs.Scroll.refresh()
      if(!this.ifFirstInHome) {
        this.getHouseList('单人租房')
        this.getHouseList('多人合租')
      }
    },
    /* 离开时，不活跃时的回调函数*/
    deactivated() {
      /* 离开时保留当前y轴数值*/
      this.locationY = this.$refs.Scroll.getScrollY()
      this.goods = {
        '单人租房': {page: 0, list: []},
        '多人合租': {page: 0, list: []},
      }
      this.ifFirstInHome = false
    },
    computed: {
      /* 展示当前类别的商品*/
      showMessage() {
        return this.goods[this.currentType].list
      },
      /* 判断当前类别的是否含有商品，若无，则以提示信息代替显示*/
      ifHaveGoods() {
        return this.goods[this.currentType].list.length !== 0
      }
    },
    methods: {
      /* 点击事件监听部分*/
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = '单人租房'
            break
          case 1:
            this.currentType = '多人合租'
            break
        }
        /* 当tabControl传来点击事件时，同时修改两个tabControl组件中的currentIndex的值*/
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      /* 传出事件监听部分*/
      getHeight() {
        /* 获取tabControl的offsetTop值，并根据该值来决定tabControl的显示位置*/
        /* 注意，offsetTop是原生标签的属性，获取组件的必须加上$el获取内容中的标签属性*/
        this.contentHeight = this.$refs.tabControl2.$el.offsetTop
      },
      getPosition(position) {
        /* 1.如果实时监听的y轴高度到一定程度，显示返回顶部的按钮，否则隐藏*/
        /* 此处使用的是mixin混入的方法*/
        this.ifShowBackTop(position)

        /* 2.如果实时监听的y轴高度到一定程度，显示BScroll外的tabControl替换显示*/
        this.ifShowControl = -position.y >= this.contentHeight
      },
      /* 获取更多的房源信息*/
      getMoreData() {
        /* 当前程序设置的一页商品数为maxEveryCount，设定当当前的list个数<maxEveryCount时，禁止加载更多*/
        if(this.goods[this.currentType].list.length >= this.maxEveryCount) {
          this.getHouseList(this.currentType)
        }
      },
      /* 搜索地址关键字更改*/
      addressChoose(address) {
        this.keyword = address
        /* 重置商品列表*/
        this.goods =  {
          '单人租房': {page: 0, list: []},
          '多人合租': {page: 0, list: []},
        }
        /* 调用数据的加载方法*/
        this.getHouseList('单人租房')
        this.getHouseList('多人合租')
      },

      /* 网络请求部分*/
      /* 商品数据*/
      getHouseList(type) {
        const page = this.goods[type].page + 1
        const theType = (type === '单人租房' ? 'single' : 'together')
        const keyword = this.keyword
        const maxEveryCount = this.maxEveryCount
        getHouseList(theType, page, maxEveryCount, keyword).then(res => {
          console.log(res.data)
          if (res.data.length !== 0) {
            this.goods[type].list.push(...res.data.listData)
            this.goods[type].page += 1
          }
        })
      }
    }
  }
</script>

<!--style的scoped属性保证作用域-->
<style scoped>
  #home {
    /*适配屏幕高度*/
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;
  }
  .tab-control {
    position: relative;
    /*top: 5px;*/
    /* z-index设定空间上的第三轴，数字越大显示越前，越小被覆盖*/
    z-index: 9;
  }
  /* 通过计算来执行内容部分高度确定*/
  /*.content {
    !* 计算属性，从home父组件的总高度-navBar-tabBar高度,得到显示内容的高度*!
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/
  /* 通过父相子绝形式来进行内容高度确定*/
  .content {
    position: absolute;
    overflow: hidden;
    background-color: white;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
