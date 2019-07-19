import Vue from 'vue'
import Router from 'vue-router'
import Discovery from '@/page/discovery'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
