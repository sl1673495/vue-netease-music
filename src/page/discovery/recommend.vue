<template>
  <div class="recommend">
    <Title>推荐歌单</Title>
    <div class="list-wrap">
      <PlayListCard v-for="item in list"
                    :key="item.id"
                    :name="item.name"
                    :img="item.picUrl"
                    :desc="item.copywriter" />
    </div>
  </div>
</template>

<script>
import Title from "@/base/title";
import PlayListCard from "@/components/play-list-card";

export default {
  async created() {
    const { result } = await this.$request("/personalized?limit=10");
    this.list = result;
  },
  data() {
    return {
      list: []
    };
  },
  components: { Title, PlayListCard }
};
</script>

<style lang="scss" scoped>
.list-wrap {
  margin: 0 -4px;
  display: flex;
  flex-wrap: wrap;
}
</style>