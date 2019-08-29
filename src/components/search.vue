<template>
  <div class="search">
    <el-input
      @click.native="onClickInput"
      @input="onInput"
      @keypress.native.enter="onEnterPress"
      placeholder="搜索"
      prefix-icon="el-icon-search"
      ref="input"
      v-model.trim="searchKeyword"
    ></el-input>
    <Toggle
      :reserveDoms="[$refs.input && $refs.input.$el]"
      :show.sync="searchPanelShow"
    >
      <div
        class="search-panel"
        v-show="searchPanelShow"
      >
        <div
          class="search-suggest"
          v-if="suggestShow"
        >
          <div
            :key="index"
            class="suggest-item"
            v-for="(normalizedSuggest, index) in normalizedSuggests"
          >
            <div class="title">
              <Icon
                :size="12"
                :type="normalizedSuggest.icon"
              />
              {{normalizedSuggest.title}}
            </div>
            <ul class="list">
              <li
                :key="item.id"
                @click="normalizedSuggest.onClick(item)"
                class="item"
                v-for="item in normalizedSuggest.data"
              >
                <HighlightText
                  :highlightText="searchKeyword"
                  :text="normalizedSuggest.renderName ? normalizedSuggest.renderName(item) : item.name"
                />
              </li>
            </ul>
          </div>
        </div>
        <div
          class="search-hots"
          v-else
        >
          <div class="block">
            <p class="title">热门搜索</p>
            <div class="tags">
              <NButton
                :key="index"
                @click="onClickHot(hot)"
                class="button"
                v-for="(hot, index) in searchHots"
              >{{hot.first}}</NButton>
            </div>
          </div>
          <div class="block">
            <p class="title">搜索历史</p>
            <div
              class="tags"
              v-if="searchHistorys.length"
            >
              <NButton
                :key="index"
                @click="onClickHot(history)"
                class="button"
                v-for="(history, index) in searchHistorys"
              >{{history.first}}</NButton>
            </div>
            <div
              class="empty"
              v-else
            >暂无搜索历史</div>
          </div>
        </div>
      </div>
    </Toggle>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from "good-storage"
import { mapActions, mapMutations } from "@/store/helper/music"
import { getSearchHot, getSearchSuggest } from "@/api"
import { createSong, genArtistisText, debounce } from "@/utils"

const SEARCH_HISTORY_KEY = "__search_history__"
export default {
  async created() {
    const {
      result: { hots }
    } = await getSearchHot()
    this.searchHots = hots
  },
  data() {
    return {
      searchPanelShow: false,
      searchKeyword: "",
      searchHots: [],
      searchHistorys: storage.get(SEARCH_HISTORY_KEY, []),
      suggest: {},
      reserveDoms: []
    }
  },
  methods: {
    onClickInput() {
      this.searchPanelShow = true
    },
    onBlur() {
      this.searchPanelShow = false
    },
    onInput: debounce(function(value) {
      if (!value.trim()) {
        return
      }
      getSearchSuggest(value).then(({ result }) => {
        this.suggest = result
      })
    }, 500),
    onClickHot(hot) {
      const { first } = hot
      this.goSearch(first)
    },
    onEnterPress() {
      if (this.searchKeyword) {
        this.goSearch(this.searchKeyword)
      }
    },
    goSearch(keywords) {
      this.searchHistorys.push({ first: keywords })
      storage.set(SEARCH_HISTORY_KEY, this.searchHistorys)
      this.$router.push(`/search/${keywords}`)
      this.searchPanelShow = false
    },
    async onClickSong(item) {
      const {
        id,
        name,
        artists,
        duration,
        mvid,
        album: { id: albumId, name: albumName }
      } = item
      const song = createSong({
        id,
        name,
        artists,
        duration,
        albumId,
        albumName,
        mvId: mvid
      })
      this.startSong(song)
      this.addToPlaylist(song)
    },
    onClickPlaylist(item) {
      const { id } = item
      this.$router.push(`/playlist/${id}`)
      this.searchPanelShow = false
    },
    onClickMv(mv) {
      const { id } = mv
      this.$router.push(`/mv/${id}`)
    },
    ...mapMutations(["setPlaylist"]),
    ...mapActions(["startSong", "addToPlaylist"])
  },
  computed: {
    suggestShow() {
      return (
        this.searchKeyword.length &&
        ["songs", "playlists"].find(key => {
          return this.suggest[key] && this.suggest[key].length
        })
      )
    },
    normalizedSuggests() {
      return [
        {
          title: "单曲",
          icon: "music",
          data: this.suggest.songs,
          renderName(song) {
            return `${song.name} - ${genArtistisText(song.artists)}`
          },
          onClick: this.onClickSong.bind(this)
        },
        {
          title: "歌单",
          icon: "playlist",
          data: this.suggest.playlists,
          onClick: this.onClickPlaylist.bind(this)
        },
        {
          title: "mv",
          icon: "mv",
          data: this.suggest.mvs,
          renderName(mv) {
            return `${mv.name} - ${genArtistisText(mv.artists)}`
          },
          onClick: this.onClickMv.bind(this)
        }
      ].filter(item => item.data && item.data.length)
    }
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
    background: var(--search-bgcolor);
    z-index: $search-panel-z-index;
    font-size: $font-size-sm;
    overflow-y: auto;
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
