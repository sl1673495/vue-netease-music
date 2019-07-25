<template>
  <div
    class="recommend"
    v-if="list.length"
  >
    <Title>推荐歌单</Title>
    <div class="list-wrap">
      <PlaylistCard
        v-for="item in list"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :img="item.picUrl"
        :desc="item.copywriter"
      />
    </div>
  </div>
</template>

<script>
import Title from "@/base/title"
import PlaylistCard from "@/components/playlist-card"
import { getPersonalized } from "@/api/discovery"

export default {
  async created() {
    const { result } = await getPersonalized({ limit: 10 })
    this.list = result
  },
  data() {
    return {
      list: []
    }
  },
  components: { Title, PlaylistCard }
}
</script>

<style lang="scss" scoped>
.list-wrap {
  margin: 0 -4px;
  display: flex;
  flex-wrap: wrap;
}
</style>