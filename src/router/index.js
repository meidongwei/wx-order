import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import start from '@/pages/start'
import order from '@/pages/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: start
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/order',
      name: 'order',
      component: order
    }
  ]
})
