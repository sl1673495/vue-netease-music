<template>
  <div
    class="new-mvs"
    v-if="mvs.length"
  >
    <Title>推荐MV</Title>
    <ul class="mv-cards">
      <li
        :key="mv.id"
        class="mv-card-item"
        v-for="mv in mvs"
      >
        <MvCard
          :author="mv.artistName"
          :id="mv.id"
          :img="mv.picUrl"
          :name="mv.name"
          :playCount="mv.playCount"
        />
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { getPersonalizedMv } from "@/api"
import MvCard from "@/components/mv-card"
export default {
  created() {
    this.getMvs()
  },
  data() {
    return {
      mvs: []
    }
  },
  methods: {
    async getMvs() {
      const { result } = await getPersonalizedMv()
      this.mvs = result
    }
  },
  components: { MvCard }
}
</script>

<style lang="scss" scoped>
.new-mvs {
  .mv-cards {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -12px;

    .mv-card-item {
      width: 25%;
      padding: 0 12px;
      margin-bottom: 32px;
    }
  }
}
</style>
