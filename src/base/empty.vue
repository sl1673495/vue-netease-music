<template>
  <div class="empty">
    <slot>暂无内容</slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Empty"
}
</script>

<style lang="scss" scoped>
.empty {
  text-align: center;
  margin-top: 100px;
  color: var(--font-color);
}
</style>
