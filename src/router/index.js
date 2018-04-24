import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import start from '@/components/start'

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
    }
  ]
})
