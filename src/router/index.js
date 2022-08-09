import Vue from 'vue'
import VueRouter from 'vue-router'
import vuex from '../store/index.js'

Vue.use(VueRouter)

/* 主要的四项基础组件*/
const Home = () => import('../views/home/Home.vue')
const Follow = () => import('../views/follow/Follow.vue')
const Information = () => import('../views/information/Information.vue')
const Profile = () => import('../views/profile/Profile.vue')

/* 包含内容组件*/
const Detail = () => import('../views/detail/Detail.vue')
const AllNews = () => import('../views/allNews/AllNews.vue')
const Order = () => import('../views/order/Order.vue')
const Record = () => import('../views/record/Record.vue')
const OrderCheck = () => import('../views/orderCheck/OrderCheck.vue')
const TheOrder = () => import('../views/theOrder/TheOrder.vue')
const HouseManage = () => import('../views/houseManage/HouseManage')
const TheHouse = () => import('../views/theHouse/TheHouse')
const NewHouse = () => import('../views/newHouse/NewHouse')
const Wallet = () => import('../views/wallet/Wallet')
const Coupon = () => import('../views/coupon/Coupon')
const Comment = () => import('../views/comment/Comment')
const Intermediary = () => import('../views/intermediary/Intermediary')
const Entrust = () => import('../views/entrust/Entrust')

/* 其余组件*/
const Login = () => import('../components/content/login/Login.vue')
const Register = () => import('../components/content/register/Register.vue')
const GetPwd = () => import('../components/content/getPwd/GetPwd.vue')
const Set = () => import('../views/set/Set.vue')
const Map = () => import('../components/common/map/Map')

/* 仅用于初始化数据 */
const InitData = () => import('../components/common/initData/InitData')

const routes = [
  /* 默认路由首页*/
  {
    path: '/',
    redirect: '/home'
  },
  /* 首页路由*/
  {
    path: '/home',
    component: Home
  },
  /* 首页下附属路由*/
  /* 详情路由*/
  {
    path: '/detail',
    component: Detail
  },
  /* 留言路由*/
  {
    path: '/news',
    component: AllNews
  },
  /* 订单路由*/
  {
    path: '/order',
    component: Order
  },

  /* 关注路由*/
  {
    path: '/follow',
    component: Follow
  },

  /* 消息路由*/
  {
    path: '/information',
    component: Information
  },

  /* 个人路由*/
  {
    path: '/profile',
    component: Profile
  },
  /* 个人下附属路由*/
  /* 设置路由*/
  {
    path: '/set',
    component: Set
  },
  /* 钱包路由*/
  {
    path: '/wallet',
    component: Wallet,
    meta: {
      requireAuth: true  // 用于判断是否需要登录验证，默认值是false
    }
  },
  /* 点评路由*/
  {
    path: '/comment',
    component: Comment,
    meta: {
      requireAuth: true  // 用于判断是否需要登录验证，默认值是false
    }
  },
  /* 优惠券路由*/
  {
    path: '/coupon',
    component: Coupon,
    meta: {
      requireAuth: true  // 用于判断是否需要登录验证，默认值是false
    }
  },
  /* 登录路由*/
  {
    path: '/login',
    component: Login
  },
  /* 注册路由*/
  {
    path: '/register',
    component: Register
  },
  /* 密码找回路由*/
  {
    path: '/getPwd',
    component: GetPwd
  },
  /* 浏览记录路由*/
  {
    path: '/record',
    component: Record,
    meta: {
      requireAuth: true  // 用于判断是否需要登录验证，默认值是false
    }
  },
  /* 订单列表路由*/
  {
    path: '/orderCheck',
    component: OrderCheck,
    meta: {
      requireAuth: true  // 用于判断是否需要登录验证，默认值是false
    }
  },
  /* 订单确认路由*/
  {
    path: '/theOrder',
    component: TheOrder,
    meta: {
      requireAuth: true  // 用于判断是否需要登录验证，默认值是false
    }
  },
  /* 房源管理列表路由*/
  {
    path: '/houseManage',
    component: HouseManage,
    meta: {
      requireAuth: true  // 用于判断是否需要登录验证，默认值是false
    }
  },
  /* 房源管理路由*/
  {
    path: '/theHouse',
    component: TheHouse,
    meta: {
      requireAuth: true  // 用于判断是否需要登录验证，默认值是false
    }
  },
  /* 房源新建路由*/
  {
    path: '/newHouse',
    component: NewHouse,
    meta: {
      requireAuth: true  // 用于判断是否需要登录验证，默认值是false
    }
  },
  /* 高德地图定位路由*/
  {
    path: '/map',
    component: Map
  },
  /* 经纪人筛选路由*/
  {
    path: '/intermediary',
    component: Intermediary,
    meta: {
      requireAuth: true  // 用于判断是否需要登录验证，默认值是false
    }
  },
  /* 个人委托页路由*/
  {
    path: '/entrust',
    component: Entrust,
    meta: {
      requireAuth: true  // 用于判断是否需要登录验证，默认值是false
    }
  },

  /* 初始化数据路由（用户、房源、经纪人）*/
  {
    path: '/init',
    component: InitData
  }
]

// 新建路由对象
const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

// 添加前置守卫，判断路由进入前是否登录，有则放行，否则跳转到登录页面
// 即判断meta中的requireAuth是否为true默认值是false
router.beforeEach((to, from, next) => {
  if(to.matched.some(req => req.meta.requireAuth) !== false) {
    // 此部分为直接引入的vuex中的state进行判断
    let tokenInfo = vuex.state.loginUserMS
    if(tokenInfo.id !== 0) {
      // 判断成功，放行
      console.log('有token')
      next()
    } else {
      // 判断失败，跳转到登录路由，同时传递当前路由，作为登陆后的跳转页面
      // 此处遇到的问题，当前版本的vue-router可能会报错重复重定向redirected，再main.js中重写push，并且尽量避免使用redirect
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    // 当前路由并未设置登录判断，直接放行
    next()
  }
})

// 默认导出
export default router
