import { request1 } from "./request";

export function postNewsComment(newsContent) {
  return request1({
    url: '/api/news/new-comment',
    method: 'post',
    params: {
      myId: newsContent.myId,
      houseId: newsContent.houseId
    },
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      detail: newsContent.detail
    },
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'));
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function postReplyComment(replyContent) {
  return request1({
    url: '/api/news/reply',
    method: 'post',
    params: {
      fromId: replyContent.fromId,
      toId: replyContent.toId,
      houseId: replyContent.houseId,
      newsId: replyContent.newsId
    },
    /* 结合下述将data数据转化为formData格式，并非通过query传数据*/
    data: {
      reply: replyContent.reply
    },
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'));
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取房源下的留言列表
export function getNews(houseId) {
  return request1({
    url: '/api/news/list-comment',
    params: {
      houseId: houseId
    }
  })
}

// 获取个人曾留下的留言列表
export function getMyNews(myId) {
  return request1({
    url: '/api/news/myCommentList',
    params: {
      myId: myId
    }
  })
}

// 获取个人曾留下的留言列表
export function getMyReply(myId) {
  return request1({
    url: '/api/news/myReplyList',
    params: {
      myId: myId
    }
  })
}
