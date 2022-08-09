<template>
    <div id="information">
      <information-nav-bar/>
      <information-content/>
    </div>
</template>

<script>
  import InformationNavBar from './childComponents/InformationNavBar'
  import InformationContent from './childComponents/InformationContent'

  export default {
    name: "Information",
    components: {
      InformationNavBar,
      InformationContent
    }
  }
</script>

<style scoped>

</style>
