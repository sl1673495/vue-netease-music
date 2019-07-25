<template>
  <el-carousel
    :interval="4000"
    type="card"
    height="200px"
  >
    <el-carousel-item
      v-for="(banner) in banners"
      :key="banner.scm"
    >
      <img
        class="banner-img"
        :src="`${banner.imageUrl}?param=1000y400`"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { getBanner } from "@/api/discovery"
export default {
  async created() {
    const { banners } = await getBanner()
    this.banners = banners
  },
  data() {
    return {
      banners: []
    }
  }
}
</script>


<style lang="scss" scoped>
.banner-img {
  width: 100%;
  height: 100%;
}
</style>