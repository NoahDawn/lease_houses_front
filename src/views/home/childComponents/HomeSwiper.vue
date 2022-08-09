<template>
    <div>
      <swiper>
        <swiper-item v-for="item of banners">
          <img :src="item.image" alt="" @load="imageLoad">
        </swiper-item>
      </swiper>
    </div>
</template>

<script>
  import { Swiper, SwiperItem } from "components/common/swiper"
  export default {
    name: "HomeSwiper",
    data() {
      return {
        ifEmit: true
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        if (this.ifEmit) {
          this.$emit('swiper')
        }
        this.ifEmit = false
      }
    }
  }
</script>

<style scoped>

</style>
