import { asyncRouterMap, constantRouterMap } from '@/router'
import { superAdminId } from '@/utils/auth'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  if (route.meta && route.meta.id) {
    return menus.some(id => String(route.meta.id) === id)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, menus) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, menus)
      }
      res.push(tmp)
    }
  })
  return res
}

function redirectIndex(routes) {
  return routes.map(route => {
    if (route.children) {
      route.children.some(c => {
        if (c.children.length) {
          route.redirect = `${route.path}/${c.path}/index`
          return true
        }
      })
    }
    return route
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    generateRoutes({ commit }, { id, menu }) {
      return new Promise(resolve => {
        // 排除超管
        // const accessedRoutes = id === superAdminId ? asyncRouterMap : Object.freeze(
        //   redirectIndex(filterAsyncRouter(asyncRouterMap, menu))
        // )
        console.log(asyncRouterMap)

        commit('SET_ROUTERS', asyncRouterMap)
        resolve(asyncRouterMap)
      })
    }
  }
}

export default permission
