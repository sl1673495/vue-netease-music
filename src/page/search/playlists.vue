<template>
  <div class="search-playlists">
    <WithPagination
      :getData="getSearch"
      :getDataParams="searchParams"
      :limit="50"
      :scrollTarget="searchRoot.$refs && searchRoot.$refs.header"
      :total="playlistCount"
      @getDataSuccess="onGetPlaylists"
    >
      <div class="list-wrap">
        <PlaylistCard
          :desc="`播放量：${$utils.formatNumber(item.playCount)}`"
          :id="item.id"
          :img="item.coverImgUrl"
          :key="item.id"
          :name="item.name"
          v-for="item in playlists"
        />
      </div>
    </WithPagination>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSearch } from "@/api"
import PlaylistCard from "@/components/playlist-card"
import WithPagination from "@/components/with-pagination"
const SEARCH_TYPE_PLAYLIST = 1000
export default {
  inject: ["searchRoot"],
  created() {
    this.getSearch = getSearch
  },
  data() {
    return {
      playlists: [],
      playlistCount: 0
    }
  },
  methods: {
    onGetPlaylists({ result: { playlists, playlistCount } }) {
      this.playlists = playlists
      this.playlistCount = playlistCount
      this.searchRoot.onUpdateCount(playlistCount)
    }
  },
  computed: {
    searchParams() {
      return { keywords: this.searchRoot.keywords, type: SEARCH_TYPE_PLAYLIST }
    }
  },
  components: {
    WithPagination,
    PlaylistCard
  }
}
</script>

<style lang="scss" scoped>
.search-playlists {
  max-width: 1000px;
  padding: $page-padding;
  margin: auto;

  .list-wrap {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
