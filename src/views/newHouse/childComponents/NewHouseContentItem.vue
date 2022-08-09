<template>
    <div class="content-item">
      <slot name="left"></slot>
      <slot name="center"></slot>
      <slot name="right">
        <img src="~assets/img/common/right.svg" alt="" @click="chooseLocation">
      </slot>
    </div>

</template>

<script>
  export default {
    name: "NewHouseContentItem",
    props: {
      ifClick: {
        type: Boolean,
        default: false
      },
      link: {
        type: String,
        default: ''
      },
      backLink: {
        type: String,
        default: ''
      }
    },
    methods: {
      chooseLocation() {
        if(this.ifClick) {
          this.$router.push({
            path: this.link,
            query: {
              link: this.backLink
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .content-item {
    margin: 10px 10px 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #eee;
  }
  .content-item img {
    width: 30px;
    height: 30px;
  }
</style>
