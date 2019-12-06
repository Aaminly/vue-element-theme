import router from './router' // asyncRouterMap
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, superAdminId } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.includes(String(permissionRoles))
}

/* function whetherInRouter(name, routerMap) {
  if (!name) return false
  return routerMap.some(route => {
    if (route.name === name) {
      return true
    } else {
      if (route.children && route.children.length) {
        return whetherInRouter(name, route.children)
      }
    }
  })
} */

const whiteList = ['/login', '/auth-redirect', '/upload'] // no redirect whitelist

let i = 0

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  // determine if there has token
  /* has token*/
  if (to.path === '/login') {
    next({ path: '/' })
    NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  } else {
    if (i === 0) {
      i = 1
      // 判断当前用户是否已拉取完user_info信息
      store.dispatch('generateRoutes', { }).then(() => {
        // 根据menu id生成可访问的路由表
        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
    } else {
      // 动态改变权限
      if (hasPermission(store.getters.roles, to.meta.id)) {
        next()
      } else {
        // 排除超管
        if (store.getters.userInfo.id === superAdminId) {
          next()
          return
        }
        next({ path: '/error/401', replace: true, query: { noGoBack: true } })
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
