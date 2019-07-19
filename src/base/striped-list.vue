<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.mixinStriped();
  },
  methods: {
    mixinStriped() {
      if (this.$slots.default && this.$slots.default.length) {
        this.$nextTick(() => {
          this.$slots.default.forEach((vnode, index) => {
            const { elm } = vnode;
            const cls = index % 2 === 0 ? "stripe-deep" : "stripe-shallow";
            elm.classList.add(cls);
          });
        });
      }
    }
  },
  watch: {
    source: {
      handler() {
        this.mixinStriped();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.stripe-shallow {
  background: #1a1c20;
}

.stripe-deep {
  background: #16181c;
}
</style>