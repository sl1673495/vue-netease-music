<template>
  <div
    class="playlists"
    v-if="playlists.length"
  >
    <div
      v-if="topPlaylist.id"
      class="top-play-list-card"
    >
      <TopPlaylistCard
        :id="topPlaylist.id"
        :name="topPlaylist.name"
        :img="topPlaylist.coverImgUrl"
        :desc="topPlaylist.description"
      />
    </div>
    <div class="tabs">
      <Tabs
        v-model="activeTabIndex"
        :tabs="tabs"
        type="small"
        align="right"
        @tabChange="onTabChange"
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
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :page-size="PAGE_SIZE"
        :total="total"
        :current-page.sync="currentPage"
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
    this.PAGE_SIZE = PAGE_SIZE
    this.tabs = ['全部', '欧美', '华语', '流行', '说唱', '摇滚', '民谣', '电子', '轻音乐', '影视原声', 'ACG', '怀旧', '治愈', '旅行']
    this.onPageChange(1)
  },
  data() {
    return {
      activeTabIndex: 0,
      playlists: [],
      currentPage: 0,
      total: 0,
      topPlaylist: {},
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
      this.currentPage = page
      this.playlists = []
      this.getPlaylists({
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        cat: this.tabs[this.activeTabIndex]
      })
      this.getTopPlaylists({
        limit: 1,
        cat: this.tabs[this.activeTabIndex]
      })
    },
    onTabChange() {
      this.onPageChange(1)
    }
  },
  components: {
    TopPlaylistCard, PlaylistCard
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
    margin-bottom: 36px;
  }
}
</style>
