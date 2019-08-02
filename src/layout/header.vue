<template>
  <div class="header">
    <div class="left">
      <div
        class="buttons"
        @click="onClickLogo"
      >
        <div class="mac-button red">
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
        <Icon type="down" />
      </div>
      <div class="actions">

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
  components: { Theme, Search }
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
      top: -3px;
      margin-left: 16px;
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
