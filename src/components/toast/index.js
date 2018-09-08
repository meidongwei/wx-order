import ToastComponent from './toast.vue'

const Toast = {}

Toast.install = function (Vue) {

  const ToastConstructor = Vue.extend(ToastComponent)

  const instance = new ToastConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  // 通过Vue的原型注册一个方法，让所有实例共享这个方法
  Vue.prototype.$toast = (msg='提示信息', duration=1500, position='center') => {

    instance.message = msg
    instance.position = position

    instance.show = true
    setTimeout(() => {
      instance.show = false
    }, duration)
  }
}

export default Toast
