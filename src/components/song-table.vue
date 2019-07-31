
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
    highLightText: {
      type: String,
      default: '',
    }
  },
  data() {
    const commonHighLightSlotScopes = {
      default: (scope) => {
        return (
          <span>{this.genHighlight(scope.row[scope.column.property])}</span>
        )
      }
    }
    return {
      columns: [{
        prop: 'index',
        label: '',
        width: '50',
        scopedSlots: {
          default: (scope) => {
            return (
              <div>
                {this.isActiveSong(scope.row) ? (
                  <Icon
                    class="horn"
                    type="horn"
                    color="theme"
                  />
                ) : (
                    <span>{scope.$index + 1}</span>
                  )}
              </div>
            )
          }
        }
      }, {
        prop: 'img',
        label: ' ',
        width: '100',
        scopedSlots: {
          default: (scope) => {
            return (
              <div class="song-table-img-wrap">
                <img src={this.$utils.genImgUrl(scope.row.img, 120)} />
                <PlayIcon class="song-table-play-icon" />
              </div>
            )
          }
        }
      }, {
        prop: 'name',
        label: '音乐标题',
        labelClassName: "song-table-title-th",
        className: "song-table-title-td",
        scopedSlots: commonHighLightSlotScopes
      }, {
        prop: 'artistsText',
        label: '歌手',
        scopedSlots: commonHighLightSlotScopes
      }, {
        prop: 'albumName',
        label: '专辑',
        scopedSlots: commonHighLightSlotScopes
      }, {
        prop: 'durationSecond',
        label: '时长',
        width: '100',
        scopedSlots: {
          default: (scope) => {
            return (
              <span>{this.$utils.formatTime(scope.row.durationSecond)}</span>
            )
          }
        }
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
    genHighlight(title = '') {
      if (!this.highLightText) {
        return title
      }
      const titleToMatch = title.toLowerCase()
      const keyWord = this.highLightText.toLowerCase()
      const matchIndex = titleToMatch.indexOf(keyWord);
      const beforeStr = title.substr(0, matchIndex);
      const afterStr = title.substr(matchIndex + keyWord.length);
      const hitStr = title.substr(matchIndex, keyWord.length);
      const titleSpan = matchIndex > -1 ? (
        <span>
          {beforeStr}
          <span class="high-light-text">{hitStr}</span>
          {afterStr}
        </span>
      ) : title;
      return titleSpan;
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
  components: { PlayIcon },
  render() {
    const tableAttrs = {
      attrs: this.$attrs,
      on: {
        ...this.$listeners,
        ['row-click']: this.onRowClick
      },
      props: {
        ['cell-class-name']: this.tableCellClassName,
        data: this.songs
      },
      style: { width: '99.9%' }
    }
    return this.songs.length ? (
      <el-table
        {...tableAttrs}
      >
        {this.showColumns.map((column, index) => {
          const { scopedSlots, ...columnProps } = column
          return (
            <el-table-column key={index} {...{ props: columnProps }} scopedSlots={scopedSlots} >
            </el-table-column>
          )
        })}
      </el-table>
    ) : null
  }
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

.high-light-text {
  color: $blue;
}
</style>
