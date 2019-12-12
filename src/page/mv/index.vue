// mv详情页面
<template>
  <div class="mv" v-if="$utils.isDef(mvDetail.id)">
    <div class="mv-content">
      <div class="left">
        <p class="title">mv详情</p>

        <div class="player">
          <VideoPlayer :url="mvPlayInfo.url" ref="video" />
        </div>

        <div class="author-wrap">
          <div class="avatar">
            <img v-lazy="$utils.genImgUrl(artist.picUrl, 120)" />
          </div>
          <p class="author">{{ artist.name }}</p>
        </div>

        <p class="name">{{ mvDetail.name }}</p>

        <div class="desc">
          <span class="date"
            >发布：{{
              $utils.formatDate(mvDetail.publishTime, "yyyy-MM-dd")
            }}</span
          >
          <span class="count">播放：{{ mvDetail.playCount }}次</span>
        </div>

        <div class="comments">
          <Comments :id="id" type="mv" />
        </div>
      </div>
      <div class="right">
        <p class="title">相关推荐</p>
        <div class="simi-mvs">
          <Card
            :desc="`by ${simiMv.artistName}`"
            :key="simiMv.id"
            :name="simiMv.name"
            @click="$utils.goMv(simiMv.id)"
            class="simi-mv-card"
            v-for="simiMv in simiMvs"
          >
            <template #img-wrap>
              <MvCard
                :duration="simiMv.duration"
                :img="simiMv.cover"
                :playCount="simiMv.playCount"
              />
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMvDetail, getMvUrl, getArtists, getSimiMv } from "@/api"
import { hideMenuMixin } from "@/utils"
import { mapMutations } from "@/store/helper/music"
import Comments from "@/components/comments"
import MvCard from "@/components/mv-card"

export default {
  mixins: [hideMenuMixin],
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  metaInfo() {
    return {
      title: this.mvDetail.name
    }
  },
  created() {
    this.init()
  },
  data() {
    return {
      mvDetail: {},
      mvPlayInfo: "",
      artist: {},
      simiMvs: []
    }
  },
  methods: {
    async init() {
      const [
        { data: mvDetail },
        { data: mvPlayInfo },
        { mvs: simiMvs }
      ] = await Promise.all([
        getMvDetail(this.id),
        getMvUrl(this.id),
        getSimiMv(this.id)
      ])
      const { artist } = await getArtists(mvDetail.artistId)

      this.mvDetail = mvDetail
      this.mvPlayInfo = mvPlayInfo
      this.artist = artist
      this.simiMvs = simiMvs

      this.$nextTick(() => {
        const player = this.$refs.video.player
        // 加载高清源
        player.emit("resourceReady", genResource(this.mvDetail.brs, mvPlayInfo))
        player.on("play", () => {
          // 停止播放歌曲
          this.setPlayingState(false)
        })
      })
    },
    goMv(id) {
      this.$router.push(`/mv/${id}`)
    },
    ...mapMutations(["setPlayingState"])
  },
  watch: {
    id: "init"
  },
  components: { Comments, MvCard }
}

function genResource(brs, mvPlayInfo) {
  const { url: mvPlayInfoUrl, r: mvPlayInfoBr } = mvPlayInfo
  const keyNameMap = {
    "240": "标清",
    "480": "高清",
    "720": "超清",
    "1080": "1080P"
  }

  return Object.keys(brs).map(key => {
    // 优先使用mvPlayInfo里的数据
    const findPreferUrl = key === mvPlayInfoBr
    const name = keyNameMap[key]
    const url = findPreferUrl ? mvPlayInfoUrl : brs[key]
    return {
      url,
      name
    }
  })
}
</script>

<style lang="scss" scoped>
.mv {
  padding: $page-padding;

  .title {
    margin-bottom: 16px;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
  }

  .mv-content {
    display: flex;
    max-width: 950px;
    margin: auto;

    .left {
      flex: 1;

      .player {
        margin-bottom: 16px;
        overflow: hidden;
        border-radius: 4px;
      }

      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 32px;

        .avatar {
          @include img-wrap(60px);
          margin-right: 8px;
          img {
            @include round(60px);
          }
        }

        .author {
          font-size: $font-size-lg;
        }
      }

      .name {
        margin-bottom: 16px;
        font-size: $font-size-title-lg;
        font-weight: $font-weight-bold;
      }

      .desc {
        display: flex;
        color: var(--font-color-grey-shallow);
        font-size: $font-size-sm;

        .date {
          display: inline-block;
          margin-right: 24px;
        }
      }

      .comments {
        margin-top: 48px;
      }
    }

    .right {
      width: 36%;
      padding-left: 32px;

      .simi-mvs {
        padding: -8px 0;

        .simi-mv-card {
          padding: 8px 0;
        }
      }
    }
  }
}
</style>
