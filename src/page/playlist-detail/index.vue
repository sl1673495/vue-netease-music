<template>
  <div
    class="playlist-detail"
    v-if="playlist.id"
  >
    <DetailHeader
      :songs="songs"
      :playlist="playlist"
    />
    <div class="tabs-wrap">
      <Tabs
        v-model="activeTab"
        type="theme"
        :tabs="tabs"
      />
      <el-input
        prefix-icon="el-icon-search"
        class="input"
        :class="getInputCls()"
        @focus="onInputFocus"
        @blur="onInputBlur"
        placeholder="搜索歌单音乐"
        v-model.trim="searchValue"
      ></el-input>
    </div>
    <div
      v-if="searchValue && !filteredSongs.length"
      class="empty"
    >
      未能找到和
      <span class="keyword">“{{searchValue}}”</span>
      相关的任何音乐
    </div>
    <SongTable
      v-show="activeTab === SONG_IDX"
      class="table"
      :songs="filteredSongs"
    />
    <div class="comments">
      <Comments
        v-show="activeTab === COMMENT_IDX"
        type="playlist"
        :id="id"
        @update="onCommentsUpdate"
      />
    </div>
  </div>
</template>

<script>
import DetailHeader from "./header"
import SongTable from "@/components/song-table"
import Comments from '@/components/comments'
import { createSong } from "@/utils/song"
import { getListDetail } from "@/api/song-list"
import { getSongDetail } from "@/api/song"

const MAX = 500
const SONG_IDX = 0
const COMMENT_IDX = 1
export default {
  async created() {
    this.SONG_IDX = SONG_IDX
    this.COMMENT_IDX = COMMENT_IDX
    this.$watch('id', this.init, { immediate: true })
  },
  data() {
    return {
      tabs: ['歌曲列表', '评论'],
      activeTab: SONG_IDX,
      playlist: {},
      songs: [],
      searchValue: '',
      inputFocus: false,
    }
  },
  methods: {
    async init() {
      const { playlist } = await getListDetail({ id: this.id })
      this.playlist = playlist
      this.genSonglist(playlist)
    },
    async genSonglist(playlist) {
      const trackIds = playlist.trackIds.map(({ id }) => id)
      const songDetails = await getSongDetail(trackIds.slice(0, MAX))
      const songs = songDetails.songs.map(({ id, name, al, ar, dt }) =>
        createSong({
          id,
          name,
          artists: ar,
          duration: dt,
          albumName: al.name,
          img: al.picUrl
        })
      )
      this.songs = songs
    },
    onCommentsUpdate({ total }) {
      this.tabs.splice(COMMENT_IDX, 1, `评论(${total})`)
    },
    onInputFocus() {
      this.inputFocus = true
    },
    onInputBlur() {
      this.inputFocus = false
    },
    getInputCls() {
      return !this.inputFocus ? 'inactive' : ''
    }
  },
  computed: {
    id() {
      return Number(this.$route.params.id)
    },
    filteredSongs() {
      return this.songs.filter(({ name }) => name.toLowerCase().includes(this.searchValue.toLowerCase()))
    }
  },
  components: { DetailHeader, SongTable, Comments }
}
</script>

<style lang="scss" scoped>
.playlist-detail {
  width: 100%;

  .tabs-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 24px;
    border-bottom: 1px solid var(--border);

    .input {
      width: 125px;

      @mixin inactive {
        /deep/.el-input__inner {
          background: transparent !important;
        }
      }

      &:not(:hover) {
        &.inactive {
          /deep/.el-input__inner {
            background: transparent !important;
          }
        }
      }
    }
  }

  .empty {
    @include flex-center;
    height: 200px;

    .keyword {
      color: $blue;
    }
  }

  .table {
    padding-bottom: 36px;
  }

  .comments {
    padding: 16px 32px;
  }
}
</style>
