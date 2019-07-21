<template>
  <div
    class="recommend"
    v-if="list.length"
  >
    <Title>推荐歌单</Title>
    <div class="list-wrap">
      <PlayListCard
        v-for="item in list"
        :key="item.id"
        :name="item.name"
        :img="item.picUrl"
        :desc="item.copywriter"
        @click.native="onClickCard(item.id)"
      />
    </div>
  </div>
</template>

<script>
import Title from "@/base/title"
import PlayListCard from "@/components/play-list-card"
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
  methods: {
    onClickCard(id) {
      this.$router.push(`/song-list-detail/${id}`)
    }
  },
  components: { Title, PlayListCard }
}
</script>

<style lang="scss" scoped>
.list-wrap {
  margin: 0 -4px;
  display: flex;
  flex-wrap: wrap;
}
</style>