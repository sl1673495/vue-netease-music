import Vue from 'vue'
import Router from 'vue-router'

const Discovery = () => import('@/page/discovery')
const PlaylistDetail = () => import('@/page/playlist-detail')
const Playlists = () => import('@/page/playlists')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/discovery'
    },
    {
      path: '/discovery',
      name: 'discovery',
      component: Discovery
    },
    {
      path: '/playlist/:listId',
      name: 'playlist',
      component: PlaylistDetail
    },
    {
      path: '/playlists',
      name: 'playlists',
      component: Playlists
    }
  ]
})
