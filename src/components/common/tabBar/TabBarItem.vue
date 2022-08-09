<template>
    <div class="tab-bar-item" :class="{'active': isActive}" @click="itemClick()">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="{activeColorStyle}"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      props: {
        // 接受从点击item传来的路由
        link: String,
        activeColor: {
          type: String,
          default: 'gray'
        }
      },
      computed: {
        // 选中样式
        isActive() {
          // indexOf(x)函数作用：比对选中对象是否包含x，若是返回1，若否返回-1
          // 下述逻辑，根据indexOf函数返回值比对-1
          //    --若等则表示该路由不包含x，为不活跃，返回false
          //    --若不等则表示该路由包含x，为活跃，返回true
          // '/home' -> item1('/home') = true
          // '/sort' -> item1('/sort') = false
          // '/cart' -> item1('/cart') = false
          // '/profile' -> item1('/profile') = false

          // 此处获取当前活跃路由的path来比对当前传过来的link
          return this.$route.path.indexOf(this.link) !== -1
        },
        // 动态决定选中后的字体颜色
        activeColorStyle() {
          // 判断当前是否是活跃，若是则返回传参的颜色对象，若否则返回空对象
          return this.isActive ? {color: this.activeColor} : {}
        }
      },
      methods: {
        itemClick() {
          this.$router.replace(this.link)
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 11px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 4px;
    margin-bottom: 2px;
    /*该元素放置在父元素的中部*/
    vertical-align: middle;
  }
  .active {
    font-weight: bold;
    background-color: white;
  }
</style>
