<template >
  <transition name="slide">
    <div
      v-if="isPlayerShow"
      class="player"
    >
      <div class="content">
        <div class="song">
          <div class="left">
            <div
              ref="disc"
              class="img-outer-border"
            >
              <div
                ref="discRotate"
                :class="{rotate: playing}"
                class="img-outer"
              >
                <div class="img-wrap">
                  <img :src="$utils.genImgUrl(currentSong.img, 400)" />
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <p class="name">
              {{currentSong.name}}
            </p>
            <div class="desc">
              <div class="desc-item">
                <span class="label">歌手：</span>
                <div class="value">{{currentSong.artistsText}}</div>
              </div>
            </div>
            <div
              class="no-lyric"
              v-if="!rawLyric || nolyric"
            >
              还没有歌词哦~
            </div>
            <Scroller
              v-else
              ref="scroller"
              class="lyric-wrap"
              :data="lyric"
              @init="onInitScroller"
              :options="{disableTouch: true}"
            >

              <div>
                <div
                  :key="index"
                  v-for="(l,index) in lyricWithTranslation"
                  class="lyric-item"
                  :class="getActiveCls(index)"
                  ref="lyric"
                >
                  <p
                    :key="contentIndex"
                    v-for="(content, contentIndex) in l.contents"
                    class="lyric-text"
                  >
                    {{content}}
                  </p>
                </div>
              </div>
            </Scroller>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <Comments
              ref="comments"
              :id="currentSong.id"
            />
          </div>
          <div
            class="right"
            v-if="simiPlaylists.concat(simiSongs).length"
          >
            <Loading
              v-if="simiLoading"
              :loading="simiLoading"
            />
            <div v-else>
              <div
                class="simi-playlists"
                v-if="simiPlaylists.length"
              >
                <p class="title">
                  包含这首歌的歌单
                </p>
                <Card
                  v-for="simiPlaylist in simiPlaylists"
                  :key="simiPlaylist.id"
                  :img="simiPlaylist.coverImgUrl"
                  :name="simiPlaylist.name"
                  @click="onClickPlaylist(simiPlaylist.id)"
                >
                  <template v-slot:desc>
                    <div class="desc">
                      <Icon
                        :size="12"
                        type="play"
                        color="shallow"
                      />
                      <p class="count">{{$utils.formatNumber(simiPlaylist.playCount)}}</p>
                    </div>
                  </template>
                </Card>
              </div>
              <div
                class="simi-songs"
                v-if="simiSongs.length"
              >
                <p class="title">
                  相似歌曲
                </p>
                <Card
                  v-for="simiSong in simiSongs"
                  :key="simiSong.id"
                  :img="simiSong.img"
                  :name="simiSong.name"
                  :desc="simiSong.artistsText"
                  @click="onClickSong(simiSong)"
                >
                  <template v-slot:img-mask>
                    <PlayIcon class="play-icon" />
                  </template>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
import { getLyric, getSimiSongs } from '@/api/song'
import { getSimiPlaylists } from '@/api/playlist'
import lyricParser from '@/utils/lrcparse'
import { prefixStyle } from "@/utils/dom"
import { createSong } from '@/utils/song'

import Comments from '@/components/comments'
import { mapState, mapMutations, mapActions } from 'vuex'

const WHEEL_TYPE = 'wheel'
const SCROLL_TYPE = 'scroll'
const transform = prefixStyle("transform")
export default {
  created() {
    this.lyricScroll = {
      [WHEEL_TYPE]: false,
      [SCROLL_TYPE]: false
    }
    this.lyricTimer = {
      [WHEEL_TYPE]: null,
      [SCROLL_TYPE]: null
    }
  },
  data() {
    return {
      rawLyric: '',
      lyric: [],
      tlyric: [],
      simiLoading: false,
      simiPlaylists: [],
      simiSongs: [],
      nolyric: false
    }
  },
  methods: {
    async updateSong() {
      this.updateLyric()
      this.updateSimi()
    },
    async updateLyric() {
      const lrc = await getLyric(this.currentSong.id)
      const { nolyric } = lrc
      this.nolyric = !!nolyric
      if (!this.nolyric) {
        const { lyric, tlyric } = lyricParser(lrc)
        this.rawLyric = lrc.lrc.lyric
        this.lyric = lyric
        this.tlyric = tlyric
      }

    },
    async updateSimi() {
      this.simiLoading = true
      const [simiPlaylists, simiSongs] = await Promise.all([
        getSimiPlaylists(this.currentSong.id),
        getSimiSongs(this.currentSong.id)
      ]).finally(() => {
        this.simiLoading = false
      })
      this.simiPlaylists = simiPlaylists.playlists
      this.simiSongs = simiSongs.songs.map(song => {
        const { id, name, artists, album: { picUrl }, duration } = song
        return createSong({ id, name, artists, duration, img: picUrl })
      })
    },
    getActiveCls(index) {
      return this.activeLyricIndex === index ? 'active' : ''
    },
    onInitScroller(scoller) {
      const onScrollStart = (type) => {
        this.clearTimer(type)
        this.lyricScroll[type] = true
      }
      const onScrollEnd = (type) => {
        // 滚动结束后两秒 歌词开始自动滚动
        this.clearTimer(type)
        this.lyricTimer[type] = setTimeout(() => {
          this.lyricScroll[type] = false
        }, 2000);
      }
      scoller.on('scrollStart', onScrollStart.bind(null, SCROLL_TYPE))
      scoller.on('mousewheelStart', onScrollStart.bind(null, WHEEL_TYPE))

      scoller.on('scrollEnd', onScrollEnd.bind(null, SCROLL_TYPE))
      scoller.on('mousewheelEnd', onScrollEnd.bind(null, WHEEL_TYPE))
    },
    clearTimer(type) {
      this.lyricTimer[type] && clearTimeout(this.lyricTimer[type])
    },
    /**
     * 计算内层Image的transform，并同步到外层容器
     * @param wrapper
     * @param inner
     */
    syncWrapperTransform(wrapper, inner) {
      if (!this.$refs[wrapper]) {
        return
      }
      let imageWrapper = this.$refs[wrapper]
      let image = this.$refs[inner]
      let wTransform = getComputedStyle(imageWrapper)[transform]
      let iTransform = getComputedStyle(image)[transform]
      imageWrapper.style[transform] = wTransform === 'none' ? iTransform : iTransform.concat(' ', wTransform)
    },
    onClickPlaylist(id) {
      // 点击的歌单和当前打开的个单页是同一个 直接关闭player
      if (id === Number(this.$route.params.id)) {
        this.setPlayerShow(false)
      } else {
        this.$router.push(`/playlist/${id}`)
      }
    },
    onClickSong(song) {
      this.startSong(song)
      this.addToPlaylist(song)
    },
    ...mapMutations(['setPlayerShow']),
    ...mapActions(['startSong', 'addToPlaylist'])
  },
  computed: {
    activeLyricIndex() {
      return this.lyricWithTranslation
        ? this.lyricWithTranslation.findIndex((l, index) => {
          const nextLyric = this.lyricWithTranslation[index + 1]
          return (
            this.currentTime >= l.time &&
            (
              nextLyric ? this.currentTime < nextLyric.time : true
            )
          )
        })
        : -1
    },
    lyricWithTranslation() {
      let ret = []
      // 空内容的去除
      const lyricFiltered = this.lyric.filter(({ content }) => Boolean(content))
      // content统一转换数组形式
      if (lyricFiltered.length) {
        lyricFiltered.forEach((l) => {
          const { time, content } = l
          const lyricItem = { time, content, contents: [content] }
          const sameTimeTLyric = this.tlyric.find(({ time: tLyricTime }) => tLyricTime === time)
          if (sameTimeTLyric) {
            const { content: tLyricContent } = sameTimeTLyric
            if (content) {
              lyricItem.contents.push(tLyricContent)
            }
          }
          ret.push(lyricItem)
        })
      } else {
        ret = lyricFiltered.map(({ time, content }) => ({
          time,
          content,
          contents: [content]
        }))
      }
      return ret
    },
    ...mapState(['currentSong', "currentTime", "playing", "isPlayerShow"])
  },
  watch: {
    isPlayerShow(show) {
      if (show) {
        // 歌词短期内不会变化 所以只拉取相似信息
        this.updateSimi()
      }
    },
    playing(newPlaying) {
      if (!newPlaying) {
        this.syncWrapperTransform('disc', 'discRotate')
      }
    },
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        this.setPlayerShow(false)
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      // 如果歌曲详情显示状态切歌 需要拉取歌曲相关信息
      if (this.isPlayerShow) {
        this.updateSong()
      } else {
        // 否则只是更新歌词
        this.updateLyric()
      }
    },
    activeLyricIndex(newIndex, oldIndex) {
      if (
        newIndex !== -1 &&
        newIndex !== oldIndex &&
        !this.lyricScroll[WHEEL_TYPE] &&
        !this.lyricScroll[SCROLL_TYPE]
      ) {
        const { scroller, lyric } = this.$refs
        if (lyric && lyric[newIndex]) {
          scroller.getScroller().scrollToElement(lyric[newIndex], 200, 0, true)
        }
      }
    },
    $route() {
      this.setPlayerShow(false)
    }
  },
  components: {
    Comments
  },
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}

.player {
  position: fixed;
  top: $header-height;
  bottom: $mini-player-height;
  left: 0;
  right: 0;
  padding: 0 36px;
  background: var(--header-bgcolor);
  z-index: $song-detail-z-index;
  overflow: hidden;
  overflow-y: auto;

  .content {
    max-width: 870px;
    margin: auto;

    .song {
      display: flex;

      .left {
        padding: 80px 70px 0 36px;
        display: flex;
        justify-content: center;

        .img-outer-border {
          @include round(320px);
          @include flex-center;
          background: var(--song-shallow-grey-bg);

          .img-outer {
            @include round(300px);
            @include flex-center;
            background: $black;
            background: linear-gradient(-45deg, #333540, #070708, #333540);
            &.rotate {
              animation: rotate 20s linear infinite;
            }
            .img-wrap {
              @include img-wrap(200px);

              img {
                border-radius: 50%;
              }
            }
          }
        }
      }

      .right {
        flex: 1;
        padding-top: 45px;

        .name {
          font-size: $font-size-title-lg;
          color: var(--font-color-white);
          margin-bottom: 16px;
        }

        .artists {
          margin-bottom: 16px;
        }

        .desc {
          display: flex;
          font-size: $font-size-sm;
          margin-bottom: 30px;

          .desc-item {
            display: flex;
            margin-right: 32px;
            .label {
              display: inline-block;
              margin-right: 4px;
            }

            .value {
              color: $blue;
            }
          }
        }

        .no-lyric {
          text-align: center;
          margin-top: 100px;
          color: var(--font-color);
        }

        .lyric-wrap {
          width: 380px;
          height: 350px;
          mask-image: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0) 0,
            hsla(0, 0%, 100%, 0.6) 15%,
            #fff 25%,
            #fff 75%,
            hsla(0, 0%, 100%, 0.6) 85%,
            hsla(0, 0%, 100%, 0)
          );

          .lyric-item {
            margin-bottom: 16px;
            font-size: $font-size-sm;

            &.active {
              font-size: $font-size;
              color: var(--font-color-white);
              font-weight: $font-weight-bold;
            }

            .lyric-text {
              margin-bottom: 8px;
            }
          }
        }
      }
    }

    .bottom {
      display: flex;
      margin-top: 48px;

      .left {
        flex: 1;
      }

      .right {
        padding-left: 36px;
        width: 28%;
        overflow: hidden;

        .simi-playlists {
          margin-bottom: 36px;
        }

        .simi-songs {
          .play-icon {
            @include abs-center;
          }
        }

        .title {
          font-size: $font-size-lg;
          font-weight: $font-weight-bold;
          margin-bottom: 12px;
        }

        .desc {
          display: flex;
          align-items: center;

          .count {
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>
