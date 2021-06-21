<template>
  <div class="video-player" ref="player"></div>
</template>

<script type="text/ecmascript-6">
import Player from "xgplayer";
import { toRem } from "@/utils";

export default {
  name: "VideoPlayer",
  props: ["url", "poster"],
  mounted() {
    this.initPlayer();
    this.transferRem();
  },
  methods: {
    initPlayer() {
      if (!this.url) return;
      this.player = new Player({
        el: this.$refs.player,
        url: this.url,
        poster: this.poster,
        videoInit: true,
        lang: "zh-cn",
        width: "100%",
      });
    },
    transferRem() {
      this.player.on("ready", () => {
        const videoWrapper = this.$refs.player;
        const height = videoWrapper.style.height;
        const remHeight = toRem(Number(height.replace("px", "")));
        videoWrapper.style.height = remHeight;
      });
    },
  },
  watch: {
    url(url, oldUrl) {
      if (url && url !== oldUrl) {
        if (!this.player) {
          this.initPlayer();
        } else {
          this.player.src = url;
          this.player.reload();
        }
      }
    },
  },
};
</script>

<style>
.xgplayer-error {
  display: none;
}
</style>