<template>
  <LeaveHide
    @clickOutside="setPlaylistShow(false)"
    :show="isPlaylistShow"
    :reserveDoms="reserveDoms"
  >
    <div
      ref="playlist"
      v-show="isPlaylistShow"
      class="playlist"
    >
      <Tabs
        v-model="activeTab"
        :tabs="tabs"
        align="center"
      />
      <div class="header">
        <p class="total">总共{{dataSource.length}}首</p>
        <div
          class="remove"
          v-if="dataSource.length"
          @click="clear"
        >
          <Icon type="remove" />
          <span class="text">清空</span>
        </div>
      </div>
      <template>
        <div
          v-if="dataSource.length"
          class="song-table-wrap"
        >
          <SongTable
            :songs="dataSource"
            :hideColumns="['index', 'img', 'albumName']"
            :showPromptOnPlay="false"
          />
        </div>
        <div
          class="empty"
          v-else
        >
          你还没有添加任何歌曲
        </div>
      </template>
    </div>
  </LeaveHide>

</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations, mapActions } from 'vuex'
import LeaveHide from '@/base/leave-hide'
import SongTable from './song-table'
export default {
  mounted() {
    // 点击需要保留播放器的dom
    this.reserveDoms = [
      document.getElementById('mini-player'),
    ]
  },
  data() {
    this.tabs = [{
      title: '播放列表',
    }, {
      title: '历史记录'
    }]
    this.LIST_TAB = 0
    this.HISTORY_TAB = 1

    return {
      activeTab: this.LIST_TAB,
      reserveDoms: null,
    }
  },
  methods: {
    clear() {
      if (this.isPlaylist) {
        this.setPlaylist({
          data: [],
          showPrompt: false
        })
        this.clearCurrentSong()
      } else {
        this.clearHistory()
      }
    },
    ...mapMutations(['setPlaylistShow', 'setPlaylist']),
    ...mapActions(['clearCurrentSong', 'clearHistory'])
  },
  computed: {
    dataSource() {
      return this.isPlaylist ? this.playlist : this.playHistory
    },
    isPlaylist() {
      return this.activeTab === this.LIST_TAB
    },
    ...mapState(['isPlaylistShow', 'playlist', 'playHistory'])
  },
  components: {
    SongTable,
    LeaveHide,
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/element-overwrite.scss";

.playlist {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  bottom: $mini-player-height;
  display: flex;
  flex-direction: column;
  background: var(--playlist-bgcolor);
  z-index: $playlist-z-index;
  @include box-shadow;
  @include el-table-theme(var(--playlist-bgcolor));

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin: 0 20px;
    border-bottom: 1px solid var(--border);

    .total {
      font-size: $font-size-sm;
    }

    .remove {
      @include flex-center;
      cursor: pointer;
      font-size: $font-size-sm;

      .text {
        display: inline-block;
        margin-left: 4px;
      }
    }
  }

  .song-table-wrap {
    flex: 1;
    overflow-y: auto;
  }

  .empty {
    @include flex-center();
    flex: 1;
  }
}
</style>
