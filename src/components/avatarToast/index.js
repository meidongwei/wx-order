import Vue from 'vue'
import ToastComponent from './toast.vue'
// 直接将Vue组件作为Vue.extend的参数
const ToastConstructor = Vue.extend(ToastComponent)

let nId = 1
let instance

const Notice = (avatarUrl, text, count) => {
  let id = 'notice-' + nId++
  instance = new ToastConstructor({
    data: {
      avatarUrl: avatarUrl,
      text: text,
      count: count
    },
  })
  instance.id = id
  instance.vm = instance.$mount()
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  // document.body.appendChild(instance.dom)
  let cc = document.getElementById('cc')
  if (cc) {
    cc.appendChild(instance.dom)
  }
  instance.dom.style.zIndex = nId + 1001
  return instance.vm
}
export default {
  install: Vue => {
    Vue.prototype.$notice = Notice
  },
}
