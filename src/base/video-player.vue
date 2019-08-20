<template>
  <div
    class="player"
    ref="player"
  ></div>
</template>

<script type="text/ecmascript-6">
import Player from "xgplayer"

export default {
  name: "VideoPlayer",
  props: ["url"],
  mounted() {
    this.initPlayer()
  },
  methods: {
    initPlayer() {
      if (!this.url) return
      this.player = new Player({
        el: this.$refs.player,
        url: this.url,
        videoInit: true,
        lang: "zh-cn",
        width: "100%",
        playbackRate: [0.5, 0.75, 1, 1.5, 2]
      })
    }
  },
  watch: {
    url(url, oldUrl) {
      if (url && url !== oldUrl) {
        if (!this.player) {
          this.initPlayer()
        } else {
          this.player.src = url
          this.player.reload()
        }
      }
    }
  }
}
</script>

<style>
.xgplayer-error {
  display: none;
}
</style>