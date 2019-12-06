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

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  store.dispatch('generateRoutes', { }).then(() => {
    // 根据menu id生成可访问的路由表
    router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
    next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
  })
  if (getToken()) {
    // determine if there has token
    /* has token*/
    // if (to.path === '/login') {
    //   next({ path: '/' })
    //   NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    // } else {
    //   if (store.getters.roles.length === 0) {
    //     // 判断当前用户是否已拉取完user_info信息
    //     store
    //       .dispatch('getUserInfo')
    //       .then(res => {
    //         // 拉取user_info
    //         const { id, menu, skinId } = res.data.userInfo // note: roles must be a array! such as: ['editor','develop']
    //         store.commit('CHANGE_THEME', skinId || 'blackgold')
    //         store.dispatch('generateRoutes', { id, menu }).then(() => {
    //           // 根据menu id生成可访问的路由表
    //           router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
    //           next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
    //         })
    //       })
    //       .catch(err => {
    //         store.dispatch('fedLogOut').then(() => {
    //           window.ELEMENT.Message.error(
    //             err || 'Verification failed, please login again'
    //           )
    //           next({ path: '/' })
    //         })
    //       })
    //   } else {
    //     // 动态改变权限
    //     if (hasPermission(store.getters.roles, to.meta.id)) {
    //       next()
    //     } else {
    //       // 排除超管
    //       if (store.getters.userInfo.id === superAdminId) {
    //         next()
    //         return
    //       }
    //       next({ path: '/error/401', replace: true, query: { noGoBack: true } })
    //     }
    //   }
    // }
  } else {
    /* has no token*/
    next()
    // if (whiteList.includes(to.path)) {
    //   // 在免登录白名单，直接进入
    //   next()
    // } else {
    //   next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
    //   NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    // }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
