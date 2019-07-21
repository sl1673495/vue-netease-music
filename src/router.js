import Vue from 'vue'
import Router from 'vue-router'

const Discovery = () => import('@/page/discovery')
const SongListDetail = () => import('@/page/song-list-detail')

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
      path: '/song-list-detail/:listId',
      name: 'song-list-detail',
      component: SongListDetail
    }
  ]
})
