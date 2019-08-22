<template>
  <div class="search-mvs">
    <WithPagination
      :getData="getSearch"
      :getDataParams="searchParams"
      :limit="40"
      :scrollTarget="searchRoot.$refs && searchRoot.$refs.header"
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
import { getSearch } from "@/api"
import MvCard from "@/components/mv-card"
import WithPagination from "@/components/with-pagination"
const SEARCH_TYPE_MV = 1004
export default {
  inject: ["searchRoot"],
  created() {
    this.getSearch = getSearch
  },
  data() {
    return {
      mvs: [],
      mvCount: 0
    }
  },
  methods: {
    onGetMvs({ result: { mvs, mvCount } }) {
      this.mvs = mvs
      this.mvCount = mvCount
      this.searchRoot.onUpdateCount(mvCount)
    }
  },
  computed: {
    searchParams() {
      return { keywords: this.searchRoot.keywords, type: SEARCH_TYPE_MV }
    }
  },
  components: {
    WithPagination,
    MvCard
  }
}
</script>

<style lang="scss" scoped>
.search-mvs {
  max-width: 1000px;
  padding: $page-padding;
  margin: auto;

  @include list(25%);
}
</style>
