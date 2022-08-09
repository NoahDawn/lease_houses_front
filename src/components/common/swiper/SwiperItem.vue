<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
    text-align: center;
  }

  .slide img {
    height: 200px;
    width: 98%;
    border-radius: 5px;
  }
</style>
