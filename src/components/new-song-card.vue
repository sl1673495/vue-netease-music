<template>
  <div class="new-song-card">
    <div class="order-wrap">
      <span class="order">{{order}}</span>
    </div>
    <div class="img-wrap">
      <img :src="img" />
    </div>
    <div class="song-content">
      <p class="song-name">{{name}}</p>
      <p class="singer">{{artistsText}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["order", "name", "img", "artists"],
  computed: {
    artistsText() {
      return (this.artists || []).map(({ name }) => name).join("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.new-song-card {
  display: flex;
  padding: 8px;
  font-size: $font-size-sm;

  .order-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    margin-right: 8px;
  }

  .img-wrap {
    width: 36px;
    height: 36px;
    margin-right: 8px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .song-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .song-name {
      color: $font-color-white;
    }

    .singer {
    }
  }
}
</style>