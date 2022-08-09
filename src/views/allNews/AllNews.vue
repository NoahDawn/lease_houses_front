<template>
  <!--评论留言主页-->
  <div id="all-news">
    <!--评论留言顶部导航栏-->
    <all-news-nav-bar class="nav-bar"></all-news-nav-bar>

    <!--评论留言主内容-->
    <scroll class="content">
      <div>
        <!--评论显示区-->
        <div class="news">
          <div v-for="(item,newsIndex) in news"
               class="detail-news-item"
               v-if="!ifShowNews || newsIndex < 5">
            <div class="ul-message-div" :class="{cut: newsIndex>0}">
              <div class="message-top">
                <!--<div class="message-top-picture">像</div>-->
                <img :src="item.picture" class="message-top-picture" alt="">
                <div class="message-top-name-main">{{item.realname}}</div>
              </div>
              <div class="message-middle">评论：{{item.detail}}</div>
              <div class="message-bottom">
                <div class="message-bottom-time">{{item.time}}</div>
                <div class="message-bottom-reply" @click="replyInput(1,item)">回复</div>
              </div>
            </div>

            <!--该评论下的回复区-->
            <div class="ul-reply">
              <div v-for="(content,index) in item.reply"
                   class="detail-reply-item">
                <div class="ul-reply-div">
                  <div class="reply-top">{{content.fromName}}</div>
                  <div class="reply-middle">回复<span class="reply-middle-left-target">{{content.toName}}</span> 内容：{{content.reply}}</div>
                  <div class="reply-bottom">
                    <div class="reply-bottom-time">{{content.time}}</div>
                    <div class="reply-bottom-reply" @click="replyInput(2,content)">回复</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--展开/收起过多的评论-->
        <div v-if="news.length>5" class="if-show-news">
          <div v-if="ifShowNews" @click="showMoreNews" class="if-show-news-tips">展开剩余评论></div>
          <div v-else @click="showMoreNews" class="if-show-news-tips">收起过多评论<</div>
        </div>
      </div>
    </scroll>

    <all-news-bottom-area
      class="all-news-bottom-area"
      :content-message="contentMessage"
      :house-id="houseId"
      @areaHidden="areaHidden()"
      @getNewsAgain="getNewsAgain()"
    />
  </div>
</template>

<script>
  import AllNewsNavBar from './childComponents/AllNewsNavBar'
  import AllNewsBottomArea from './childComponents/AllNewsBottomArea'

  import Scroll from 'components/common/scroll/Scroll'

  import { getNews, postNewsComment, postReplyComment } from "network/news";

  export default {
    name: "AllNews",
    components: {
      AllNewsNavBar,
      AllNewsBottomArea,
      Scroll
    },
    data() {
      return {
        houseId: 0,  // 要评论的房子id
        news: [],  // 评论数组
        ifShowNews: true,  // 控制过多的评论的收起与展开
        contentMessage: {  // 回复的对象体
          witchToReply: 0,  // 0:默认,1:对评论,2:对回复
          target: {}  // 回复的目标对象
        }
      }
    },
    mounted() {
      // 挂在后请求评论列表，接收房源id的传参
      this.news.push(...this.$route.query.news)
      this.houseId = this.$route.query.houseId
    },
    methods: {
      /* 展开/收起过多评论 */
      showMoreNews() {
        setTimeout(() => {
          this.ifShowNews = !this.ifShowNews
        }, 300)
      },
      /* 展开回复输入框--对人回复 */
      replyInput(witchToReply, target) {
        this.contentMessage.witchToReply = parseInt(witchToReply)
        this.contentMessage.target = target
      },
      // 收起输入文本域
      areaHidden() {
        this.contentMessage.witchToReply = 0
        this.contentMessage.target = {}
      },
      // 再次获取评论并刷新
      getNewsAgain() {
        getNews(this.houseId).then(res => {
          this.news = []
          this.news.push(...res.data)
        })
      }
    }
  }
</script>

<style scoped>
  #all-news {
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }
  .nav-bar {
    background-color: white;
    position: relative;
    z-index: 9;
    border-bottom: 1px solid #eee;
  }
  .content {
    height: calc(100% - 44px - 49px);
    background-color: white;
  }

  /* 控制评论收起/展开 */
  .if-show-news {
    height: 40px;
    margin: 5px 0 10px;
    border-top: 1px solid #eee;
  }
  .if-show-news-tips {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: firebrick;
  }

  /* 评论部分 */
  .detail-news-item {
    padding: 5px 4%;
    background-color: white;
  }
  .ul-message-div {
    padding-top: 10px;
  }
  .cut {
    border-top: 1px solid #eee;
  }
  .message-top {
    display: flex;
    align-items: center;
  }
  /*.message-top-picture {*/
    /*background-color: #169BD5;*/
    /*color: white;*/
    /*border-radius: 50%;*/
    /*width: 35px;*/
    /*height: 35px;*/
    /*text-align: center;*/
    /*line-height: 35px;*/
  /*}*/
  .message-top-picture {
    /*background-color: #169BD5;*/
    border-radius: 50%;
    width: 35px;
    height: 35px;
  }
  .message-top-name-main {
    height: 35px;
    width: calc(100% - 45px);
    margin-left: 10px;
    line-height: 35px;
    color: #015478;
    background-color: #f7f7f7;
  }
  .message-middle {
    margin: 10px 0 10px 45px;
    width: calc(100% - 45px);
    font-size: 14px;
  }
  .message-bottom {
    margin-left: 45px;
    width: calc(100% - 45px);
    display: flex;
    align-items: center;
  }
  .message-bottom-time {
    color: silver;
    font-size: 13px;
  }
  .message-bottom-reply {
    color: #027DB4;
    padding-left: 10px;
    font-size: 14px;
  }

  /* 消息中的回复部分 */
  .ul-reply {
    margin-top: 5px;
    margin-left: 45px;
    background-color: #f7f7f7;
    padding: 0 3%;
  }
  .ul-reply-div {
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  .reply-top {
    color: #027DB4;
    height: 30px;
    line-height: 30px;
    font-size: 16px
  }
  .reply-middle {
    margin: 5px 0 10px;
    font-size: 14px;
    word-break: break-all;
    line-height: 20px;
  }
  .reply-middle-left-target {
    color: #027DB4;
    margin-left: 5px;
  }
  .reply-bottom {
    display: flex;
    align-items: center;
  }
  .reply-bottom-time {
    color: silver;
    font-size: 13px;
  }
  .reply-bottom-reply {
    color: #027DB4;
    padding-left: 10px;
    font-size: 14px;
  }

  /* 底部按钮*/
  .all-news-bottom-area {
    height: 49px;
    width: 100vw;
    position: relative;
    background-color: white;
    z-index: 30;
  }
</style>
