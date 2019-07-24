<template>
  <div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import { hasParent } from '@/utils/dom'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    reserveDoms: {
      type: Array
    }
  },
  methods: {
    clickEvent(e) {
      const triggerElement = e.target
      // 触发点击事件的dom是否是playlist的子节点
      const firstChildElm = this.$slots.default[0].elm
      if (!hasParent(
        triggerElement,
        this.reserveDoms
          ? this.reserveDoms.concat(firstChildElm)
          : firstChildElm
      )) {
        this.$emit('clickOutside')
      }
    },
    bindClick() {
      document.addEventListener('mousedown', this.clickEvent)
    },
    removeClick() {
      document.removeEventListener('mousedown', this.clickEvent)
    },
  },
  watch: {
    show(newShow) {
      setTimeout(() => {
        if (newShow) {
          this.bindClick()
        } else {
          this.removeClick()
        }
      }, 0);
    }
  },
  beforeDestroy() {
    this.removeClick()
  },
}
</script>

<style scoped>
</style>
