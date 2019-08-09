<template>
  <div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import { hasParent } from '@/utils'

export default {
  name: 'Toggle',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    reserveDoms: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    clickEvent(e) {
      const triggerElement = e.target
      // 触发点击事件的dom是否是playlist的子节点
      const firstChildElm = this.$slots.default[0].elm
      const defaultReserveDoms = Array.from(
        document.querySelectorAll('.el-loading-mask, .el-loading-spinner')
      )
      const reserves = defaultReserveDoms.concat(firstChildElm)
      if (!hasParent(
        triggerElement,
        reserves.concat(this.reserveDoms)
      )) {
        this.$emit('update:show', false)
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
