<template>
  <div
    class="header"
    v-if="playlist.id"
  >
    <div class="img-wrap">
      <img :src="$utils.genImgUrl(playlist.coverImgUrl, 400)" />
    </div>
    <div class="content">
      <div class="title-wrap">
        <p class="title">{{playlist.name}}</p>
      </div>
      <div class="creator-wrap">
        <img
          class="avatar"
          :src="playlist.creator.avatarUrl"
        />
        <p class="creator">{{playlist.creator.nickname}}</p>
        <p class="create-time">
          {{playlist.createTime}}创建
        </p>
      </div>
      <div class="action-wrap"></div>
      <div class="desc-wrap">
        <p
          class="desc"
          v-if="tagsText"
        >
          <span class="label">
            标签:
          </span>
          <span>
            {{tagsText}}
          </span>
        </p>
        <p
          class="desc"
          v-if="playlist.description"
        >
          <span class="label">
            简介:
          </span>
          <span>
            {{playlist.description}}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    tagsText() {
      return this.playlist.tags.join("/")
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 36px;

  .img-wrap {
    width: 200px;
    height: 200px;
    margin-right: 24px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    .title-wrap {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      .title {
        font-size: $font-size-lg;
        color: var(--font-color-white);
      }
    }

    .creator-wrap {
      display: flex;
      align-items: center;
      margin-bottom: 18px;

      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;
      }

      .creator {
        margin-right: 8px;
      }

      .create-time {
        font-size: $font-size-sm;
      }
    }

    .desc {
      margin-bottom: 8px;

      .label {
        display: inline-block;
        margin-right: 8px;
      }
    }
  }
}
</style>