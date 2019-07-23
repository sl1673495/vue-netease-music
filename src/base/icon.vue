<template>
  <i
    class="iconfont icon-component"
    :class="getIconCls()"
    :style="{fontSize: `${size}px`}"
  />
</template>

<script type="text/ecmascript-6">
export default {
  props: ["size", "type", "color"],
  methods: {
    getIconCls() {
      let cls = `icon-${this.type}`
      if (this.color) {
        cls += ` icon-color-${this.color}`
      }
      return cls
    }
  }
}
</script>

<style lang="scss">
.icon-component {
  color: var(--font-color-white);
  cursor: pointer;
}

.icon-color-theme {
  color: $theme-color;
}
</style>
