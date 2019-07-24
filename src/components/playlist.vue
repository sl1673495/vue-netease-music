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
      <div class="header">
        <p class="total">总共{{playlist.length}}首</p>
      </div>
      <template>
        <div
          v-if="playlist.length"
          class="song-table-wrap"
        >
          <SongTable
            :songs="playlist"
            :hideColumns="['index', 'albumName']"
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
import { mapState, mapMutations } from 'vuex'
import LeaveHide from '@/base/leave-hide'
import SongTable from './song-table'
export default {
  mounted() {
    // 点击需要保留播放器的dom
    this.reserveDoms = [
      this.$refs.playlist,
      document.getElementById('mini-player'),
      ...document.querySelectorAll('.el-loading-mask')
    ]
  },
  data() {
    return {
      reserveDoms: null
    }
  },
  methods: {
    ...mapMutations(['setPlaylistShow'])
  },
  computed: {
    ...mapState(['isPlaylistShow', 'playlist'])
  },
  components: {
    SongTable,
    LeaveHide
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
    padding: 16px 0;
    margin: 0 20px;
    border-bottom: 1px solid var(--border);

    .total {
      font-size: $font-size-sm;
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
