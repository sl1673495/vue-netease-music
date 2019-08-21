// 搜索详情页面
<template>
  <div class="search-detail">
    <div
      class="header"
      ref="header"
    >
      <span class="keywords">{{keywords}}</span>
      <span class="found">找到{{count}}个{{searchTypeTitle}}</span>
    </div>
    <div class="tabs-wrap">
      <Tabs
        :tabs="tabs"
        itemClass="search-tab-item"
        v-model="activeTabIndex"
      />
    </div>
    <component
      :is="searchComponent"
      @updateCount="onUpdateCount"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import SearchSongs from "./songs"
import SearchPlaylists from "./playlists"
import SearchMvs from "./mvs"

const tabs = [
  {
    title: "歌曲",
    key: "songs",
    component: "SearchSongs"
  },
  {
    title: "歌单",
    key: "playlists",
    component: "SearchPlaylists"
  },
  {
    title: "MV",
    key: "mvs",
    component: "SearchMvs"
  }
]
export default {
  props: ["keywords"],
  created() {
    this.tabs = tabs
  },
  provide() {
    return {
      searchRoot: this
    }
  },
  data() {
    return {
      count: 0,
      activeTabIndex: 0
    }
  },
  methods: {
    onUpdateCount(count) {
      this.count = count
    }
  },

  computed: {
    currentTab() {
      return tabs[this.activeTabIndex]
    },
    searchComponent() {
      return this.currentTab.component
    },
    searchTypeTitle() {
      return this.currentTab.title
    }
  },
  components: {
    SearchSongs,
    SearchPlaylists,
    SearchMvs
  }
}
</script>

<style lang="scss" scoped>
.search-detail {
  .header {
    padding: 20px 32px;

    .keywords {
      display: inline-block;
      margin-right: 4px;
      font-size: $font-size-title-lg;
      font-weight: $font-weight-bold;
    }

    .found {
      font-size: $font-size-sm;
      color: var(--font-color-grey-shallow);
      letter-spacing: 2px;
    }
  }

  .tabs-wrap {
    padding: 0 28px;
    border-bottom: 1px solid var(--border);

    /deep/.search-tab-item {
      font-size: $font-size;
    }
  }
}
</style>
