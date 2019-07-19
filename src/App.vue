<template>
  <div id="app">
    <layout />
  </div>
</template>

<script>
import Layout from '@/layout'
export default {
  components: { Layout }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  background-color: $body-bgcolor;
  color: $font-color;
  font-size: $font-size;
}
</style>
