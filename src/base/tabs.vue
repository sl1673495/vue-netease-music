<template>
  <div
    class="tab-wrap"
    :class="{[align]: true}"
  >
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab-item"
      :class="getActiveCls(tab, index)"
      @click="onChangeTab(tab, index)"
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
    getActiveCls(tab, index) {
      const ACTIVE_CLS = 'active'
      // 路由模式
      if (this.isRouteMode) {
        if (this.$route.path === tab.to) {
          return ACTIVE_CLS
        }
      } else if (index === this[ACTIVE_PROP]) {
        return ACTIVE_CLS
      }
    }
  },
  computed: {
    isRouteMode() {
      return this.tabs.length && !!this.tabs[0].to
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-wrap {
  // padding: 12px;
  display: flex;

  &.center {
    justify-content: center;
  }

  .tab-item {
    padding: 12px;
    color: var(--tab-item-color);
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

    .title {
      font-size: $font-size-medium;
    }
  }
}
</style>
