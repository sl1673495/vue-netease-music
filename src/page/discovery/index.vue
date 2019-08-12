<template>
  <div class="discovery">
    <div class="discovery-content">
      <Banner />
      <NewPlaylists />
      <NewSongs />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Banner from "./banner"
import NewPlaylists from "./new-playlists"
import NewSongs from "./new-songs"

export default {
  components: { Banner, NewPlaylists, NewSongs }
}
</script>

<style lang="scss" scoped>
.discovery {
  padding: 0 32px;

  .discovery-content {
    padding-bottom: 36px;
  }
}
</style>
