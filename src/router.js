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
  ]
})
