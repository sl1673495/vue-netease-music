<template>
  <div
    class="mvs"
    ref="page"
  >
    <Tabs
      :tabs="tabs"
      @tabChange="onTabChange"
      class="tabs"
      type="small"
      v-model="activeTabIndex"
    />
    <WithPagination
      :getData="getAllMvs"
      :getDataParams="getDataParams"
      :limit="40"
      :scrollTarget="this.$refs && this.$refs.page"
      :total="mvCount"
      @getDataSuccess="onGetMvs"
    >
      <ul class="list-wrap">
        <li
          :key="mv.id"
          class="list-item"
          v-for="mv in mvs"
        >
          <MvCard
            :author="mv.artistName"
            :duration="mv.duration"
            :id="mv.id"
            :img="mv.cover"
            :name="mv.name"
            :playCount="mv.playCount"
          />
        </li>
      </ul>
    </WithPagination>
  </div>
</template>

<script type="text/ecmascript-6">
import { getAllMvs } from "@/api"
import MvCard from "@/components/mv-card"
import WithPagination from "@/components/with-pagination"

const tabs = ["全部", "内地", "港台", "欧美", "日本", "韩国"]
export default {
  created() {
    this.tabs = tabs
    this.getAllMvs = getAllMvs
  },
  data() {
    return {
      mvs: [],
      mvCount: 0,
      activeTabIndex: 0
    }
  },
  methods: {
    onGetMvs({ data, count }) {
      this.mvs = data
      if (count) {
        this.mvCount = count
      }
    }
  },
  computed: {
    activeTabType() {
      return tabs[this.activeTabIndex]
    },
    getDataParams() {
      return { area: this.activeTabType }
    }
  },
  components: {
    WithPagination,
    MvCard
  }
}
</script>

<style lang="scss" scoped>
.mvs {
  max-width: 1000px;
  padding: 16px 0;
  margin: auto;

  .tabs {
    margin-bottom: 16px;
    display: flex;
    justify-content: flex-end;
  }

  .list-wrap {
    display: flex;
    flex-wrap: wrap;

    .list-item {
      width: 25%;
      margin-bottom: 36px;
      padding: 0 12px;
    }
  }
}
</style>
