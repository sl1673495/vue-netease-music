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
  data() {
    return {}
  },
  components: { Banner, NewPlaylists, NewSongs }
}
</script>

<style lang="scss" scoped>
.discovery {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 36px;

  .discovery-content {
    max-width: $center-content-width;
  }
}
</style>
