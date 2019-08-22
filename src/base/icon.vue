

<script type="text/ecmascript-6">
import { toRem } from "@/utils"
export default {
  name: "Icon",
  props: {
    size: {
      type: Number,
      default: 16
    },
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ""
    },
    backdrop: {
      type: Boolean,
      default: false
    }
  },
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
  },
  render() {
    const Icon = (
      <i
        onClick={this.onClick}
        class={`iconfont icon-component ${this.getIconCls()}`}
        style={this.getIconStyle()}
      />
    )
    if (this.backdrop) {
      const backDropSizeRatio = 1.56
      const backDropSize = toRem(backDropSizeRatio * this.size)
      return (
        <span
          style={{ width: backDropSize, height: backDropSize }}
          class="backdrop"
        >
          {Icon}
        </span>
      )
    }
    return Icon
  }
}
</script>

<style lang="scss" scoped>
.backdrop {
  display: inline-block;
  @include flex-center;
  border-radius: 50%;

  &:hover {
    background: var(--round-hover-bgcolor);
  }
}

.icon-component {
  cursor: pointer;
}

.icon-color {
  // 通过prop传入这几个字段
  // 可以使用默认的几个颜色
  &-theme {
    color: $theme-color;
  }
  &-white {
    color: $white;
  }
  &-shallow {
    color: var(--font-color-shallow-grey);
  }
}
</style>
