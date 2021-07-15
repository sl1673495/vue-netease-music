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

<style lang="scss">
    #page-content{
      position: relative;
      .popup-header {
          &.slide-fade-enter-active .content,&.slide-fade-leave-active .content,
          &.slide-fade-enter-active, &.slide-fade-leave-active {
            transition:200ms linear;
          }
          &.slide-fade-enter .content{
            opacity:0;
            transform:translate3d(0,10px,0)
          }
          z-index: 11111111;
          position: absolute;
          background-color: #fff;
          width: 100%;
          top: 0;
          left: 0;
          line-height:100Px ;
          height: 100Px;
          z-index: 1000;
          padding:0 30px;
          box-shadow: 0 1px 0 #ddd;
          font-size: 24px;
      } 
    }
</style>