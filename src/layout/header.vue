<template>
  <div class="header">
    <div class="left">
      <div class="buttons">
        <div
          class="mac-button red"
          @click="onClickLogo"
        >
        </div>
        <div
          class="mac-button yellow"
          @click="exitFullscreen"
        >
          <Icon
            type="minus"
            :size="9"
          />
        </div>
        <div
          class="mac-button green"
          @click="fullscreen"
        >
          <Icon
            type="fullscreen"
            :size="9"
          />
        </div>
      </div>
      <!-- 缩起播放器 -->
      <div
        @click="onClickDown"
        v-if="isPlayerShow"
        class="shrink-player"
      >
        <Icon
          :backdrop="true"
          type="down"
        />
      </div>
      <!-- 路由记录器 -->
      <div
        v-show="!isPlayerShow"
        class="history"
      >
        <RoutesHistory />
      </div>
    </div>
    <div class="right">
      <div class="search-wrap">
        <Search />
      </div>
      <Theme />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Theme from "@/components/theme"
import Search from "@/components/search"
import RoutesHistory from "@/components/routes-history"
import { mapState, mapMutations } from "@/store/helper/music"
import { requestFullScreen, exitFullscreen, isFullscreen } from '@/utils'

export default {
  methods: {
    onClickLogo() {
      this.$router.push("/discovery")
    },
    onClickDown() {
      this.setPlayerShow(false)
    },
    fullscreen() {
      requestFullScreen(document.documentElement)
    },
    exitFullscreen() {
      if (isFullscreen()) {
        exitFullscreen()
      }
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen
    },
    ...mapMutations(["setPlayerShow"])
  },
  computed: {
    ...mapState(["isPlayerShow"])
  },
  components: { Theme, Search, RoutesHistory }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: $header-height;
  background-color: var(--header-bgcolor);
  padding-right: 36px;

  .left {
    padding: 14px 14px 0 8px;
    display: flex;

    .font-weight {
      white-space: nowrap;
    }

    .buttons {
      display: flex;

      &:hover {
        .mac-button > i {
          opacity: 1;
        }
      }
      .mac-button {
        @include round(12px);
        @include flex-center;
        margin-right: 8px;
        cursor: pointer;

        &.red {
          background: #ed655a;
        }

        &.green {
          background: #72be47;
        }

        &.yellow {
          background: #e0c04c;
        }

        i {
          opacity: 0;
          transition: opacity 0.3s;
          color: $black;
          font-weight: $font-weight-bold;
        }
      }
    }

    .shrink-player {
      position: relative;
      top: -6px;
      margin-left: 16px;
    }

    .history {
      margin-left: 65px;
    }

    .actions {
      margin-left: 70px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .search-wrap {
      margin-right: 16px;
    }
  }
}
</style>
