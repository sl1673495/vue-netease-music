<template>
  <div
    class="tab-wrap"
    :class="{[align]: true}"
  >
    <div
      v-for="(tab, index) in normalizedTabs"
      :key="index"
      class="tab-item"
      :class="getActiveCls(tab, index)"
      @click="onChangeTab(tab, index)"
      :style="getTabItemStyle(tab, index)"
    >
      <span class="title">
        {{tab.title}}
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const ACTIVE_PROP = 'active'
const ACTIVE_CHANGE = 'tabChange'

const typeStyleMap = {
  small: {
    itemStyle: { fontSize: '12px' },
    activeItemStyle: { color: '#d33a31' }
  }
}

export default {
  created() {
    this.ACTIVE_PROP = ACTIVE_PROP
  },
  props: {
    [ACTIVE_PROP]: {
      type: Number,
      default: 0,
    },
    tabs: {
      type: Array,
      default: () => []
    },
    align: {
      type: String,
      default: 'left'
    },
    itemStyle: {
      type: Object,
      default: () => ({})
    },
    activeItemStyle: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
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
    getActiveCls(tab, index) {
      const ACTIVE_CLS = 'active'
      return this.isActive(tab, index) ? ACTIVE_CLS : ''
    },
    getTabItemStyle(tab, index) {
      return Object.assign(
        {},
        (typeStyleMap[this.type] || {}).itemStyle,
        this.itemStyle,
        this.isActive(tab, index)
          ? Object.assign(
            {},
            (typeStyleMap[this.type] || {}).activeItemStyle,
            this.activeItemStyle
          )
          : null
      )
    }
  },
  computed: {
    isRouteMode() {
      return this.tabs.length && !!this.tabs[0].to
    },
    normalizedTabs() {
      return typeof this.tabs[0] === 'string'
        ? this.tabs.map(tab => ({ title: tab }))
        : this.tabs
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-wrap {
  // padding: 12px;
  display: flex;
  flex-wrap: wrap;

  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }

  .tab-item {
    padding: 12px;
    color: var(--tab-item-color);
    font-size: $font-size-medium;
    cursor: pointer;

    &.active {
      color: var(--tab-item-active-color);

      &:hover {
        color: var(--tab-item-active-color);
      }
    }

    &:hover {
      color: var(--tab-item-hover-color);
    }
  }
}
</style>
