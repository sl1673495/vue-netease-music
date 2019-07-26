<template>
  <div class="search">
    <el-input
      ref="input"
      placeholder="搜索"
      prefix-icon="el-icon-search"
      v-model="searchKeyword"
      @input="onInput"
      @focus="onFocus"
    >
    </el-input>
    <LeaveHide
      :reserveDoms="reserveDoms"
      @clickOutside="searchPanelShow = false"
      :show="searchPanelShow"
    >
      <div
        v-show="searchPanelShow"
        class="search-panel"
      >
        <div
          v-if="suggestShow"
          class="search-suggest"
        >
          <div
            :key="index"
            v-for="(normalizedSuggest, index) in normalizedSuggests"
            class="suggest-item"
          >
            <div class="title">
              {{normalizedSuggest.title}}
            </div>
            <ul class="list">
              <li
                v-for="item in normalizedSuggest.data"
                :key="item.id"
                class="item"
                @click="normalizedSuggest.onClick(item)"
              >
                {{normalizedSuggest.renderName ? normalizedSuggest.renderName(item) : item.name}}
              </li>
            </ul>
          </div>
        </div>
        <div
          v-else
          class="search-hots"
        >
          <div class="block">
            <p class="title">热门搜索</p>
            <div class="tags">
              <NButton
                class="button"
                :key="index"
                v-for="(hot, index) in searchHots"
              >
                {{hot.first}}
              </NButton>
            </div>
          </div>
          <div class="block">
            <p class="title">搜索历史</p>
            <div
              class="tags"
              v-if="searchHistorys.length"
            >
              <NButton
                class="button"
                :key="index"
                v-for="(history, index) in searchHistorys"
              >
                {{history.first}}
              </NButton>
            </div>
            <div
              class="empty"
              v-else
            >
              暂无搜索历史
            </div>
          </div>
        </div>
      </div>
    </LeaveHide>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions, mapMutations } from 'vuex'
import LeaveHide from '@/base/leave-hide'
import { getSearchHot, getSearchSuggest } from '@/api/search'
import { getAlbum } from '@/api/album'
import { createSong, genArtistisText } from '@/utils/song'
import { debounce } from '@/utils/common'
export default {
  async created() {
    const { result: { hots } } = await getSearchHot()
    this.searchHots = hots
  },
  mounted() {
    this.reserveDoms = [this.$refs.input.$el]
  },
  data() {
    return {
      searchPanelShow: false,
      searchKeyword: '',
      searchHots: [],
      searchHistorys: [],
      suggest: {},
      reserveDoms: [],
    }
  },
  methods: {
    onInput: debounce(function (value) {
      if (!value.trim()) {
        return
      }
      getSearchSuggest(value).then(({ result }) => {
        this.suggest = result
      })
    }, 500),
    onFocus() {
      this.searchPanelShow = true
    },
    onBlur() {
      this.searchPanelShow = false
    },
    async onClickSong(item) {
      const { id, name, artists, duration, album: { id: albumId } } = item
      const { songs } = await getAlbum(albumId)
      const { al: { picUrl } } = songs.find(({ id: songId }) => songId === id) || {}
      const song = createSong({
        id, name, artists, duration, img: picUrl
      })
      this.startSong(song)
      this.setPlaylist({ data: [song] })
    },
    onClickPlaylist(item) {
      const { id } = item
      this.$router.push(`/playlist/${id}`)
      this.searchPanelShow = false
    },
    ...mapMutations(['setPlaylist']),
    ...mapActions(["startSong"])
  },
  computed: {
    suggestShow() {
      return this.searchKeyword.length && (
        ['songs', 'playlists'].find(key => {
          return this.suggest[key] && this.suggest[key].length
        })
      )
    },
    normalizedSuggests() {
      return [{
        title: '单曲',
        data: this.suggest.songs,
        renderName(song) {
          return `${song.name} - ${genArtistisText(song.artists)}`
        },
        onClick: this.onClickSong.bind(this)
      }, {
        title: '歌单',
        data: this.suggest.playlists,
        onClick: this.onClickPlaylist.bind(this)
      }].filter(item => item.data && item.data.length)
    }
  },
  components: {
    LeaveHide
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 150px;

  .search-panel {
    position: fixed;
    top: $header-height;
    bottom: $mini-player-height;
    right: 0;
    width: 350px;
    background: var(--playlist-bgcolor);
    z-index: $search-panel-z-index;
    font-size: $font-size-sm;
    @include box-shadow;

    .block {
      padding: 16px 24px;

      .title {
        color: var(--font-color-grey);
        margin-bottom: 16px;
      }
      .tags {
        display: flex;
        flex-wrap: wrap;

        .button {
          margin-bottom: 12px;
          margin-right: 6px;
          font-size: $font-size-sm;
        }
      }

      .empty {
        @include flex-center();
        color: var(--font-color-grey);
        font-size: $font-size;
        height: 100px;
      }
    }

    .suggest-item {
      margin-bottom: 16px;

      .title {
        margin: 16px 8px 8px;
        color: var(--font-color-grey-shallow);
      }

      .list {
        .item {
          padding: 12px 24px;
          cursor: pointer;
          @include text-ellipsis();

          &:hover {
            background: var(--light-bgcolor);
          }
        }
      }
    }
  }
}
</style>
