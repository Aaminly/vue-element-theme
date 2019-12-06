import Toast from './index'

export default {
  install(Vue) {
    const ToastTpl = Vue.extend(Toast)
    const tpl = new ToastTpl().$mount()
    let timer = null
    const append = (msg, type, isObj = false) => {
      type && (tpl.type = type)
      let message = msg
      if (isObj) {
        tpl.type = msg.type
        message = msg.message
      }
      tpl.message = message
      timer || document.body.appendChild(tpl.$el)
      clearTimeout(timer)
      timer = setTimeout(() => {
        document.body.removeChild(tpl.$el)
        timer = null
      }, msg.duration || 2000)
    }
    Vue.prototype.$toast = (msg, type) =>
      append(msg, type, typeof msg === 'object')
    ;['success', 'error', 'warning'].forEach(type => {
      Vue.prototype.$toast[type] = msg => Vue.prototype.$toast(msg, type)
    })
  }
}
