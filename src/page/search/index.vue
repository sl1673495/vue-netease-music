<template>
  <div class="search-detail">
    <div
      class="header"
      ref="header"
    >
      <span class="keywords">{{keywords}}</span>
      <span class="found">找到{{songCount}}首单曲</span>
    </div>
    <div class="table">
      <SongTable
        :cellClassName="getCellClassName"
        :headerCellClassName="getCellClassName"
        :hideColumns="['index']"
        :highlightText="keywords"
        :renderNameDesc="renderNameDesc"
        :songs="songs"
        :stripe="true"
      />
    </div>
    <Pagination
      :current-page.sync="currentPage"
      :page-size="LIMIT"
      :total="songCount"
      @current-change="getSearch"
      class="pagination"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import { getSearch } from '@/api/search'
import SongTable from '@/components/song-table'
import { createSong, getPageOffset } from '@/utils'

const LIMIT = 30
export default {
  props: ['keywords'],
  created() {
    this.LIMIT = LIMIT
    this.getSearch()
  },
  data() {
    return {
      songs: [],
      songCount: 0,
      currentPage: 1
    }
  },
  methods: {
    async getSearch() {
      const { result: { songs, songCount } } = await getSearch({
        keywords: this.keywords,
        limit: LIMIT,
        offset: getPageOffset(this.currentPage, LIMIT)
      })
      this.songs = songs.map((song => {
        const { id, name, alias, artists, duration, album } = song
        return createSong({
          id,
          name,
          alias,
          artists,
          duration,
          albumName: album.name,
          albumId: album.id
        })
      }))
      this.songCount = songCount
      this.$nextTick(() => {
        this.$refs.header.scrollIntoView({ behavior: "smooth" })
      })
    },
    getCellClassName({ columnIndex }) {
      if (columnIndex === 0) {
        return 'table-space'
      }
    },
    renderNameDesc(scope) {
      const { alias } = scope.row
      return alias.map(desc => (
        <p class="name-desc">
          {desc}
        </p>
      ))
    }
  },
  watch: {
    keywords: 'getSearch'
  },
  components: {
    SongTable
  }
}
</script>

<style lang="scss" scoped>
.search-detail {
  .header {
    padding: 20px 32px;

    .keywords {
      display: inline-block;
      margin-right: 4px;
      font-size: $font-size-title-lg;
      font-weight: $font-weight-bold;
    }

    .found {
      font-size: $font-size-sm;
      color: var(--font-color-grey-shallow);
      letter-spacing: 2px;
    }
  }

  .table {
    /deep/.table-space {
      padding-left: 24px !important;
    }

    .name-desc {
      margin-top: 8px;
      color: var(--font-color-grey-shallow);
      @include text-ellipsis;
    }
  }

  .pagination {
    margin-top: 16px;
    text-align: right;
  }
}
</style>
