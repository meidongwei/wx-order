import Vue from 'vue'
import Router from 'vue-router'
import start from '@/pages/start'
import order from '@/pages/order'
import orderSuccess from '@/pages/orderSuccess'
import pay from '@/pages/pay'
import paySuccess from '@/pages/paySuccess'
import orderDetails from '@/pages/orderDetails'
import loading from '@/pages/loading'
import search from '@/pages/search'
import taocan from '@/pages/taocan'
import singleInfo from '@/pages/singleInfo'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'loading',
    },
    {
      path: '/loading',
      name: 'loading',
      component: loading
    },
    {
      path: '/taocan',
      name: 'taocan',
      component: taocan
    },
    {
      path: '/singleInfo',
      name: 'singleInfo',
      component: singleInfo
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/start',
      name: 'start',
      component: start
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: orderDetails
    }
  ]
})
