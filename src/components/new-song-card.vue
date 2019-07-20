<template>
  <div class="new-song-card">
    <div class="order-wrap">
      <span class="order">0{{order}}</span>
    </div>
    <div class="img-wrap">
      <img :src="img" />
      <div class="play-icon-wrap">
        <Icon class="play-icon"
              type="play" />
      </div>
    </div>
    <div class="song-content">
      <p class="song-name">{{name}}</p>
      <p class="singer">{{artistsText}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order", "name", "img", "artistsText"]
};
</script>

<style lang="scss" scoped>
.new-song-card {
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

    .play-icon-wrap {
      @include flex-center();
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.5);

      .play-icon {
        color: $theme-color;
      }
    }
  }

  .song-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .song-name {
      color: $font-color-white;
    }
  }
}
</style>