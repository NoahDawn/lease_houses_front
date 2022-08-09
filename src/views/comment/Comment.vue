<template>
  <!--点评部分-->
  <div id="comment">
    <!--顶部导航栏-->
    <comment-nav-bar/>

    <!--控制导航栏-->
    <tab-control class="tab-control" :titles="titles" @tabClick="tabClick"/>

    <!--内容主体-->
    <scroll class="content"
            ref="Scroll"
            :probe-type="3">
      <div class="comment-main">
        <!--有内容时显示-->
        <div v-if="true">
          <comment-list :comment-list="showCommentList" :current-control-index="currentControlIndex"/>
        </div>

        <!--无内容时显示-->
        <div v-else>
          <div v-for="(item,index) in noneContent.tips"
               v-if="index === currentControlIndex"
               class="comment-main-none">
            <img :src="noneContent.image" alt="">
            <div>{{item}}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import CommentNavBar from './childComponents/CommentNavBar'
  import CommentList from './childComponents/CommentList'

  import TabControl from 'components/content/tabControl/TabControl'
  import Scroll from 'components/common/scroll/Scroll'

  import { getMyNews, getMyReply } from "network/news";

  export default {
    name: "Comment",
    data() {
      return {
        titles: ['我的留言','我的回复'],  // 控制导航栏显示标题
        currentControlIndex: 0,  // 当前的控制导航栏下标
        noneContent: {
          image: require('@/assets/img/comment/comment_none.png'),
          tips: ['您还没有对任何楼盘进行留言哦','您还没有对任何楼盘进行回复哦']
        },
        commentList: {  // 请求的网络数据列表
          'news': [],
          'reply': []
        }
      }
    },
    components: {
      CommentList,
      CommentNavBar,
      TabControl,
      Scroll
    },
    created() {
      // 获取个人的留言与回复列表
      if(this.$store.state.loginUserMS.id !== 0) {
        // 获取留言
        getMyNews(this.$store.state.loginUserMS.id).then(res => {
          console.log('当前获取的留言数据：',res.data)
          this.commentList['news'].push(...res.data)
        })
        // 获取回复
        getMyReply(this.$store.state.loginUserMS.id).then(res => {
          console.log('当前获取的回复数据：',res.data)
          this.commentList['reply'].push(...res.data)
        })
      }
    },
    computed: {
      showCommentList() {
        if(this.currentControlIndex===0) {
          return this.commentList['news']
        } else {
          return this.commentList['reply']
        }
      }
    },
    methods: {
      // 切换控制栏的下标
      tabClick(controlIndex) {
        this.currentControlIndex = controlIndex
      }
    }
  }
</script>

<style scoped>
  #comment {
    position: relative;
    background-color: white;
    z-index: 10;
    height: 100vh;
  }
  /* 滚动区域*/
  .content {
    height: calc(100% - 44px - 65px);
    position: relative;
    overflow: hidden;
  }

  /* 控制导航栏*/
  .tab-control {
    margin-top: 10px;
  }

  /* 主区域内边距*/
  .comment-main {
    padding-top: 2px;
  }

  /* 无内容时显示的主体区域*/
  .comment-main-none {
    text-align: center;
    margin: 25% 0;
  }
  .comment-main-none img {
    width: 250px;
    height: 200px;
  }
  .comment-main-none div {
    margin-top: 10px;
    color: #cccccc;
    font-weight: 400;
    letter-spacing: 1px;
  }
</style>
