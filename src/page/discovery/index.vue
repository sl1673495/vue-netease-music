<template>
  <div class="discovery">
    <div class="discovery-content">
      <Banner />
      <NewSongList />
      <NewSongs />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Banner from "./banner"
import NewSongList from "./new-song-list"
import NewSongs from "./new-songs"
export default {
  data() {
    return {}
  },
  components: { Banner, NewSongList, NewSongs }
}
</script>

<style lang="scss" scoped>
.discovery {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 36px;

  .discovery-content {
    max-width: 1000px;
  }
}
</style>
