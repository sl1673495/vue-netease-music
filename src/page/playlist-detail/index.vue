<template>
  <div class="playlist-detail">
    <DetailHeader
      v-if="playlist.id"
      :songs="songs"
      :playlist="playlist"
    />
    <div class="tabs-wrap">
      <Tabs
        v-model="activeTab"
        type="theme"
        class="tabs"
        :tabs="tabs"
      />
    </div>
    <SongTable
      v-show="activeTab === SONG_IDX"
      class="table"
      :songs="songs"
    />
    <div class="comments">
      <Comments
        v-show="activeTab === COMMENT_IDX"
        type="playlist"
        :id="id"
      />
    </div>
  </div>
</template>

<script>
import DetailHeader from "./header"
import SongTable from "@/components/song-table"
import Comments from '@/components/comments'
import { createSong } from "@/utils/song"
import { getListDetail } from "@/api/song-list"
import { getSongDetail } from "@/api/song"

const MAX = 500
const SONG_IDX = 0
const COMMENT_IDX = 1
export default {
  async created() {
    this.tabs = ['歌曲列表', '评论']
    this.SONG_IDX = SONG_IDX
    this.COMMENT_IDX = COMMENT_IDX
    this.$watch('id', this.init, { immediate: true })
  },
  data() {
    return {
      activeTab: SONG_IDX,
      playlist: {},
      songs: []
    }
  },
  methods: {
    async init() {
      const { playlist } = await getListDetail({ id: this.id })
      this.playlist = playlist
      this.genSonglist(playlist)
    },
    async genSonglist(playlist) {
      const trackIds = playlist.trackIds.map(({ id }) => id)
      const songDetails = await getSongDetail(trackIds.slice(0, MAX))
      const songs = songDetails.songs.map(({ id, name, al, ar, dt }) =>
        createSong({
          id,
          name,
          artists: ar,
          duration: dt,
          albumName: al.name,
          img: al.picUrl
        })
      )
      this.songs = songs
    }
  },
  computed: {
    id() {
      return Number(this.$route.params.id)
    }
  },
  components: { DetailHeader, SongTable, Comments }
}
</script>

<style lang="scss" scoped>
.playlist-detail {
  width: 100%;

  .tabs-wrap {
    margin: 0 24px;

    .tabs {
      border-bottom: 1px solid var(--border);
    }
  }

  .table {
    padding-bottom: 36px;
  }

  .comments {
    padding: 16px 32px;
  }
}
</style>
