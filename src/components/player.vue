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
              v-if="!rawLyric"
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
          <Comments
            ref="comments"
            @pageChange="onCommentPageChange"
            :id="currentSong.id"
          />
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
import { getLyric } from '@/api/song'
import lyricParser from '@/utils/lrcparse'
import { prefixStyle } from "@/utils/dom"

import Comments from '@/components/comments'
import { mapState, mapMutations } from 'vuex'

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
      tlyric: []
    }
  },
  methods: {
    async updateLyric() {
      const lrc = await getLyric(this.currentSong.id)
      const { lyric, tlyric } = lyricParser(lrc)
      this.rawLyric = lrc.lrc.lyric
      this.lyric = lyric
      this.tlyric = tlyric
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
    onCommentPageChange(page) {
      if (page > 1) {
        this.$refs.comments.$el.scrollIntoView({ behavior: "smooth" })
      }
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
    ...mapMutations(['setPlayerShow'])
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
      this.updateLyric()
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
        padding-top: 80px;
        flex: 0 0 400px;
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
          font-weight: $font-weight-bold;
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

          .lyric-item {
            margin-bottom: 16px;

            &.active {
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
      margin-top: 48px;
    }
  }
}
</style>
