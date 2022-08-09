<template>
  <div class="container">
    <nav-bar class="bar">
      <div slot="left" @click="backNewHouse" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center">获取地址</div>
      <div slot="right" class="check-right" @click="getLocation">
        <img src="~assets/img/common/success.svg" alt="">
      </div>
    </nav-bar>

    <!--<div class="search-box">
      <input
        v-model="searchKey"
        type="search"
        id="search">
      <button @click="searchByHand">搜索</button>
      <div class="tip-box" id="searchTip"></div>
    </div>-->
    <!--
      amap-manager： 地图管理对象
      vid：地图容器节点的ID
      zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
      center： 地图中心点坐标值
      plugin：地图使用的插件
      events： 事件
    -->
    <el-amap class="amap-box"
             :amap-manager="amapManager"
             :vid="'amap-vue'"
             :zoom="zoom"
             :plugin="plugin"
             :center="center"
             :events="events"
    >
      <!-- 标记 -->
      <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
    </el-amap>
  </div>

</template>

<script>
  import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'

  import NavBar from 'components/common/navBar/NavBar'

  let Geocoder; //先声明变量，
  let amapManager = new AMapManager()
  export default {
    name: "Map",
    components: {
      NavBar
    },
    mounted() {
      this.link = this.$route.query.link
    },
    data() {
      let self = this
      return {
        link:'',
        address: null,
        searchKey: '',
        amapManager,
        markers: [],
        searchOption: {
          city: '全国',
          citylimit: true
        },
        center: [121.329402, 31.228667],
        zoom: 17,
        lng: 0,
        lat: 0,
        loaded: false,
        events: {
          // 点击获取地址的数据
          click(e) {
            /*console.log('点击获取坐标',e)*/
            self.markers = []
            let {lng, lat} = e.lnglat
            self.lng = lng
            self.lat = lat
            self.center = [lng, lat]
            self.markers.push([lng, lat])
            // 这里通过高德 SDK 完成。
            let geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: 'all'
            })
            geocoder.getAddress([lng, lat], function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  console.log(result.regeocode.formattedAddress)
                  self.address = result.regeocode.formattedAddress
                  self.searchKey = result.regeocode.formattedAddress
                  self.$nextTick()
                }
              }
            })

            self.$nextTick();
          }
        },
        // 一些工具插件
        plugin: [
          // 初始化鹰眼
          {
            showMarker: true,
            pName: "Geocoder", //使用AMap.Geocoder插件
            events: {
              init(o) {
                Geocoder = o; // o 则是AMap.Geocoder的实例 对外部的Geocoder变量进行赋值，在任何地方就都可以使用了
                //self.center 具体坐标 （数组格式） ，function 回调函数
                o.getAddress(self.center, function (status, result) {
                  if (status === "complete" && result.info === "OK") {
                    //result.regeocode.formattedAddress就是具体位置
                    console.log(result.regeocode.formattedAddress);
                    self.address = result.regeocode.formattedAddress
                    self.searchKey = result.regeocode.formattedAddress
                    self.markers.push(self.center)  // 初始定位的坐标显示
                    self.$nextTick()
                  }
                });
                self.$nextTick();
              },
            },
          },
          {
            // 定位
            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
            pName: 'Geolocation',
            events: {
              init(o) {
                // o是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    // 设置经度
                    self.lng = result.position.lng
                    // 设置维度
                    self.lat = result.position.lat
                    // 设置坐标
                    self.center = [self.lng, self.lat]
                    self.markers.push([self.lng, self.lat])
                    // load
                    self.loaded = true

                    // 这里通过高德 SDK 完成。
                    let geocoder = new AMap.Geocoder({
                      radius: 1000,
                      extensions: 'all'
                    })
                    geocoder.getAddress([self.lng, self.lat], function (status, result) {
                      if (status === 'complete' && result.info === 'OK') {
                        if (result && result.regeocode) {
                          console.log('初始定位',result.regeocode.formattedAddress)
                          self.address = result.regeocode.formattedAddress
                          self.searchKey = result.regeocode.formattedAddress
                          self.$nextTick()
                        }
                      }
                    })

                    // 页面渲染好后
                    self.$nextTick()
                  }
                })
              }
            }
          },
          {
            // 工具栏
            pName: 'ToolBar',
            events: {
              init(instance) {
                /*console.log(instance);*/
              }
            }
          },
          {
            // 鹰眼
            pName: 'OverView',
            events: {
              init(instance) {
                /*console.log(instance);*/
              }
            }
          },
          {
            // 地图类型
            pName: 'MapType',
            defaultType: 0,
            events: {
              init(instance) {
                /*console.log(instance);*/
              }
            }
          },
          {
            // 搜索
            pName: 'PlaceSearch',
            events: {
              init(instance) {
                /*console.log(instance)*/
              }
            }
          }
        ]
      }
    },
    methods: {
      backNewHouse() {
        this.$router.back()
      },
      /* 传出房源新建点击事件*/
      getLocation() {
        this.$router.replace({
          path: this.link,
          query: {
            address: this.address
          }
        })
      },

      /*initSearch() {
        let vm = this
        let map = this.amapManager.getMap()
        AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
          var poiPicker = new PoiPicker({
            input: 'search',
            placeSearchOptions: {
              map: map,
              pageSize: 10
            },
            suggestContainer: 'searchTip',
            searchResultsContainer: 'searchTip'
          })
          vm.poiPicker = poiPicker
          // 监听poi选中信息
          poiPicker.on('poiPicked', function (poiResult) {
            console.log('监听poi选中信息',poiResult)
            let source = poiResult.source
            let poi = poiResult.item
            if (source !== 'search') {
              poiPicker.searchByKeyword(poi.name)
            } else {
              poiPicker.clearSearchResults()
              vm.markers = []
              let lng = poi.location.lng
              let lat = poi.location.lat
              let address = poi.cityname + poi.adname + poi.name
              vm.center = [lng, lat]
              vm.markers.push([lng, lat])
              vm.lng = lng
              vm.lat = lat
              vm.address = address
              vm.searchKey = address
            }
          })
        })
      },
      searchByHand() {
        if (this.searchKey !== '') {
          this.poiPicker.searchByKeyword(this.searchKey)
        }
      }*/
    }

  }
</script>

<style scoped>
  .container {
    height: 100vh;
    width: 100%;
    position: relative;
    z-index: 10;
    border: 1px solid #999;
  }

  .bar {
    box-shadow: 0 2px 2px rgba(100,100,100,.1);
  }
  .back {
    display: flex;
    align-items: center;
    height: 44px;
    padding-left: 10px;
  }
  .center {
    font-size: 18px;
    font-weight: 500;
  }
  .check-right {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
  }
  .check-right img {
    height: 20px;
    width: 20px;
  }

  .amap-box {
    position: relative;
    height: calc(100% - 44px);
  }
  .search-box {
    position: absolute;
    z-index: 5;
    width: 70%;
    left: 13%;
    top: 10px;
    height: 30px;
  }

  .search-box input {
    float: left;
    width: 80%;
    height: 100%;
    border: 1px solid #30ccc1;
    padding: 0 8px;
    outline: none;
  }

  .search-box button {
    float: left;
    width: 20%;
    height: 100%;
    background: #30ccc1;
    border: 1px solid #30ccc1;
    color: #fff;
    outline: none;
  }

  .tip-box {
    width: 100%;
    max-height: 260px;
    position: absolute;
    top: 30px;
    overflow-y: auto;
    background-color: #fff;
  }
</style>
