<template>
  <div class="playlist-detail">
    <DetailHeader :playlist="playlist" />
    <SongTable
      class="table"
      :songs="songs"
    />
  </div>
</template>

<script>
import DetailHeader from "./header"
import SongTable from "@/components/song-table"
import { createSong } from "@/utils/song"
import { getListDetail } from "@/api/song-list"
import { getSongDetail } from "@/api/song"
const MAX = 500
export default {
  async created() {
    this.init()
    this.$watch('$route.params', this.init)
  },
  data() {
    return {
      playlist: {},
      songs: []
    }
  },
  methods: {
    async init() {
      const { id } = this.$route.params
      const { playlist } = await getListDetail({ id })
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
  components: { DetailHeader, SongTable }
}
</script>

<style lang="scss" scoped>
.playlist-detail {
  width: 100%;

  .table {
    padding-bottom: 36px;
  }
}
</style>
