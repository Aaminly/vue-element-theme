// import Vue from 'Vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import Element from 'element-ui'

import '@/utils/initTheme' // init theme
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
// import './mock' // simulation data

import * as filters from './filters' // global filters
import plugins from './plugins' // global plugins
import permission from '@/directive/permission' // global directive
import Toast from './components/Toast/toast'
import './mock'

window.Vue.use(Toast)

window.Vue.use(window.ELEMENT, { size: 'small' })

// register global directive.
window.Vue.use(permission)

// register global plugins.
window.Vue.use(plugins)

// register global utility filters.
Object.keys(filters).forEach(key => {
  window.Vue.filter(key, filters[key])
})

window.Vue.config.productionTip = false

new window.Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
