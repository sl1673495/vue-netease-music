<template>
  <div
    class="loading"
    v-loading="loading"
    element-loading-text="载入中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="transparent"
  ></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Loading',
  props: ['loading']
}
</script>

<style lang="scss" scoped>
.loading {
  height: 200px;
}
</style>
