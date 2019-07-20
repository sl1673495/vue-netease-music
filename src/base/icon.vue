<template>
  <i
    class="iconfont"
    :class="`icon-${type}`"
    :style="{fontSize: `${size}px`}"
  />
</template>

<script type="text/ecmascript-6">
export default {
  props: ["size", "type"]
}
</script>

<style lang="scss" scoped>
.iconfont {
  color: #fff;
}
</style>
