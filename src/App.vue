<template>
  <div id="app">
    <Layout />
    <Player />
    <MiniPlayer v-show="showMiniPlayer"/>
    <Playlist />
    <ShareReader />
  </div>
</template>

<script>
import Layout from "@/layout"
import MiniPlayer from "@/components/mini-player"
import Playlist from "@/components/playlist"
import Player from "@/components/player"
import ShareReader from "@/components/share-reader"
import { mapMutations } from "@/store/helper/music"

export default {
  metaInfo() {
    return {
      title: "欢迎来到sshPlayer"
    }
  },
  components: { Layout, MiniPlayer, Playlist, Player, ShareReader },
  data() {
    return {
      showMiniPlayer: true
    }
  },
  methods: {
		...mapMutations(["setPlayingState"]),
  },
  watch: {
    $route() {
      if(this.$route.name !== 'mv') return this.showMiniPlayer = true
        this.showMiniPlayer = false
        this.setPlayingState(false)
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  background-color: var(--body-bgcolor);
  font-size: $font-size;
}
</style>
