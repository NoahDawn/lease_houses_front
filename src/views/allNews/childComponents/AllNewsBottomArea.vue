<template>
  <div class="all-news-bottom-area">
    <!--底部导航按钮-->
    <div class="leaving-message-bottom-bar" :class="{change_position: ifNew}">
      <div v-if="!ifNew" class="leaving-message-button" id="buttonNewMessage" @click="inputNews()">新建评论</div>
      <div v-else class="leaving-message-button" id="buttonPostMessage" @click="sendMessage()">发送</div>
    </div>

    <!--幕布遮盖-->
    <back-mask :if-show="ifShow" @maskHidden="areaHidden()" mask-area="withoutBottom">
      <!--输入框-->
      <div v-if="ifShow" class="leaving-message-textArea" id="textArea" slot="upper">
        <!--输入框隐藏按钮-->
        <div class="leaving-message-textArea-hidden" id="textAreaHidden" @click="areaHidden()">
          <div class="hidden-button"></div>
        </div>
        <!--输入文本域-->
        <div class="leaving-message-textArea-content">
          <textarea name="" id="messageArea" cols="30" rows="10" class="text-area" v-model="areaContent" :placeholder="placeholder"></textarea>
        </div>
      </div>
    </back-mask>
  </div>
</template>

<script>
  import BackMask from 'components/common/backMask/BackMask'

  import { getNews, postNewsComment, postReplyComment } from "network/news";
  export default {
    name: "AllNewsBottomArea",
    components: {
      BackMask
    },
    data() {
      return {
        ifNew: false,  // 控制按钮的切换
        ifShow: false,  // 控制弹出层和幕布的显示
        placeholder: "",  // 文本域提示词
        areaContent: ""  // 文本域输入内容
      }
    },
    props: {
      houseId: 0,
      contentMessage: {  // 回复的对象体
        witchToReply: 0,  // 0:默认,1:对评论,2:对回复
        target: {}  // 回复的目标对象
      }
    },
    watch: {
      // 如果是点击留言中的回复按钮，展开文本域，修改默认提示词
      'contentMessage.witchToReply': function() {
        // 判断是否是展开样式，之后判断是否是点击回复
        if(!this.ifShow && this.contentMessage.witchToReply !== 0) {
          this.inputNews()
          switch (this.contentMessage.witchToReply) {
            case 1:
              // 此处是对评论的提示词
              this.placeholder = "回复" + this.contentMessage.target.realname + "的评论";
              break;
            case 2:
              // 此处是对回复的提示词
              this.placeholder = "回复" + this.contentMessage.target.fromName + "的回复";
              break;
            default: this.placeholder = "请输入您的评论"
          }
        }
      }
    },
    methods: {
      // 文本域及幕布的隐藏
      areaHidden() {
        this.ifShow = false
        this.ifNew = false
        // 隐藏后清空
        this.placeholder = ""
        this.$emit("areaHidden")
      },
      // 打开新建评论文本域
      inputNews() {
        this.placeholder = "请输入您的评论"
        this.ifNew = true
        this.ifShow = true
      },
      // 发送消息，根据contentMessage.witchToReply的值来判断消息的发送对象
      sendMessage() {
        if(!this.areaContent) {
          this.$toast.show('评论内容不能为空', 2000, false)
        } else {
          switch (this.contentMessage.witchToReply) {
            case 0: this.newsLeaveMessage();break;
            case 1: this.replyLeaveMessage(1);break;
            case 2: this.replyLeaveMessage(2);break;
            default:
          }
        }
      },
      // 发送新的评论
      newsLeaveMessage() {
        /* 提交评论的网络请求*/
        let newsPost = {
          myId: this.$store.state.loginUserMS.id,
          houseId: this.houseId,
          detail: this.areaContent
        }
        postNewsComment(newsPost).then(res => {
          if(res.data) {
            /* 清空当前的评论*/
            this.areaContent = ''
            /* 隐藏输入文本域 */
            this.areaHidden()
            /* 传出事件，重新获取当前所有评论并显示*/
            this.$emit("getNewsAgain")
          }
        })
      },
      /* 提交回复内容 */
      replyLeaveMessage(witchToReply) {
        /* 提交回复的网络请求*/
        let replyPost = {}
        if (witchToReply === 1) {
          // 对评论的回复
          replyPost = {
            fromId: this.$store.state.loginUserMS.id,
            toId: this.contentMessage.target.myId,
            houseId: this.houseId,
            reply: this.areaContent,
            newsId: this.contentMessage.target.id,
          }
        } else if (witchToReply === 2) {
          // 对回复的回复
          replyPost = {
            fromId: this.$store.state.loginUserMS.id,
            toId: this.contentMessage.target.fromId,
            houseId: this.houseId,
            reply: this.areaContent,
            newsId: this.contentMessage.target.newsId,
          }
        }
        postReplyComment(replyPost).then(res => {
          if(res.data) {
            /* 清空当前的评论*/
            this.areaContent = ''
            /* 隐藏输入文本域 */
            this.areaHidden()
            /* 传出事件，重新获取当前所有评论并显示*/
            this.$emit("getNewsAgain")
          }
        })
      }
    }
  }
</script>

<style scoped>
  /* 底部导航 */
  .leaving-message-bottom-bar {
    height: 49px;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30;
  }
  .leaving-message-button {
    height: 30px;
    width: 140px;
    background-color: #169BD5;
    color: white;
    border-radius: 10px;
    text-align: center;
    line-height: 30px;
  }
  /* 输入框弹出后修改底部按钮栏的布局 */
  .change_position {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50
  }

  /* 弹出输入框 */
  .leaving-message-textArea {
    position: fixed;
    bottom: 48px;
    height: 300px;
    width: 100vw;
    background-color: white;
    border-radius: 20px 20px 0 0;
    border-top: 1px solid #eee;
    z-index: 50;
  }
  .leaving-message-textArea-hidden {
    height: 35px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .hidden-button {
    height: 15px;
    width: 25%;
    margin-top: 10px;
    border-radius: 30px;
    background-color: silver;
  }
  .leaving-message-textArea-content {
    height: calc(100% - 35px);
    padding: 3%;
  }
  .text-area {
    height: 100%;
    width: 100%;
    padding: 10px 5px;
    border: 1px solid silver;
    border-radius: 5px;
  }
</style>
