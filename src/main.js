// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入字体图标样式
import '@/assets/ali-fonts/iconfont.css'

// 引入头像提示组件
import Notice from '@/components/avatarToast/index'
Vue.use(Notice)

// 引入 mockjs
import mock from './mock/mock.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
