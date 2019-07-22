<template>
  <div class="mini-player">
    <!-- 歌曲内容 -->
    <div class="song">
      <template v-if="hasCurrentSong">
        <div class="img-wrap">
          <img :src="currentSong.img" />
        </div>
        <div class="content">
          <div class="top">
            <p class="name">{{currentSong.name}}</p>
            <p class="split">-</p>
            <p class="artists">{{currentSong.artistsText}}</p>
          </div>
          <div class="time">
            <span class="played-time">{{formatTime(currentTime)}}</span>
            <span class="split">/</span>
            <span class="total-time">{{formatTime(currentSong.duration / 1000)}}</span>
          </div>
        </div>
      </template>
    </div>
    <!-- 控制台 -->
    <div class="control">
      <Icon
        class="icon"
        type="prev"
        :size="24"
        @click.native="prev"
      />
      <div
        @click="togglePlaying"
        class="play-icon"
      >
        <Icon
          :type="playIcon"
          :size="24"
        />
      </div>

      <Icon
        class="icon"
        type="next"
        :size="24"
        @click.native="next"
      />
    </div>

    <div class="mode">
      <Icon
        class="icon"
        type="playlist"
        :size="18"
        @click.native="togglePlaylistShow"
      />
      <volume @volumeChange="onVolumeChange" />
    </div>
    <div
      v-if="hasCurrentSong"
      class="progress-bar-wrap"
    >
      <ProgressBar
        :percent="playedPercent"
        @percentChange="onProgressChange"
      />
    </div>
    <audio
      ref="audio"
      :src="currentSong.url"
      @play="ready"
      @ended="end"
      @timeupdate="updateTime"
    ></audio>

  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations, mapGetters, mapActions } from "vuex"
import ProgressBar from "@/base/progress-bar"
import volume from '@/base/volume'
import { formatTime } from "@/utils/common"

export default {
  created() {
    this.formatTime = formatTime
  },
  data() {
    return {
      songReady: false,
      currentTime: 0
    }
  },
  methods: {
    togglePlaying() {
      if (!this.currentSong) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    ready() {
      this.songReady = true
    },
    play() {
      if (this.songReady) {
        this.audio.play()
      }
    },
    pause() {
      this.audio.pause()
    },
    updateTime(e) {
      const time = e.target.currentTime
      this.currentTime = time
    },
    prev() {
      if (this.songReady) {
        this.startSong(this.prevSong)
      }
    },
    next() {
      if (this.songReady) {
        this.startSong(this.nextSong)
      }
    },
    end() {
      this.next()
    },
    onProgressChange(percent) {
      this.audio.currentTime = this.currentSong.durationSecond * percent
    },
    onVolumeChange(percent) {
      this.audio.volume = percent
    },
    togglePlaylistShow() {
      this.setPlaylistShow(!this.isPlaylistShow)
    },
    ...mapMutations(["setPlayingState", "setPlaylistShow"]),
    ...mapActions(["startSong"])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        return
      }
      if (oldSong) {
        if (newSong.id === oldSong.id) {
          return
        }
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.play()
      }, 1000)
    },
    playing(newPlaying) {
      this.$nextTick(() => {
        newPlaying ? this.audio.play() : this.audio.pause()
      })
    }
  },
  computed: {
    hasCurrentSong() {
      return !!this.currentSong.id
    },
    playIcon() {
      return this.playing ? "pause" : "play"
    },
    audio() {
      return this.$refs.audio
    },
    // 播放的进度百分比
    playedPercent() {
      const { durationSecond } = this.currentSong
      return Math.min(this.currentTime / durationSecond, 1)
    },
    ...mapState(["currentSong", "playing", "isPlaylistShow"]),
    ...mapGetters(["prevSong", "nextSong"])
  },
  components: {
    ProgressBar, volume
  }
}
</script>

<style lang="scss" scoped>
.mini-player {
  position: relative;
  position: fixed;
  z-index: $mini-player-z-index;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  height: $mini-player-height;
  padding: 8px;
  padding-right: 24px;
  background: $body-bgcolor;

  .song {
    display: flex;

    .img-wrap {
      width: 40px;
      height: 40px;
      margin-right: 8px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .top {
        display: flex;
        align-items: flex-end;

        .name {
          color: $font-color-white;
        }

        .split {
          font-size: $font-size-xs;
          margin: 0 4px;
        }

        .artists {
          font-size: $font-size-xs;
        }
      }

      .time {
        font-size: $font-size-xs;
        color: $font-color-grey;

        .split {
          margin: 0 4px;
        }
      }
    }
  }

  .control {
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    @include flex-center();

    .play-icon {
      @include flex-center();
      width: 45px;
      height: 45px;
      margin: 0 16px;
      border-radius: 50%;
      background: $theme-color;
      cursor: pointer;
    }

    .icon {
      color: $theme-color;
    }
  }

  .mode {
    display: flex;
    align-items: center;
  }

  .progress-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: -14px;
  }
}

.icon {
  color: $font-color;
  cursor: pointer;
}
</style>
