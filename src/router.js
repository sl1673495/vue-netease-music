import Vue from 'vue'
import Router from 'vue-router'


const Discovery = () => import('@/page/discovery')
const PlaylistDetail = () => import('@/page/playlist-detail')
const Playlists = () => import('@/page/playlists')
const Songs = () => import('@/page/songs')

export const topRoutes = [{
  path: '/discovery',
  name: 'discovery',
  component: Discovery
},{
  path: '/playlists',
  name: 'playlists',
  component: Playlists
},   
{
  path: '/songs',
  name: 'songs',
  component: Songs
}]

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/discovery'
    },
    
    {
      path: '/playlist/:listId',
      name: 'playlist',
      component: PlaylistDetail
    },
    ...topRoutes
  ]
})
