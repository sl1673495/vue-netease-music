<template>
  <div class="menu">
    <user />
    <div class="menu-wrap">
      <div
        class="menu-block"
        v-for="(menu, index) in menusWithPlaylist"
        :key="index"
      >
        <p
          class="menu-block-title"
          v-if="menu.title"
        >
          {{menu.title}}
        </p>
        <ul class="menu-list">

          <router-link
            class="menu-item"
            active-class="menu-item-active"
            v-for="(item, index) in menu.children"
            tag="li"
            :key="index"
            :to="item.to"
          >
            <Icon
              class="iconfont"
              :type="item.icon"
              :size="16"
            />
            <span class="menu-title">{{item.title}}</span>
          </router-link>
        </ul>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import User from "@/components/user"
import { mapState as mapUserState, mapGetters as mapUserGetters } from '@/store/helper/user'

export default {
  data() {
    return {
      menus: [
        {
          type: 'root',
          children: [{
            title: "发现音乐",
            icon: "music",
            to: "/discovery"
          },
          {
            title: "推荐歌单",
            to: "/playlists",
            icon: 'playlist-menu'
          },
          {
            title: "最新音乐",
            to: "/songs",
            icon: 'yinyue'
          }
          ]
        },
      ]
    }
  },
  computed: {
    // 组合登录后的歌单
    menusWithPlaylist() {
      return this.isLogin && this.userPlaylist.length
        ? this.menus.concat({
          type: 'playlist',
          title: '收藏的歌单',
          children: this.userPlaylist.map(({ id, name }) => ({
            title: name,
            to: `/playlist/${id}`,
            icon: 'playlist-menu'
          }))
        })
        : this.menus
    },
    ...mapUserState(['userPlaylist']),
    ...mapUserGetters(['isLogin'])
  },
  components: {
    User
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 200px;
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
            display: inline-block;
            font-size: $font-size-medium-sm;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
