import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import start from '@/pages/start'
import order from '@/pages/index/order'
import pay from '@/pages/index/pay'
import paySuccess from '@/pages/index/paySuccess'
import orderDetails from '@/pages/index/orderDetails'

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
      component: index,
      redirect: 'index/order',
      children: [
        {
          path: 'order',
          name: 'order',
          component: order
        },
        {
          path: 'pay',
          name: 'pay',
          component: pay
        },
        {
          path: 'paySuccess',
          name: 'paySuccess',
          component: paySuccess
        },
        {
          path: 'orderDetails',
          name: 'orderDetails',
          component: orderDetails
        }
      ]
    }
  ]
})
