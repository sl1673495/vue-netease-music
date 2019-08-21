<template>
  <ul
    :class="{[align]: true}"
    class="tab-wrap"
  >
    <li
      :class="getItemCls(tab, index)"
      :key="index"
      :style="getItemStyle(tab, index)"
      @click="onChangeTab(tab, index)"
      class="tab-item"
      v-for="(tab, index) in normalizedTabs"
    >
      <span class="title">{{tab.title}}</span>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
const ACTIVE_PROP = "active"
const ACTIVE_CHANGE = "tabChange"

export default {
  name: "Tabs",
  props: {
    [ACTIVE_PROP]: {
      type: Number,
      default: 0
    },
    tabs: {
      type: Array,
      default: () => []
    },
    align: {
      type: String,
      default: "left"
    },
    itemStyle: {
      type: Object,
      default: () => ({})
    },
    activeItemStyle: {
      type: Object,
      default: () => ({})
    },
    itemClass: {
      type: String
    },
    activeItemClass: {
      type: String
    },
    type: {
      type: String
    }
  },
  model: {
    prop: ACTIVE_PROP,
    event: ACTIVE_CHANGE
  },
  methods: {
    onChangeTab(tab, index) {
      if (this.isRouteMode) {
        this.$router.push(tab.to)
      } else {
        this.$emit(ACTIVE_CHANGE, index)
      }
    },
    isActive(tab, index) {
      if (
        // 路由模式
        (this.isRouteMode && this.$route.path === tab.to) ||
        // 非路由模式
        (!this.isRouteMode && index === this[ACTIVE_PROP])
      ) {
        return true
      }
      return false
    },
    getItemCls(tab, index) {
      let base = []

      if (this.itemClass) {
        base.push(this.itemClass)
      }
      if (this.type) {
        base.push(this.type)
      }
      if (this.isActive(tab, index)) {
        if (this.activeItemClass) {
          base.push(this.activeItemClass)
        }
        base.push("active")
      }
      return base.join(" ")
    },
    getItemStyle(tab, index) {
      return Object.assign(
        {},
        this.itemStyle,
        this.isActive(tab, index)
          ? Object.assign({}, this.activeItemStyle)
          : null
      )
    }
  },
  computed: {
    isRouteMode() {
      return this.tabs.length && !!this.tabs[0].to
    },
    normalizedTabs() {
      return typeof this.tabs[0] === "string"
        ? this.tabs.map(tab => ({ title: tab }))
        : this.tabs
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-wrap {
  display: flex;

  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }

  .tab-item {
    padding: 12px 0;
    margin: 0 12px;
    color: var(--tab-item-color);
    font-size: $font-size-medium;
    white-space: nowrap;
    cursor: pointer;

    &.active {
      color: var(--tab-item-active-color);

      &:hover {
        color: var(--tab-item-active-color);
      }
    }

    // 对应prop中的type字段
    &.small {
      font-size: $font-size-sm;

      &.active {
        color: $theme-color;
      }
    }

    &.theme {
      font-size: $font-size;

      &.active {
        color: $theme-color;
        border-bottom: 2px solid $theme-color;
        font-weight: $font-weight-bold;
      }
    }

    &:hover {
      color: var(--tab-item-hover-color);
    }
  }
}
</style>
