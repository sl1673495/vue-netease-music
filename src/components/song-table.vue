<template>
  <el-table
    :data="songs"
    stripe
    @row-click="onRowClick"
    style="width: 100%"
    row-class-name="song-table-row"
    cell-class-name="song-table-cell"
    header-cell-class-name="song-table-header-cell"
  >
    <el-table-column
      type="index"
      label=" "
      width="50"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="音乐标题"
      label-class-name="song-table-title-th"
      class-name="song-table-title-td"
    >
    </el-table-column>
    <el-table-column
      prop="artistsText"
      label="歌手"
    >
    </el-table-column>
    <el-table-column
      prop="albumName"
      label="专辑"
    >
    </el-table-column>
    <el-table-column
      prop="durationSecond"
      label="时长"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.durationSecond | formatTime }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions } from "vuex"
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onRowClick(song) {
      this.startSong(song)
    },
    ...mapActions(["startSong"])
  }
}
</script>

<style lang="scss">
.el-table th,
.el-table td {
  padding: 4px;
  font-size: $font-size-sm;
}
.el-table::before {
  height: 0;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: $light-bgcolor !important;
  color: white;
}
// 斑马纹颜色
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: $light-bgcolor;
}
// 空数据
.el-table__empty-block {
  background: $body-bgcolor;
  color: $font-color;
}
.song-table-title-th {
  color: $font-color;
}

.song-table-title-td {
  color: $white;
}

.song-table-header-cell {
  background-color: $body-bgcolor !important;
  border-bottom: none !important;
}

.song-table-cell {
  background-color: $body-bgcolor;
  border: none !important;
}

.song-table-row {
  height: 33px;
  border: none;
}
</style>