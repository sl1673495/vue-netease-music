<template>
  <el-table
    v-bind="$attrs"
    v-if="songs.length"
    :data="songs"
    @row-click="onRowClick"
    :cell-class-name="tableCellClassName"
    style="width: 99.9%"
  >
    <template v-for="(column, index) in showColumns">
      <!-- 需要自定义渲染的列 -->
      <el-table-column
        v-if="['index', 'img', 'durationSecond'].includes(column.prop)"
        :key="index"
        :label="column.label"
        :prop="column.prop"
        v-bind="column"
      >
        <template slot-scope="scope">
          <!-- 序号 -->
          <template v-if="column.prop === 'index'">
            <Icon
              class="horn"
              v-if="isActiveSong(scope.row)"
              type="horn"
              color="theme"
            />
            <span v-else>{{scope.$index + 1}}</span>
          </template>

          <!-- 时长 -->
          <template v-else-if="column.prop === 'durationSecond'">
            <span>{{ $utils.formatTime(scope.row.durationSecond) }}</span>
          </template>

          <!-- 图片 -->
          <template v-else-if="column.prop === 'img'">
            <div class="song-table-img-wrap">
              <img :src="$utils.genImgUrl(scope.row.img, 120)" />
              <PlayIcon class="song-table-play-icon" />
            </div>
          </template>
        </template>

      </el-table-column>

      <!-- 普通列 -->
      <el-table-column
        v-else
        :key="index"
        v-bind="column"
      >
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex"
import PlayIcon from '@/base/play-icon'

export default {
  props: {
    hideColumns: {
      type: Array,
      default: () => []
    },
    songs: {
      type: Array,
      default: () => []
    },
    // 播放歌曲是否弹出歌单提示
    showPromptOnPlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      columns: [{
        prop: 'index',
        label: '',
        width: '50'
      }, {
        prop: 'img',
        label: ' ',
        width: '100',
      }, {
        prop: 'name',
        label: '音乐标题',
        ['label-class-name']: "song-table-title-th",
        ['class-name']: "song-table-title-td"
      }, {
        prop: 'artistsText',
        label: '歌手'
      }, {
        prop: 'albumName',
        label: '专辑'
      }, {
        prop: 'durationSecond',
        label: '时长',
        width: '100',
      }]
    }
  },
  methods: {
    onRowClick(song) {
      this.startSong(song)
      this.setPlaylist({ data: this.songs, showPrompt: this.showPromptOnPlay })
    },
    isActiveSong(song) {
      return song.id === this.currentSong.id
    },
    tableCellClassName({ row, columnIndex }) {
      if (
        this.isActiveSong(row) &&
        columnIndex === this.showColumns.findIndex(({ prop }) => prop === 'name')
      ) {
        return 'song-active'
      }
    },
    ...mapMutations(['setPlaylist']),
    ...mapActions(["startSong"])
  },
  computed: {
    showColumns() {
      const hideColumns = this.hideColumns.slice()
      const reference = this.songs[0]
      const { img } = reference
      if (!img) {
        hideColumns.push('img')
      }
      return this.columns.filter(column => {
        return !this.hideColumns.find((prop) => prop === column.prop)
      })
    },
    ...mapState(['currentSong'])
  },
  components: { PlayIcon }
}
</script>

<style lang="scss">
.song-table-title-td {
  color: var(--font-color-white);
}

.song-active {
  color: $theme-color;
}

.song-table-img-wrap {
  position: relative;
  @include img-wrap(60px);

  img {
    border-radius: 4px;
  }
  .song-table-play-icon {
    @include abs-center;
  }
}
</style>
