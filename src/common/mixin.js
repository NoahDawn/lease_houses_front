/* 混入思想，相当于java中类的继承*/
/* 可添加内容与组件相同*/
/* 在引用的组件中，与下述内容同级添加mixins: [mixinTest],*/
/* 引用mixin后并不会覆盖，而是合并*/

import BackTop from 'components/content/backTop/BackTop'
/* backTop混入*/
export const backTop = {
  data() {
    return {
      ifBackTop: false,
      showHeight: 310
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop() {
      /* 通过ref拿到组件对象，执行该组件中定义的方法*/
      /* 点击后回到顶部*/
      this.$refs.Scroll.scrollTo(0, 0, 500)
    },
    ifShowBackTop(position) {
      this.ifBackTop = -position.y >= this.showHeight
    }
  }
}
