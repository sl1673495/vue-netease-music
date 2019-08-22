<template>
  <div class="layout">
    <LayoutHeader />
    <div class="layout-body">
      <div
        class="layout-menu"
        v-show="isMenuShow"
      >
        <LayoutMenu />
      </div>
      <div
        class="content"
        id="page-content"
      >
        <router-view :class="routerViewCls" />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LayoutHeader from "./header"
import LayoutMenu from "./menu"
import { layoutCenterNames } from "@/router"
import { mapState } from "@/store/helper/music"

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
      return layoutCenterNames.find(name => name === this.$route.name)
        ? "router-view-center"
        : ""
    },
    ...mapState(["isMenuShow"])
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
      min-width: $layout-content-min-width;
      margin-bottom: $mini-player-height;

      .router-view-center {
        max-width: $center-content-max-width;
        margin: auto;
      }
    }
  }
}
</style>
