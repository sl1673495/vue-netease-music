<template>
  <div class="user">
    <i class="user-icon iconfont icon-yonghu" />
    <p class="user-name">未登录</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  padding: 16px;
  padding-bottom: 0;
  margin-bottom: 12px;

  .user-icon {
    font-size: 24px;
  }

  .user-name {
    margin-left: 8px;
    font-size: $font-size-lg;
  }
}
</style>

