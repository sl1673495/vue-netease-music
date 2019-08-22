<template>
  <ul
    :class="{[align]: true}"
    class="tab-wrap"
  >
    <template v-if="isRouteMode">
      <router-link
        :active-class="`${ROUTE_ACTIVE_CLS} ${activeItemClass}`"
        :key="index"
        :style="getItemStyle(tab, index)"
        :to="tab.to"
        class="tab-item"
        ref="routerLinks"
        tag="li"
        v-for="(tab, index) in normalizedTabs"
      >
        <span class="title">{{tab.title}}</span>
      </router-link>
    </template>
    <template v-else>
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
    </template>
  </ul>
</template>

<script type="text/ecmascript-6">
import { isDef } from "@/utils"

const ACTIVE_PROP = "active"
const ACTIVE_CHANGE = "tabChange"
const ROUTE_ACTIVE_CLS = "active"

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
    // 不传的话对应大号字体 高亮加粗
    // small对应小号字体 高亮红色
    // split对应小号字体 分割线分隔 高亮背景色变灰文字变红
    type: {
      type: String
    }
  },
  model: {
    prop: ACTIVE_PROP,
    event: ACTIVE_CHANGE
  },
  created() {
    this.ROUTE_ACTIVE_CLS = ROUTE_ACTIVE_CLS
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
      // 路由模式
      if (this.isRouteMode) {
        const {
          resolved: { path: resolvedPath }
        } = this.$router.resolve(tab.to)
        return resolvedPath === this.$route.path
      } else {
        return index === this[ACTIVE_PROP]
      }
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
      return this.tabs.length && isDef(this.tabs[0].to)
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

    &.split {
      font-size: $font-size-sm;
      padding: 4px 12px;
      margin: 0 16px;
      border-radius: 999em;

      &.active {
        color: $theme-color;
        background: var(--shallow-theme-bgcolor);
      }

      &:not(:last-child) {
        &::after {
          position: relative;
          left: 28px;
          width: 1px;
          height: 100%;
          background: var(--border);
          display: inline-block;
          vertical-align: middle;
          content: " ";
        }

        .title {
          vertical-align: middle;
        }
      }
    }

    &:hover {
      color: var(--tab-item-hover-color);
    }
  }
}
</style>
