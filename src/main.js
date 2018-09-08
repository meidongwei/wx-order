import Vue from 'vue'
import App from './App'
import store from './store'
import router from './common/router'

// 引入公共样式
import './common/css/common.scss'
// 引入字体图标样式
import '@/assets/ali-fonts/iconfont.css'
// 引入普通toast组件
import Toast from './components/toast/index'
Vue.use(Toast);
// 引入头像提示组件
import AvatarToast from './components/avatarToast/index'
Vue.use(AvatarToast);

// 引入lodash
import VueLodash from 'vue-lodash'
Vue.use(VueLodash);

// 引入自定义ajax
import ajax from './common/axios'
Vue.prototype.$ajax = ajax;

// 页面跳转后置顶
router.afterEach(() => {
  window.scrollTo(0, 0)
})

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App ref="app"/>'
});
