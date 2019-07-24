<template>
  <div class="song-list-detail">
    <DetailHeader :playlist="playlist" />
    <SongTable :songs="songs" />
  </div>
</template>

<script>
import DetailHeader from "./header"
import SongTable from "@/components/song-table"
import { createSong } from "@/utils/song"
import { getListDetail } from "@/api/song-list"
import { getSongDetail } from "@/api/song"
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
      const { listId } = this.$route.params
      const { playlist } = await getListDetail({ id: listId })
      this.playlist = playlist
      this.genSonglist(playlist)
    },
    async genSonglist(playlist) {
      const trackIds = playlist.trackIds.map(({ id }) => id)
      const songDetails = await getSongDetail(trackIds)
      const songs = songDetails.songs.map(({ id, name, al, ar, dt }) =>
        createSong({
          id,
          name,
          artists: ar,
          duration: dt,
          albumName: al.name
        })
      )
      this.songs = songs
    }
  },
  components: { DetailHeader, SongTable }
}
</script>

<style lang="scss" scoped>
</style>
