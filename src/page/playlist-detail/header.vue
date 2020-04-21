<template>
  <div class="header" v-if="playlist.id">
    <div class="img-wrap">
      <img :src="$utils.genImgUrl(playlist.coverImgUrl, 400)" />
    </div>
    <div class="content">
      <div class="title-wrap">
        <p class="title">{{ playlist.name }}</p>
      </div>
      <div class="creator-wrap">
        <img :src="playlist.creator.avatarUrl" class="avatar" />
        <p class="creator">{{ playlist.creator.nickname }}</p>
        <p class="create-time">
          {{ $utils.formatDate(playlist.createTime, "yyyy-MM-dd") }} 创建
        </p>
      </div>
      <div class="action-wrap">
        <NButton @click="playAll" class="button">
          <Icon class="icon middle" color="white" type="play-round" />
          <span class="middle">播放全部</span>
        </NButton>
      </div>
      <div class="desc-wrap">
        <p class="desc" v-if="tagsText">
          <span>标签：{{ tagsText }}</span>
        </p>
        <p class="desc" v-if="playlist.description">
          <span class="value">简介：{{ playlist.description }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "@/store/helper/music"
export default {
  props: {
    playlist: {
      type: Object,
      default: () => ({}),
    },
    songs: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    playAll() {
      this.startSong(this.songs[0])
      this.setPlaylist(this.songs)
    },
    ...mapMutations(["setPlaylist"]),
    ...mapActions(["startSong"]),
  },
  computed: {
    tagsText() {
      return this.playlist.tags.join("/")
    },
  },
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

    .action-wrap {
      margin-bottom: 18px;

      .button {
        background: #f95043;
        background: linear-gradient(to right, #fa5143, #f44d41, #d53b32);
        color: #fbdfdd;
        border: none;

        .icon {
          margin-right: 4px;
        }

        .middle {
          vertical-align: middle;
        }
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

      .value {
        @include text-ellipsis-multi(3);
      }
    }
  }
}
</style>
