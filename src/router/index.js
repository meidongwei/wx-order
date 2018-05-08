import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import start from '@/pages/start'
import order from '@/pages/order'
import pay from '@/pages/pay'
import paySuccess from '@/pages/paySuccess'
import orderDetails from '@/pages/orderDetails'

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
