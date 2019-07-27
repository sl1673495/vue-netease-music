<template>
  <div
    ref="scroller"
    class="scroller"
  >
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(ScrollBar)
BScroll.use(MouseWheel)

const defaultOptions = { mouseWheel: true, scrollY: true, scrollbar: true, probeType: 3 }
export default {
  name: 'Scroller',
  props: {
    data: {
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {

  },
  data() {
    return {};
  },
  methods: {
    getScroller() {
      return this.scroller
    },
    refresh() {
      this.scroller.refresh();
    }
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          if (!this.scroller) {
            this.scroller = new BScroll(this.$refs.scroller, Object.assign({}, defaultOptions, this.options));
            this.$emit('init', this.scroller)
          } else {
            this.scroller && this.scroller.refresh();
          }
        })
      },
      immediate: true
    },
  },
  components: {}
};
</script>

<style lang="scss" >
.scroller {
  position: relative;
  overflow: hidden;
  height: 100%;

  .bscroll-indicator {
    border: none !important;
    background: #2b2b2b !important;
  }
}

// .scrollbar {
//   height: 100%;
// }
// .scrollbar-bswrapper {
//   position: relative;
//   height: 100%;
//   padding: 0 10px;
//   border: 1px solid #ccc;
//   overflow: hidden;
// }

// .pullup-list {
//   padding: 0;
// }

// .scrollbar-list-item {
//   padding: 10px 0;
//   list-style: none;
//   border-bottom: 1px solid #ccc;
// }

// .scrollbar-wrapper {
//   padding: 20px;
//   text-align: center;
//   color: #999;
// }
</style>
