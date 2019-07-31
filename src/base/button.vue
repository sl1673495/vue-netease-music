<template>
  <div
    @click="onClick"
    class="n-button"
  >
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'NButton',
  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.n-button {
  display: inline-block;
  padding: 5px 16px;
  border: 1px solid var(--button-border-color);
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background: var(--button-hover-bgcolor);
  }
}
</style>
