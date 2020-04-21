<template>
  <div class="wrap" @click="onClickCard">
    <div class="top-playlist-card">
      <div class="img-wrap">
        <img v-lazy="$utils.genImgUrl(img, 280)" />
      </div>
      <div class="content">
        <div class="tag-wrap">
          <span>精品歌单</span>
        </div>
        <p class="name">{{ name }}</p>
        <p class="desc">{{ desc }}</p>
      </div>
    </div>
    <div class="background" :style="{ backgroundImage: `url(${img})` }"></div>
    <div class="background-mask"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ["id", "img", "name", "desc"],
  methods: {
    onClickCard() {
      this.$router.push(`/playlist/${this.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;

  .top-playlist-card {
    position: relative;
    z-index: 1;
    display: flex;
    padding: 16px;

    .img-wrap {
      @include img-wrap(140px);
      margin-right: 8px;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .tag-wrap {
        align-self: flex-start;
        padding: 4px 16px;
        margin-bottom: 16px;
        color: $gold;
        border: 1px solid currentColor;
        border-radius: 4px;
      }

      .name {
        margin-bottom: 8px;
        font-size: $font-size-lg;
        color: $white;
      }

      .desc {
        @include text-ellipsis-multi(5);
        font-size: $font-size-sm;
        color: $font-color-transparent;
      }
    }
  }

  .background {
    @include abs-stretch;
    filter: blur(16px);
    z-index: 0;
  }

  .background-mask {
    @include abs-stretch;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
}
</style>
