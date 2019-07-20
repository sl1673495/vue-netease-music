<template>
  <div class="layout">
    <layout-header />
    <div class="layout-body">
      <layout-menu />
      <div
        id="page-content"
        class="content"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LayoutHeader from "./header"
import LayoutMenu from "./menu"

export default {
  data() {
    return {}
  },
  components: {
    LayoutHeader,
    LayoutMenu
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
    }
  }
}
</style>
