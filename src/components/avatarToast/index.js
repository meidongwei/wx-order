import Vue from 'vue'
import NoticeComponent from './Notice.vue'
// 直接将Vue组件作为Vue.extend的参数
const NoticeConstructor = Vue.extend(NoticeComponent)

let nId = 1
let instance

const Notice = (avatarUrl, content, num) => {
  let id = 'notice-' + nId++
  instance = new NoticeConstructor({
    data: {
      avatarUrl: avatarUrl,
      content: content,
      num: num
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
  // instance.dom.style.zIndex = nId + 1001
  /**
   * TODO: 添加多条通知位置下排
   *       添加通知类型：success、error、info
   */
  return instance.vm
}
export default {
  install: Vue => {
    Vue.prototype.$notice = Notice
  },
}
