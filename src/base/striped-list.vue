<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "StripedList",
  props: {
    source: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.mixinStriped()
  },
  methods: {
    mixinStriped() {
      if (this.$slots.default && this.$slots.default.length) {
        this.$nextTick(() => {
          this.$slots.default.forEach((vnode, index) => {
            const { elm } = vnode
            const cls = index % 2 === 0 ? "stripe-deep" : "stripe-shallow"
            elm.classList.add(cls)
          })
        })
      }
    }
  },
  watch: {
    source: {
      handler() {
        this.mixinStriped()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
.stripe-row:hover {
  background: #2e2e2e;
}

.stripe-shallow {
  background: #2e2e2e;
}

.stripe-deep {
  background: var(--body-bgcolor);
}
</style>