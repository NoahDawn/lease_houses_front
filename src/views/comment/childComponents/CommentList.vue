<template>
  <!--个人留言列表-->
  <div class="comment-list">
    <div class="content-list-item" v-for="(item,index) in commentList" @click="detail(item.houseId)">
      <!--上半部分信息-->
      <div class="content-list-item-main">
        <!--头标-->
        <div v-if="currentControlIndex===0" class="content-list-item-head-news">留</div>
        <div v-else class="content-list-item-head-reply">回</div>
        <!--内容信息-->
        <div class="content-list-item-ms">
          <div class="content-list-item-ms-top">
            <div class="content-list-item-ms-top-left">
              <a href="#">房源：{{item.houseName}}</a>
            </div>
            <div class="content-list-item-ms-top-right">
              {{item.time}}
            </div>
          </div>
          <div v-if="currentControlIndex===0" class="content-list-item-ms-middle">留言：{{item.detail}}</div>
          <div v-else class="content-list-item-ms-middle">回复：{{item.reply}}</div>
        </div>
      </div>
      <!--回应-->
      <div v-if="currentControlIndex===0" class="content-list-item-reply">当前已有{{item.reply.length}}人对此回复</div>
      <div v-else class="content-list-item-reply">您的回复对象为：{{item.realName}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CommentList",
    props: {
      commentList: {
        type: Array,
        default: []
      },
      currentControlIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      /* 进入详情页*/
      detail(houseId) {
        this.$router.push({
          path: '/detail',
          query: {
            houseid: houseId
          }
        })
      }
    }
  }
</script>

<style scoped>
  /* 有内容时显示的主体区域*/
  .content-list-item {
    background-color: #f7f7f7;
    height: 100px;
    width: 100%;
    margin-top: 10px;
    padding: 0 3%;
    box-shadow: 0 2px 10px rgba(100,100,100,.4);
  }
  .content-list-item-main {
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content-list-item-head-news {
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background-color: #169BD5;
    line-height: 50px;
    text-align: center;
    color: white;
    font-weight: bold;
  }
  .content-list-item-head-reply {
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background-color: darkorange;
    line-height: 50px;
    text-align: center;
    color: white;
    font-weight: bold;
  }
  .content-list-item-ms {
    height: 60px;
    width: calc(100% - 50px);
    padding-left: 3%;
    border-bottom: 1px solid #cccccc;
  }
  .content-list-item-ms-top,.content-list-item-ms-middle {
    height: 30px;
    width: 100%;
    line-height: 30px;
  }
  .content-list-item-ms-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  a {
    font-weight: bold;
    text-decoration: none;
    color: #007aff;
    width: 150px;
    display: block;/*转换成块才能设置宽度，否则失效*/
    word-break: keep-all;/*控制超出范围字体的分割*/
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
    font-size: 17px;
  }
  .content-list-item-ms-top-right {
    color: silver;
    font-size: 13px;
  }
  .content-list-item-ms-middle {
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
    font-size: 15px;
  }
  .content-list-item-reply {
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: silver;
  }
</style>
