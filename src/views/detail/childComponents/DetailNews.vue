<template>
    <div class="detail-news">
      <div class="title">
        <div class="title-ms">房屋评论</div>
        <div class="more-news" @click="more">更多></div>
      </div>
      <!--当存在留言的时候正常显示留言信息，否则显示暂无评论-->
      <div class="news" v-if="Object.keys(news).length !==0">
        <div v-for="(item,index) in news"
             class="detail-news-item"
             :class="{cut: index>0}"
             v-if="!ifShowNews || index < 3">
          <div class="news-ms">
            <img :src="item.picture" alt="">
            <div class="news-author">{{item.realname}}</div>
            <div class="news-time">{{item.time}}</div>
          </div>
          <div class="news-content">
            <div class="news-detail">{{item.detail}}</div>
          </div>
        </div>
      </div>
      <div v-else class="none">
        <img src="~assets/img/common/none.png" alt="">
        <p>暂无留言，您可点击更多发表个人意见</p>
      </div>

      <img src="~assets/img/detail/security.png" alt="" class="advertisement-security">
    </div>
</template>

<script>
  import { formatDate } from "common/Utils";

  export default {
    name: "DetailNews",
    data() {
      return {
        ifShowNews: true
      }
    },
    props: {
      news: {
        type: Array,
        default() {
          return []
        }
      },
      houseId: 0
    },
    methods: {
      more() {
        // 判断当前是否登录
        if(this.$store.state.loginUserMS.id === 0) {
          this.$toast.show('您尚未登录', 1000, false)
          setTimeout(() => {
            this.$router.replace('/profile')
          }, 1000)
        } else {
          this.$router.push({
            path: '/news',
            query: {
              news: this.news,
              houseId: this.houseId
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .detail-news {
    padding: 20px 3%;
  }
  .title {
    display: flex;
  }
  .title-ms {
    font-weight: bold;
    width: calc(100% - 40px);
    font-size: 20px;
  }
  .more-news {
    font-size: 14px;
    width: 40px;
  }

  /* 评论部分*/
  .news {
    margin-bottom: 20px;
  }
  .detail-news-item {
    padding-top: 10px;
    margin-top: 10px;
  }
  .cut {
    border-top: 2px solid #eee;
  }
  .news-ms{
    display: flex;
    height: 25px;
  }
  .news-ms img {
    width: 20px;
    height: 20px;
  }
  .news-ms div{
    height: 20px;
    line-height: 20px;
  }
  .news-author {
    color: gold;
    font-size: 12px;
    font-weight: bold;
    margin-left: 7px;
    width: 100px;
  }
  .news-time {
    font-size: 10px;
    width: calc(100% - 120px);
    text-align: right;
    padding-right: 10px;
    color: #5c6b77;
  }
  .news-content {
    display: flex;
    height: 20px;
    line-height: 20px;
  }
  .news-detail {
    padding-left: 27px;
    font-size: 14px;
    width: calc(100% - 20px);
    white-space: nowrap;/*内容超宽后禁止换行显示*/
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/*文字超出部分以省略号显示*/
  }

  .none {
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .none img {
    width: 200px;
    height: 200px;
  }

  .advertisement-security {
    width: 100%;
    height: 80px;
    border-radius: 10px;
  }
</style>
