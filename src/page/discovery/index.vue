// 发现音乐页面
<template>
  <div class="discovery">
    <div class="discovery-content">
      <Banner />
      <NewPlaylists />
      <NewSongs />
      <NewMvs />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Banner from "./banner"
import NewPlaylists from "./new-playlists"
import NewSongs from "./new-songs"
import NewMvs from "./new-mvs"

export default {
  components: { Banner, NewPlaylists, NewSongs, NewMvs }
}
</script>

<style lang="scss" scoped>
.discovery {
  padding: 18px 32px;
}
</style>
