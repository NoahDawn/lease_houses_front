<template>
    <div class="detail-swiper">
      <Swiper>
        <swiper-item v-for="item in picture">
          <img :src="item" alt="">
        </swiper-item>
      </Swiper>
    </div>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      picture: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 210px;
    overflow: hidden;
  }
  .detail-swiper img {
    height: 210px;
  }
</style>
