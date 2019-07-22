<template>
  <el-table
    v-if="songs.length"
    :data="songs"
    @row-click="onRowClick"
    :cell-class-name="tableCellClassName"
    style="width: 99.9%"
  >
    <template v-for="(column, index) in showColumns">
      <!-- 需要自定义渲染的列 -->
      <el-table-column
        v-if="['index', 'durationSecond'].includes(column.prop)"
        :key="index"
        :label="column.label"
        :prop="column.prop"
        v-bind="column"
      >
        <template slot-scope="scope">
          <template v-if="column.prop === 'index'">
            <Icon
              class="horn"
              v-if="isActiveSong(scope.row)"
              type="horn"
              color="theme"
            />
            <span v-else>{{scope.$index + 1}}</span>
          </template>
          <template v-else-if="column.prop === 'durationSecond'">
            <span>{{ scope.row.durationSecond | formatTime }}</span>
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
export default {
  props: {
    hideColumns: {
      type: Array,
      default: () => []
    },
    songs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [{
        prop: 'index',
        label: '',
        width: '50'
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
        label: '时长'
      }]
    }
  },
  methods: {
    onRowClick(song) {
      this.startSong(song)
      this.setPlaylist(this.songs)
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
      return this.columns.filter(column => {
        return !this.hideColumns.find((prop) => prop === column.prop)
      })
    },
    ...mapState(['currentSong'])
  }
}
</script>

<style lang="scss">
.song-table-title-td {
  color: $font-color-white;
}

.song-active {
  color: $theme-color;
}
</style>
