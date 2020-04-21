<template>
  <div class="menu">
    <user />
    <div class="menu-wrap">
      <div
        :key="index"
        class="menu-block"
        v-for="(menu, index) in menusWithPlaylist"
      >
        <p class="menu-block-title" v-if="menu.title">{{ menu.title }}</p>
        <ul class="menu-list">
          <router-link
            :key="index"
            :to="item.path"
            active-class="menu-item-active"
            class="menu-item"
            tag="li"
            v-for="(item, index) in menu.children"
          >
            <Icon :size="16" :type="item.meta.icon" class="iconfont" />
            <span class="menu-title">{{ item.meta.title }}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import User from "@/components/user"
import {
  mapState as mapUserState,
  mapGetters as mapUserGetters
} from "@/store/helper/user"
import { menuRoutes } from "@/router"

export default {
  data() {
    return {
      menus: [
        {
          type: "root",
          children: menuRoutes
        }
      ]
    }
  },
  computed: {
    // 组合登录后的歌单
    menusWithPlaylist() {
      return this.isLogin && this.userMenus.length
        ? this.menus.concat(this.userMenus)
        : this.menus
    },
    ...mapUserState(["userPlaylist"]),
    ...mapUserGetters(["isLogin", "userMenus"])
  },
  components: {
    User
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--menu-bgcolor);

  .menu-wrap {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;

    .menu-block {
      margin-bottom: 16px;

      .menu-block-title {
        font-size: $font-size-sm;
        color: var(--font-color-grey2);
        padding-left: 16px;
        margin-bottom: 8px;
      }

      .menu-list {
        .menu-item {
          @include text-ellipsis;
          padding: 12px 18px;
          cursor: pointer;

          &:hover {
            background: var(--menu-item-hover-bg);
          }

          &-active {
            color: $theme-color;
            background: var(--menu-item-active-bg);

            i {
              color: $theme-color;
            }
          }

          .iconfont {
            font-size: $font-size-medium-sm;
          }

          .menu-title {
            font-size: $font-size-medium-sm;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
