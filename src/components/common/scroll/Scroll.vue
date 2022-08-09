<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      /* 通过ref来获取元素对象，避免重名问题*/
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')

          setTimeout(() => {
            this.scroll.finishPullUp()
          }, 500)
        })
      }
    },
    methods: {
      /* 参数加上=号，可以在没有传值的情况下=设定的默认值*/
      scrollTo(x, y, delay = 500) {
        /* 点击后回到顶部,参数x轴、y轴、返回时间ms*/
        /* 使用逻辑与的方法来进一层保证函数的正常执行，当左方未执行，右方不会执行*/
        /* 该写法意味着，当scroll未实例化前都不会执行包含的函数*/
        this.scroll && this.scroll.scrollTo(x, y, delay)
      },
      refresh() {
        /* 实时刷新BScroll的可滚动高度*/
        /*console.log('---')*/
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        /* 逻辑比对符，判断scroll对象是否存在，若是则返回y轴，若否则返回0*/
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
