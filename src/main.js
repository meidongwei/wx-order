import Vue from 'vue'
import App from './App'
import router from './common/router'
// 引入字体图标样式
import '@/assets/ali-fonts/iconfont.css'
// 引入头像提示组件
import Toast from './components/avatarToast/index'
Vue.use(Toast)
// 引入自定义ajax
import ajax from './common/axios'
Vue.prototype.$ajax = ajax

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
