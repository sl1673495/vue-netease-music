<template>
  <i
    @click="onClick"
    class="iconfont icon-component"
    :class="getIconCls()"
    :style="getIconStyle()"
  />
</template>

<script type="text/ecmascript-6">
import { toRem } from '@/utils'
export default {
  name: "Icon",
  props: ["size", "type", "color"],
  methods: {
    getIconCls() {
      let cls = `icon-${this.type}`
      if (this.color) {
        cls += ` icon-color-${this.color}`
      }
      return cls
    },
    onClick(e) {
      this.$emit("click", e)
    },
    getIconStyle() {
      const chromeMinSize = 12
      // 支持小于12px
      const retStyle = { fontSize: toRem(this.size) }
      if (this.size < chromeMinSize) {
        const ratio = this.size / chromeMinSize
        retStyle.transform = `scale(${ratio})`
      }
      return retStyle
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

.icon-color-white {
  color: $white;
}

.icon-color-shallow {
  color: var(--font-color-shallow-grey);
}
</style>
