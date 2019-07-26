<template>
  <div class="song-card">
    <div class="order-wrap">
      <span class="order">0{{order}}</span>
    </div>
    <div class="img-wrap">
      <img :src="$utils.genImgUrl(img, 120)" />
      <PlayIcon class="play-icon" />
    </div>
    <div class="song-content">
      <p class="song-name">{{name}}</p>
      <p class="singer">{{artistsText}}</p>
    </div>
  </div>
</template>

<script>
import PlayIcon from '@/base/play-icon'
export default {
  props: ["order", "name", "img", "artistsText"],
  components: { PlayIcon }
}
</script>

<style lang="scss" scoped>
.song-card {
  display: flex;
  padding: 8px;
  font-size: $font-size-sm;

  .order-wrap {
    @include flex-center();
    width: 30px;
    margin-right: 8px;
  }

  .img-wrap {
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 8px;
    img {
      width: 100%;
      height: 100%;
    }

    .play-icon {
      @include abs-center;
    }
  }

  .song-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .song-name {
      color: var(--font-color-white);
    }
  }
}
</style>