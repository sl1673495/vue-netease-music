<template>
  <div class="menu">
    <user />
    <ul class="menu-list">
      <router-link
        class="menu-item"
        active-class="menu-item-active"
        v-for="(item, index) in menus"
        tag="li"
        :key="index"
        :to="item.to"
      >
        <i class="iconfont" :class="item.icon" />
        <span class="menu-title">{{item.title}}</span>
      </router-link>
      <!-- <li class="menu-item" v-for="(item, index) in menus" :key="index">{{item.title}}</li> -->
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import User from '@/components/user'

export default {
  data() {
    return {
      menus: [
        {
          title: '发现音乐',
          icon: 'icon-yinyue',
          to: '/discovery',
        },
        {
          title: '私人FM',
          to: '/fm'
        }
      ]
    }
  },
  components: {
    User
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 400px;
  height: 100%;
  background-color: $menu-bgcolor;
}

.menu-item {
  padding: 12px 18px;
  cursor: pointer;

  &:hover {
    background: $menu-item-hover-bg;
  }

  &-active {
    color: $theme-color;
    background: $menu-item-active-bg;
  }

  .menu-title {
    display: inline-block;
    margin-left: 8px;
  }
}
</style>
