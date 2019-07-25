<template>
  <div class="playlists">
    <div class="content">
      <div class="playlist-cards">
        <PlaylistCard
          v-for="item in playlists"
          :key="item.id"
          :id="item.id"
          :name="item.name"
          :img="item.coverImgUrl"
        />
      </div>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="onPageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getPlaylists } from '@/api/playlist'
import PlaylistCard from '@/components/playlist-card'
const PAGE_SIZE = 50
export default {
  async created() {
    this.getPlaylists({
      limit: PAGE_SIZE
    })
  },
  data() {
    return {
      playlists: [],
      total: 0,
    }
  },
  methods: {
    async getPlaylists(params) {
      const { playlists, total } = await getPlaylists(params)
      this.playlists = playlists
      this.total = total
    },
    onPageChange(page) {
      this.playlists = []
      this.getPlaylists({
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE
      })
    }
  },
  components: {
    PlaylistCard
  }
}
</script>

<style lang="scss" scoped>
.playlists {
  display: flex;
  justify-content: center;
  padding: 12px;

  .content {
    max-width: $center-content-width;

    .playlist-cards {
      display: flex;
      flex-wrap: wrap;
    }

    .pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
