<template>
  <div class="layout">
    <LayoutHeader />
    <div class="layout-body">
      <div class="layout-menu">
        <LayoutMenu />
      </div>
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
import LayoutMenu from "./menu"
import { topRoutes } from '@/router'

export default {
  data() {
    return {}
  },
  components: {
    LayoutHeader,
    LayoutMenu
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

    .layout-menu {
      // 这个100%已经减去了头部height
      height: calc(100% - #{$mini-player-height});
    }

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
