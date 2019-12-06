import Cookies from 'js-cookie'
import { setTheme } from '@/utils'

const fastNav = Cookies.get('fastNav')
const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus')
        ? !!+Cookies.get('sidebarStatus')
        : true,
      withoutAnimation: false
    },
    device: 'desktop',
    drawer: false,
    theme: Cookies.get('theme') || 'blackgold',
    themePicker: '',
    fastNav: fastNav ? JSON.parse(fastNav) : false,
    sex: [{ value: false, label: '女' }, { value: true, label: '男' }]
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_DRAWER: (state, opened = true) => {
      state.drawer = opened
    },
    CHANGE_THEME: (state, theme = state.theme) => {
      Cookies.set('theme', theme)
      state.theme = theme
      setTheme(theme)
    },
    TOGGLE_FAST_NAV: state => {
      state.fastNav = !state.fastNav
      Cookies.set('fastNav', state.fastNav)
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    toggleDrawer({ commit }, opened) {
      commit('TOGGLE_DRAWER', opened)
    },
    changeTheme({ commit }, { theme, id }) {
      return commit('CHANGE_THEME', theme)
    },
    toggleFastNav: ({ commit }) => {
      commit('TOGGLE_FAST_NAV')
    }
  }
}

export default app
