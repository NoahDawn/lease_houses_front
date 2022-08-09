/* 防抖动，将短时间内的多次同一操作的执行时间不断刷新，在延时时间外执行*/
/* 函数逻辑：
*   1.最外层debounce，传入参数，参数1为最终执行的方法，参数2为延迟时间
*   2.设定初值为空的时间对象，返回一个函数，该函数可传入参数
*   3.判断该时间对象是否为空，若否则清除该时间对象，重新计时
*   4.若否则延时执行传入的方法，在某个时间内多次执行该防抖动方法时，timer被不断刷新
*   5.最后一次执行时，timer依然存在值，被消除，但是后续没有防抖动，延时后通过apply执行传入的方法
* */
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    /* 注意：使用延时时，即使没有传入延时时间，也会因为事件循环，将延时内容放在下一次事件循环中执行*/
    /* 例如：打印a，延时打印b（未设定延时事件），打印c，结果为acb，因为b被放置在下一事件循环中*/
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/* 节流，将短时间内的多次同一操作统一在延时后执行一次，只执行一次*/
/* 函数逻辑：
*   1.最外层throttle，传入参数，参数1为最终执行的方法，参数2为延迟时间
*   2.设定初值为空的时间对象，返回一个函数，该函数可传入参数
*   3.判断该时间对象是否为空，空的情况下执行延时操作并给timer复制
*   4.设定时间到后执行传入的func方法，同时timer重置为null，执行下一次节流
* */
export function throttle(func, delay) {
  let timer = null
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, delay)
    }
  }
}


/* 将时间戳转化为自定义样式*/
export function formatDate(date, fmt) {
  // 1.获取年份
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  // 2.获取后续
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

// 时间戳转换（个人自写）
export function dateCodeChange(datetime) {
  // 以2020-12-21T06:40:29.000Z为例，直接取出后时部分为乱码，需要进行格式转换
  var date = new Date(datetime);

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours();
  var minute = date.getMinutes();
  if (month < 10) {
    month = "0" + month
  }
  if (day < 10) {
    day = "0" + day
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
}

// 计算两个日期之间的相差天数，向上取整
export function differDays(dateTimeStart, dateTimeEnd) {
  // 转为时间戳
  let startDate = (new Date(dateTimeStart)).getTime()
  let endDate = (new Date(dateTimeEnd)).getTime()
  // 时间戳计算相差天数
  const time = (endDate - startDate)/(1*24*60*60*1000)

  // 向上取整
  return Math.ceil(time)
}


//日期加天数计算  date：时间戳, days:天数 默认1天
export function addDate(date, days) {
  if (!days) {
    days = 1;
  }
  var date = new Date(date);
  date.setDate(date.getDate() + days);
  return date;
}

















