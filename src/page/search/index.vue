<template>
  <div class="search-detail">
    <div class="header">
      <span class="keywords">{{keywords}}</span>
      <span class="found">找到333首单曲</span>
    </div>
    <div class="table">
      <SongTable
        :cell-class-name="getCellClassName"
        :highlightText="keywords"
        :songs="songs"
      />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSearch } from '@/api/search'
import SongTable from '@/components/song-table'
import { createSong } from '@/utils'

export default {
  props: ['keywords'],
  created() {
    this.getSearch()
  },
  data() {
    return {
      songs: []
    }
  },
  methods: {
    async getSearch() {
      const { result: { songs } } = await getSearch(this.keywords)
      this.songs = songs.map((song => {
        const { id, name, artists, duration, album } = song
        return createSong({
          id,
          name,
          artists,
          duration,
          albumName: album.name
        })
      }))
    },
    getCellClassName({ columnIndex }) {
      if (columnIndex === 0) {
        return 'table-space'
      }
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
  }
}
</style>
