import { login, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { KEY } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const encryptor = new window.JSEncrypt()
encryptor.setPublicKey(KEY)
const user = {
  state: {
    token: getToken(),
    userInfo: {
      currentCampusIds: '1',
      currentCampusNames: '总部',
      currentRoleId: '0ef60b0d745849f7af9a90d94c00300,f',
      currentRoleName: 'admin',
      id: '6',
      loginName: 'cg',
      menu: [],
      mobile: '18811117311',
      skinId: 'blackgold',
      staffNo: '111111',
      status: true,
      systemUpdateTime: '系统更新于 2019-12-05 08:07:14',
      updateBy: '超管',
      updateDate: '2019-06-20T10:46:59.000+0000',
      userName: '超管'
    },
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLES: (state, menu) => {
      state.roles = menu
    }
  },

  actions: {
    // 登录
    login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const { authSignature } = response.data
            const token = encryptor.decrypt(authSignature)
            setToken(token)
            commit('SET_TOKEN', token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            const { userInfo } = response.data
            const { menu } = userInfo
            if (menu && menu.length) {
              // 验证返回的menu是否是一个非空数组
              commit('SET_ROLES', menu)
            } else {
              reject('getInfo: menu must be a non-null array !')
            }
            commit('SET_USERINFO', userInfo)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 动态修改权限
    changeRoles({ dispatch }) {
      return new Promise(async resolve => {
        const { data } = await dispatch('getUserInfo')
        resetRouter()
        const { menu, id } = data.userInfo
        const accessRoutes = await dispatch('generateRoutes', { id, menu }) // 动态修改权限后 重绘侧边菜单
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)
        resolve()
      })
    },
    // 登出
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 前端 登出
    fedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
