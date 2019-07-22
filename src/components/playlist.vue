<template>
  <div
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
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import SongTable from './song-table'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['isPlaylistShow', 'playlist'])
  },
  components: {
    SongTable
  }
}
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  bottom: $mini-player-height;
  display: flex;
  flex-direction: column;
  background: $playlist-bgcolor;
  z-index: $playlist-z-index;

  .header {
    padding: 16px 0;
    margin: 0 20px;
    border-bottom: $border;

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
