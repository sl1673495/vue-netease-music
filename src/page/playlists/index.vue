<template>
  <div class="playlists">
    <div
      class="top-play-list-card"
      v-if="topPlaylist.id && playlists.length"
    >
      <TopPlaylistCard
        :id="topPlaylist.id"
        :name="topPlaylist.name"
        :img="topPlaylist.coverImgUrl"
        :desc="topPlaylist.description"
      />
    </div>
    <div class="playlist-cards">
      <PlaylistCard
        v-for="item in playlists"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :img="item.coverImgUrl"
        :desc="`播放量：${$utils.formatNumber(item.playCount)}`"
      />
    </div>
    <div
      class="pagination"
      v-show="playlists.length"
    >
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="onPageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getPlaylists, getTopPlaylists } from '@/api/playlist'
import PlaylistCard from '@/components/playlist-card'
import TopPlaylistCard from '@/components/top-playlist-card'

const PAGE_SIZE = 50
export default {
  async created() {
    this.getPlaylists({
      limit: PAGE_SIZE
    })
    this.getTopPlaylists({
      limit: 1
    })
  },
  data() {
    return {
      playlists: [],
      topPlaylist: {},
      total: 0,
    }
  },
  methods: {
    async getPlaylists(params) {
      const { playlists, total } = await getPlaylists(params)
      this.playlists = playlists
      this.total = total
    },
    async getTopPlaylists(params) {
      const { playlists } = await getTopPlaylists(params)
      this.topPlaylist = playlists[0] || {}
    },
    onPageChange(page) {
      this.playlists = []
      this.getPlaylists({
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE
      })
      this.getTopPlaylists({
        limit: 1,
        before: this.topPlaylist.updateTime
      })
    }
  },
  components: {
    PlaylistCard, TopPlaylistCard
  }
}
</script>

<style lang="scss" scoped>
.playlists {
  padding: 12px;

  .top-play-list-card {
    margin-bottom: 16px;
  }

  .playlist-cards {
    display: flex;
    flex-wrap: wrap;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
