import Vue from 'vue'
import ToastComponent from './toast.vue'
// 直接将Vue组件作为Vue.extend的参数
const ToastConstructor = Vue.extend(ToastComponent)

let nId = 1
let instance

const Toast = (avatarUrl, username, text, count) => {
  let id = 'toast-' + nId++
  instance = new ToastConstructor({
    data: {
      avatarUrl: avatarUrl,
      username: username,
      text: text,
      count: count
    },
  })
  instance.id = id
  instance.vm = instance.$mount()
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  document.body.appendChild(instance.dom)
  instance.dom.style.zIndex = nId + 1001
  return instance.vm
}
export default {
  install: Vue => {
    Vue.prototype.$avatarToast = Toast
  },
}
