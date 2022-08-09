<template>
    <div id="new-house">
      <!--顶部导航栏-->
      <new-house-nav-bar @housePost="housePostCheck" @back="backProfile"/>

      <!--可滚动内容-->
      <scroll class="content">
        <!--卖方广告-->
        <div class="house_title">
          <img src="~assets/img/house/title/house_title.png" alt="">
        </div>

        <!--租赁流程-->
        <new-house-process/>

        <!--房源信息-->
        <div class="house_message">
          <!--基本信息-->
          <div class="message_title">基本信息</div>
          <new-house-content-item>
            <div slot="left" class="left">名称</div>
            <input type="text" slot="center" class="center" placeholder="请输入"
                   v-model="newHouseContent.houseName" :disabled="ifPostNewHouse" />
            <div slot="right" class="right">*</div>
          </new-house-content-item>
          <new-house-content-item>
            <div slot="left" class="left">房源类型</div>
            <select name="houseTypeList" id="houseTypeList"
                    slot="center" class="center select"
                    v-model="newHouseContent.houseType" :disabled="ifPostNewHouse">
              <option v-for="item in houseTypeList" :value="item.typeName">{{item.typeName}}</option>
            </select>
            <div slot="right" class="right"></div>
          </new-house-content-item>
          <new-house-content-item :if-click="!ifPostNewHouse" link="/map" back-link="/newHouse">
            <div slot="left" class="left">所在地</div>
            <input type="text" slot="center" class="center" placeholder="请选择所在地"
                   v-model="newHouseContent.location" disabled="disabled" />
          </new-house-content-item>
          <new-house-content-item>
            <div slot="left" class="left">朝向</div>
            <select name="direction" id="direction" slot="center" class="center select"
                    v-model="newHouseContent.direction" :disabled="ifPostNewHouse">
              <option v-for="item in direction" :value="item">{{item}}</option>
            </select>
            <div slot="right" class="right"></div>
          </new-house-content-item>
          <new-house-content-item>
            <div slot="left" class="left">楼层</div>
            <input type="number" slot="center" class="center" placeholder="请输入"
                   v-model.number="newHouseContent.floor" :disabled="ifPostNewHouse" />
            <div slot="right" class="right">*</div>
          </new-house-content-item>
          <new-house-content-item>
            <div slot="left" class="left">面积</div>
            <input type="number" slot="center" class="center" placeholder="单位: m (平方)"
                   v-model.number="newHouseContent.area" :disabled="ifPostNewHouse" />
            <div slot="right" class="right">*</div>
          </new-house-content-item>
          <new-house-content-item>
            <div slot="left" class="left">房间类型</div>
            <div slot="center" class="center-border-no">
              <input type="text" class="input-short" v-model="room" :disabled="ifPostNewHouse">室
              <input type="text" class="input-short" v-model="hall" :disabled="ifPostNewHouse">厅
              <input type="text" class="input-short" v-model="toilet" :disabled="ifPostNewHouse">卫
            </div>
            <div slot="right" class="right">*</div>
          </new-house-content-item>

          <!--展示信息-->
          <div class="message_title">展示信息</div>
          <new-house-content-item>
            <div slot="left" class="left">期望售价</div>
            <input type="number" slot="center" class="center" placeholder="请输入"
                   v-model.number="newHouseContent.rent" :disabled="ifPostNewHouse" />
            <div slot="right-img" class="right">/月</div>
            <div slot="right" class="right">*</div>
          </new-house-content-item>
          <new-house-content-item>
            <div slot="left" class="left">备注</div>
            <input type="text" slot="center" class="center" placeholder="请输入"
                   v-model="newHouseContent.detail" :disabled="ifPostNewHouse" />
            <div slot="right" class="right"></div>
          </new-house-content-item>

          <new-house-content-item>
            <div slot="left" class="left">展示图片</div>
            <div slot="center" class="choose-image">
              <!--multiple属性可选中多张图片-->
              <input v-show="false" type="file" accept="image/*" @change="tirggerFile($event)" ref="Pictures" multiple/>
              <button type="button" @click="openImg" class="the-button" :disabled="ifPostNewHouse || imgUrl.length >= 3">点击上传*3</button>
            </div>
            <div slot="right" class="right"></div>
          </new-house-content-item>

          <!--图片筛选图层-->
          <div class="image-show" v-if="imgUrl.length!==0" ref="wrapperX">
            <div ref="contentX">
              <div v-for="(item,index) in imgUrl" class="image-item">
                <img :src="item" class="show" />
                <img src="~assets/img/house/image/del.svg" alt="" class="del" @click="delImage(index)" />
              </div>
            </div>
          </div>

          <!--上架选择-->
          <div class="message_title">选择下架日期</div>
          <new-house-content-item>
            <div slot="left" class="left">时间选择</div>
            <!--<select name="onShelfTime" id="onShelfTime" slot="center" class="center select" v-model="newHouseContent.shelfTime" :disabled="ifPostNewHouse">-->
              <!--<option v-for="item in shelfTimeArea" :value="item">{{item}}</option>-->
            <!--</select>-->
            <input type="date" ref="datetime" slot="center" class="center" @change="getEndTime" :disabled="ifPostNewHouse">
            <div slot="right" class="right"></div>
          </new-house-content-item>
          <new-house-content-item>
            <div slot="left" class="left">手续费用</div>
            <input type="text" slot="center" class="center" v-model="shelfCost" disabled="disabled" />
            <div slot="right" class="right"></div>
          </new-house-content-item>

          <!--设施配备-->
          <div class="message_title">设施配备</div>
          <div class="message_facilities">
            <div class="message_facilities-item" v-for="(facility,index) in facilitiesImg">
              <label :for="facility.tittle">
                <div :id="facility.tittle">
                  <img :src="facility.image" alt="">
                  <input type="checkbox"
                         class="check-box"
                         name="facilities"
                         :value="facility.title"
                         @change="facilitiesMatch"
                         :checked="facility.ifMatch"
                         :disabled="ifPostNewHouse"/>{{facility.titleCN}}
                </div>
              </label>
            </div>
          </div>
        </div>

        <!--租赁设置-->
        <div class="message_title">租赁设置</div>
        <new-house-content-item>
          <div slot="left" class="left">入住情况</div>
          <!--<input type="text" slot="center" class="center" v-model="UserMS.realname" disabled="disabled" />-->
          <div slot="center" class="center-border-no">
            <label for="everyTime">
              <input type="radio" class="check-radio" id="everyTime" value="随时入住" v-model="newHouseContent.occupancy" :disabled="ifPostNewHouse">
              <span class="">随时入住</span>
            </label>
            <label for="afterTime">
              <input type="radio" class="check-radio" id="afterTime" value="待清理后" v-model="newHouseContent.occupancy" :disabled="ifPostNewHouse">
              <span class="">待清理后</span>
            </label>
          </div>
          <div slot="right" class="right">*</div>
        </new-house-content-item>
        <new-house-content-item>
          <div slot="left" class="left">预约形式</div>
          <!--<input type="text" slot="center" class="center" v-model="UserMS.phone" disabled="disabled" />-->
          <div slot="center" class="center-border-no">
            <label for="advance">
              <input type="radio" class="check-radio" id="advance" value="提前预约" v-model="newHouseContent.houseInspection" :disabled="ifPostNewHouse">
              <span class="">提前预约</span>
            </label>
            <label for="intraday">
              <input type="radio" class="check-radio" id="intraday" value="当天实勘" v-model="newHouseContent.houseInspection" :disabled="ifPostNewHouse">
              <span class="">当天实勘</span>
            </label>
          </div>
          <div slot="right" class="right">*</div>
        </new-house-content-item>
        <new-house-content-item>
          <div slot="left" class="left">出租方式</div>
          <div slot="center" class="center-border-no">
            <label for="single">
              <input type="radio" class="check-radio" id="single" value="single" v-model="newHouseContent.leaseType" :disabled="ifPostNewHouse">
              <span class="">单人整租</span>
            </label>
            <label for="together">
              <input type="radio" class="check-radio" id="together" value="together" v-model="newHouseContent.leaseType" :disabled="ifPostNewHouse">
              <span class="">支持合租</span>
            </label>
          </div>
          <div slot="right" class="right">*</div>
        </new-house-content-item>
        <new-house-content-item>
          <div slot="left" class="left">出租周期</div>
          <select name="leaseTerm" id="leaseTerm" slot="center" class="center select"
                  v-model="newHouseContent.leaseTerm" :disabled="ifPostNewHouse">
            <option v-for="item in leaseTerm" :value="item">{{item}}</option>
          </select>
          <div slot="right" class="right"></div>
        </new-house-content-item>

        <!--联系信息-->
        <div class="message_title">联系信息</div>
        <new-house-content-item>
          <div slot="left" class="left">称呼</div>
          <input type="text" slot="center" class="center" v-model="UserMS.realname" disabled="disabled" />
          <div slot="right" class="right"></div>
        </new-house-content-item>
        <new-house-content-item>
          <div slot="left" class="left">联系方式</div>
          <input type="text" slot="center" class="center" v-model="UserMS.phone" disabled="disabled" />
          <div slot="right" class="right"></div>
        </new-house-content-item>

        <!--服务广告-->
        <new-house-service/>
      </scroll>

      <!-- 选择支付方式的遮盖幕布 -->
      <back-mask :if-show="toastTab.ifShow" mask-area="withoutTop" @maskHidden="confirmCancel()">
        <!--确认弹窗-->
        <toast-tab
          slot="upper"
          :tab="toastTab.tab"
          :if-show="toastTab.ifShow"
          @checkRight="checkRight()"
          @confirmCancel="confirmCancel()"/>
      </back-mask>

      <!-- 支付宝支付界面 -->
      <Alipay v-if="ifAlipay"
              class="alipay"
              @alipayControl="alipayControl"
              @payContinue="payContinue"
              :cost-obj="costObj"/>
    </div>
</template>

<script>
  import NewHouseNavBar from './childComponents/NewHouseNavBar'
  import NewHouseProcess from './childComponents/NewHouseProcess'
  import NewHouseContentItem from './childComponents/NewHouseContentItem'
  import NewHouseService from './childComponents/NewHouseService'
  import BackMask from 'components/common/backMask/BackMask'
  import ToastTab from 'components/content/toastTab/ToastTab'
  import Alipay from 'components/common/alipay/Alipay'
  import Scroll from 'components/common/scroll/Scroll'

  import { mapGetters } from 'vuex'
  import { postNewHouse, getHouseTypeList, initFacilities } from "network/house";
  import { changeWallet } from "network/wallet";
  import { differDays, dateCodeChange } from 'common/Utils'

  import axios from 'axios'

  export default {
    name: "NewHouse",
    data() {
      return {
        direction: ['东','南','西','北','东北','东南','西北','西南'],  // 房源朝向数组
        leaseTerm: ['月','季度','半年','一年'],  // 租赁周期数组
        facilitiesImg: [  // 设施配备
          {
            imageFill: require('@/assets/img/detail/facilities/washingMachine_fill.svg'),
            image: require('@/assets/img/detail/facilities/washingMachine.svg'),
            titleCN: '洗衣机',
            title: 'washingMachine',
            ifMatch: false  // 是否具备
          },
          {
            imageFill: require('@/assets/img/detail/facilities/airConditioner_fill.svg'),
            image: require('@/assets/img/detail/facilities/airConditioner.svg'),
            titleCN: '空调',
            title: 'airConditioner',
            ifMatch: false  // 是否具备
          },
          {
            imageFill: require('@/assets/img/detail/facilities/wardrobe_fill.svg'),
            image: require('@/assets/img/detail/facilities/wardrobe.svg'),
            titleCN: '衣柜',
            title: 'wardrobe',
            ifMatch: false  // 是否具备
          },
          {
            imageFill: require('@/assets/img/detail/facilities/television_fill.svg'),
            image: require('@/assets/img/detail/facilities/television.svg'),
            titleCN: '电视',
            title: 'television',
            ifMatch: false  // 是否具备
          },
          {
            imageFill: require('@/assets/img/detail/facilities/refrigerator_fill.svg'),
            image: require('@/assets/img/detail/facilities/refrigerator.svg'),
            titleCN: '冰箱',
            title: 'refrigerator',
            ifMatch: false  // 是否具备
          },
          {
            imageFill: require('@/assets/img/detail/facilities/heater_fill.svg'),
            image: require('@/assets/img/detail/facilities/heater.svg'),
            titleCN: '热水器',
            title: 'heater',
            ifMatch: false  // 是否具备
          },
          {
            imageFill: require('@/assets/img/detail/facilities/bed_fill.svg'),
            image: require('@/assets/img/detail/facilities/bed.svg'),
            titleCN: '床',
            title: 'bed',
            ifMatch: false  // 是否具备
          },
          {
            imageFill: require('@/assets/img/detail/facilities/heating_fill.svg'),
            image: require('@/assets/img/detail/facilities/heating.svg'),
            titleCN: '暖气',
            title: 'heating',
            ifMatch: false  // 是否具备
          },
          {
            imageFill: require('@/assets/img/detail/facilities/broadband_fill.svg'),
            image: require('@/assets/img/detail/facilities/broadband.svg'),
            titleCN: '宽带',
            title: 'broadband',
            ifMatch: false  // 是否具备
          },
          {
            imageFill: require('@/assets/img/detail/facilities/naturalGas_fill.svg'),
            image: require('@/assets/img/detail/facilities/naturalGas.svg'),
            titleCN: '天然气',
            title: 'naturalGas',
            ifMatch: false  // 是否具备
          }
        ],
        room: '',  // 室
        hall: '',  // 厅
        toilet: '',  // 卫
        imgUrl: [],  // 上传的图片数组
        newHouseContent: {  // 新建房源信息（基础信息）
          houseName: '',
          houseType: '商品房',
          location: '',
          direction: '东',
          floor: 1,
          area: 0,
          roomType: '',
          rent: 500,
          detail: '',
          occupancy: '随时入住',  // 入住情况
          houseInspection: '提前预约',  // 预约形式
          leaseType: 'single', // 出租方式
          leaseTerm: '月',  // 出租周期
          shelfTime: 1,  // 默认上架天数
          createTime: '',  // 创建时间
          destroyTime: '',  // 过期时间
        },
        houseTypeList: [],  // 房源类型列表数组
        ifPostNewHouse: false,  // 判断是否完成新建房源
        isBackProfile: false,  // 判断当前是否是离开新建，回退到个人主页面

        toastTab: {  // 弹出层显示信息
          tab: {
            title: "",
            content: ""
          },
          ifShow: false  // 弹出层与屏幕幕布的显示选项
        },
        ifAlipay: false, // 支付宝弹出层
        costObj: {  // 支付宝支付对象
          title: "支付宝支付",
          cost: 1000.00,
          type: '手续费'
        },
        ifPayAllRight: false,  // 用于判断支付是否完成
      }
    },
    components: {
      NewHouseNavBar,
      NewHouseProcess,
      NewHouseContentItem,
      NewHouseService,
      BackMask,
      ToastTab,
      Alipay,
      Scroll
    },
    created() {
      this.isBackProfile = false
      // 获取房源类型的列表
      getHouseTypeList().then(res => {
        if(res.data) {
          this.houseTypeList.push(...res.data)
        }
      })
    },
    activated() {
      this.isBackProfile = false
      this.newHouseContent.location = this.$route.query.address
    },
    deactivated() {
      /* 选择地址变为不活跃时保留信息，离开新建页面清除*/
      if(this.isBackProfile) {
        /* 路由不活跃时清除当前输入信息*/
        this.resetTheHouse()
      }
    },
    computed: {
      /* 将vuex的getters转换为当前的computed*/
      ...mapGetters({
        /* 错误写法，store中的getters在后方*/
        /*getLoginUserMS: 'UserMS'*/
        UserMS: 'getLoginUserMS'
      }),
      // 显示上架需要支付的资金
      shelfCost() {
        return "￥" + parseInt(this.costObj.cost) + " (根据上架时间计算)"
      }
    },
    methods: {
      // 修改设施的选中
      facilitiesMatch(e) {
        this.facilitiesImg.forEach((item) => {
          if(item.title === e.target.value) {
            item.ifMatch = e.target.checked
          }
        })
      },
      /* 展示上传的图片*/
      tirggerFile(event) {
        // 判断当前展示用的图片是否数量大于3
        if (event.target.files.length + this.imgUrl.length > 3) {
          alert("您选择的图片数量大于3张！")
          return false
        }
        for(let file of event.target.files) {
          /* 将文件对象存入该数组，用于传输到后台*/
          let reader = new FileReader();
          reader.readAsDataURL(file);
          let that = this;
          reader.onload = function(e) {
            /* 将图片转为base64格式*/
            /*let url = this.result.substring(this.result.indexOf(",") + 1);
            that.imgUrl.push("data:image/png;base64," + url);*/
            /* 将加载后的图片url存入该数组，用于展示*/
            that.imgUrl.push(reader.result)
          }
        }
        return true
      },
      /* 打开文件选择器*/
      openImg() {
        this.$refs.Pictures.click();
      },
      /* 删除已选中的图片*/
      delImage(index) {
        /*this.imgObj.splice(index, 1)*/
        this.imgUrl.splice(index, 1)
      },
      /* 测试图片数量是否为三张*/
      pictureCount() {
        if(this.imgUrl.length < 3) {
          this.$toast.show('您的展示图片小于三张', 2000, false)
          return false
        } else if (this.imgUrl.length > 3) {
          // 若使用非常规手段绕过上传检测，此处进行数量截取
          this.$toast.show('自动为您截取前三张', 2000, true)
          /* 截取前三个，因为使用高阶函数slice原数组不变，所以将截取后的直接赋值*/
          /* 注意参数，第一个是起始下标，第二个是延后作用个数*/
          this.imgUrl = this.imgUrl.slice(0,3)
        }
        return true
      },
      // 组合室、厅、卫生间
      connectRoomType() {
        if(!this.room || !this.hall || !this.toilet) {
          return false
        } else {
          this.newHouseContent.roomType = this.room + "室" + this.hall + "厅" + this.toilet + "卫"
          return true
        }
      },
      /* 测试关键信息是否为空*/
      isInputNull() {
        const houseMS = this.newHouseContent
        if(!houseMS.houseName || !houseMS.houseType || !houseMS.location ||
          !houseMS.direction || !houseMS.floor || houseMS.floor <= 0 ||
          houseMS.area <= 0 || !houseMS.roomType || !houseMS.rent ||
          houseMS.rent === 0 || !houseMS.detail || !houseMS.shelfTime ||
          houseMS.shelfTime < 0 || !houseMS.occupancy || !houseMS.houseInspection ||
          !houseMS.leaseTerm || !houseMS.createTime || !houseMS.destroyTime ||
          !this.pictureCount()) {
          this.$toast.show('关键信息为空或输入不规范', 2000, false)
          return false
        }
        return true
      },
      /* 暂时找不到使用封装后的axios进行文件上传的办法，先使用直接引用代替，此处将数据全部转为formData*/
      transFormData(houseMS) {
        let formData = new FormData()
        formData.append('houseName',houseMS.houseName)
        formData.append('houseType',houseMS.houseType)
        formData.append('location',houseMS.location)
        formData.append('direction',houseMS.direction)
        formData.append('floor',houseMS.floor)
        formData.append('area',houseMS.area)
        formData.append('roomType',houseMS.roomType)
        formData.append('rent',houseMS.rent)
        formData.append('detail',houseMS.detail)
        formData.append('shelfTime',houseMS.shelfTime)
        formData.append('occupancy',houseMS.occupancy)
        formData.append('leaseType',houseMS.leaseType)
        formData.append('houseInspection',houseMS.houseInspection)
        formData.append('leaseTerm',houseMS.leaseTerm)
        formData.append('createTime',houseMS.createTime)
        formData.append('destroyTime',houseMS.destroyTime)
        formData.append('facilities',this.facilitiesImg)
        for(let file of this.$refs.Pictures.files) {
          formData.append('house',file)
        }
        return formData
      },
      /* 网络请求路径*/
      getURL() {
        //let theURL = 'http://101.200.134.15:8000/api/house/new'
        let theURL = 'http://127.0.0.1:8050/api/house/new'
        theURL += '?ownerId=' + this.$store.state.loginUserMS.id
        return theURL
      },
      /* 新建房源信息网络请求前的各种检测 */
      housePostCheck() {
        /* 检测输入项和图片数量*/
        if(this.connectRoomType() && this.isInputNull()) {
          // 支付上架手续费用弹出层的确认
          this.costShelfCost()
        }
      },
      // 最终的新建房源网络请求
      housePost() {
        /* 此处暂时没解决二次封装传参问题，因此直接调用axios*/
        axios.post(this.getURL(),this.transFormData(this.newHouseContent),{
          headers: {
            'Content-Type':'multipart/form-data'
          }
        }).then(res => {
          // 此处返回的res.data.newData是新建房源的编号id
          if(res.data.newData) {
            // 新建成功后初始化其设施配备
            initFacilities(res.data.newData, this.facilitiesImg).then(res => {
              console.log(res)
              this.$toast.show('新建房源成功', 2000, true)
              /* 封锁当前的可操作项，避免重复操作*/
              this.ifPostNewHouse = true
            })
          } else {
            this.$toast.show('新建房源失败', 2000, false)
          }
        })
      },
      /* 当路由变为不活跃时，是返回，还是选择地址*/
      backProfile() {
        this.isBackProfile = true
        // 将可选中修改重新设为false，接触disable状态
        this.ifPostNewHouse = false
      },
      /* 将当前的所有输入项归置初始*/
      resetTheHouse() {
        this.newHouseContent = {
          houseName: '',
          houseType: '商品房',
          location: '',
          direction: '东',
          floor: 1,
          area: 0,
          roomType: '',
          rent: 500,
          detail: '',
          occupancy: '随时入住',  // 入住情况
          houseInspection: '提前预约',  // 预约形式
          leaseType: 'single', // 出租方式
          leaseTerm: '月',  // 出租周期
          shelfTime: 1,  // 默认上架天数
          createTime: '',  // 创建时间
          destroyTime: '',  // 过期时间
          house: []
        }
        this.imgUrl = []  // 展示图片
        this.room = ''  // 室
        this.hall =  ''  // 厅
        this.toilet =  ''  // 卫
        this.costObj =  {  // 支付宝支付对象
          title: "支付宝支付",
          cost: 1000.00,
          type: '手续费'
        }
        // 设施配备选中重新设为无
        this.facilitiesImg.forEach(item => {
          item.ifMatch = false
        })
        // 时间选择器重置
        this.$refs.datetime.value = ''
      },
      // 点击新建房源后弹出层提示支付上架资金
      costShelfCost() {
        this.toastTab.ifShow = true
        this.toastTab.tab.title = "确认"
        this.toastTab.tab.content = "请支付 " + this.costObj.cost + " 作为手续费用"
      },
      // 确认支付
      checkRight() {
        this.confirmCancel()
        const user = this.$store.state.loginUserMS

        // 获取当前余额
        const money = parseFloat(user.money).toFixed(2)
        // 计算当前的支付费用转为float型，保留两位小数
        const cost = parseFloat(this.costObj.cost).toFixed(2)
        // 比对当前用户的钱包余额是否支持费用支付
        if(money > cost) {
          // 从钱包中扣除费用
          changeWallet(user.id, cost).then(res => {
            if(res.data) {
              // 支付手续费后发起新建房源网络请求
              this.housePost()
            }
          })
        } else {
          // 弹出支付宝支付组件并网络支付手续费
          this.costObj = {
            title: "系统钱包余额不足",
            cost: cost,
            type: "上架手续费"
          }
          this.alipayControl()
        }
      },
      // 取消支付提示幕布遮盖
      confirmCancel() {
        this.toastTab.ifShow = false
      },
      // 支付宝支付显示控制
      alipayControl() {
        this.ifAlipay = !this.ifAlipay
      },
      // 已确认支付宝支付
      payContinue() {
        // 由支付宝支付后，发起新建房源网络请求
        this.housePost()
        this.ifAlipay = false
      },
      // 获取逾期时间，并动态计算需要的费用
      getEndTime(e) {
        // 传入逾期时间计算与当前时间相差天数
        const startTime = new Date()
        const endTime = e.target.value
        const diffDays = differDays(startTime, endTime)
        if(diffDays <= 0) {
          this.$toast.show("时间区间有误", 1000, false)
          return false
        }
        // 根据天数算月数，在计算需要的手续费
        const diffMonths = Math.ceil(diffDays/30) === 0 ? 1 : Math.ceil(diffDays/30)
        this.costObj.cost = diffMonths * 1000
        this.newHouseContent.createTime = dateCodeChange(startTime)
        this.newHouseContent.destroyTime = dateCodeChange(endTime)
        this.newHouseContent.shelfTime = diffDays
        // console.log("需要支付的金额：",this.costObj.cost)
        // console.log("createTime: ",this.newHouseContent.createTime)
        // console.log("destroyTime: ",this.newHouseContent.destroyTime)
      },
    }
  }
</script>

<style scoped>
  #new-house {
    position: relative;
    background-color: white;
    z-index: 10;
    height: 100vh;
  }
  .content {
    overflow: hidden;
    height: calc(100% - 44px);
  }
  .house_title img {
    width: 100%;
    height: 110px;
  }
  .house_message {
    margin-top: 20px;
    width: 100%;
  }
  .message_title {
    font-size: 22px;
    font-weight: bold;
    padding-left: 20px;
    padding-top: 20px;
    border-top: 10px solid #eee;
  }

  .left {
    font-size: 16px;
    font-weight: 600;
    width: 70px;
  }
  .center {
    width: calc(100% - 100px);
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    margin-left: 10px;
    padding-left: 10px;
    font-size: 16px;
    height: 40px;
    background-color: white;
  }
  .right {
    width: 30px;
    line-height: 60px;
    color: red;
    text-align: center;
    font-size: 18px;
  }
  .select {
    padding-left: 6px;
  }
  .center-border-no {
    width: calc(100% - 100px);
    margin-left: 10px;
    font-size: 16px;
    height: 25px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .input-short {
    width: 20%;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    padding-left: 15px;
    font-size: 16px;
    height: 25px;
    background-color: white;
  }
  .check-radio {
    margin-right: 10px;
  }
  .center-check-box {
    width: calc(100% - 100px);
    margin-left: 10px;
    font-size: 16px;
    padding: 10px 0;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    flex-wrap: wrap;
  }
  .check-box {
    margin: 7px 3px 7px 0;
    width: 30%;
  }

  .choose-image {
    width: calc(100% - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .the-button {
    width: 40%;
    border: 1px solid lightblue;
    border-radius: 5px;
    background-color: lightblue;
    color: white;
    height: 25px;
  }
  .image-show {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
  }
  .image-item {
    display: inline-block;
    position: relative;
    width: 50%;
  }
  .show{
    width: 100%;
    height: 110px;
    border: 1px solid #eee;
  }
  .del {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 5px;
    left: 5px;
  }

  .message_facilities {
    margin: 20px 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .message_facilities img {
    display: block;
    width: 35px;
    height: 35px;
    margin: 0 auto;
  }
  .message_facilities-item {
    width: 20%;
    font-size: 14px;
    display: table-cell;
    text-align: center;
  }

  /*支付宝弹出层*/
  .alipay {
    width: 80%;
    height: 80%;
    position: fixed;
    top: 10%;
    left: 10%;
    right: 10%;
    bottom: 10%;
    z-index: 30;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(100,100,100,.4);
  }
</style>
