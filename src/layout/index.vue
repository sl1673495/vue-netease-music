<template>
  <div class="layout">
    <layout-header />
    <div class="layout-body">
      <div
        id="page-content"
        class="content"
      >
        <router-view :class="routerViewCls" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LayoutHeader from "./header"
import { topRoutes } from '@/router'

export default {
  data() {
    return {}
  },
  components: {
    LayoutHeader,
  },
  computed: {
    routerViewCls() {
      return topRoutes.find(({ path }) => path === this.$route.path)
        ? 'router-view-center'
        : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;

  .layout-body {
    display: flex;
    height: calc(100% - #{$header-height});

    .content {
      flex: 1;
      overflow-y: auto;
      margin-bottom: $mini-player-height;
      padding-bottom: 32px;

      .router-view-center {
        max-width: $center-content-width;
        margin: auto;
      }
    }
  }
}
</style>
