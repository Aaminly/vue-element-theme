// import Vue from 'vue'
// import Router from 'vue-router'

import foreground from './modules/foreground'

// Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/upload',
    component: () => import('@/views/upload'),
    meta: {
      upload: true
    },
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/error',
    component: Layout,
    hidden: true,
    redirect: '/error/401',
    children: [
      {
        path: '401',
        name: '401',
        meta: { title: '无权限' },
        component: () => import('@/views/errorPage/401')
      },
      {
        path: '404',
        name: '404',
        meta: { title: '找不到该页面' },
        component: () => import('@/views/errorPage/404')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'home', noCache: true }
      }
    ]
  }
]

const createRouter = () =>
  new window.VueRouter({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export const asyncRouterMap = [
  foreground,
  { path: '*', redirect: '/error/404', hidden: true }
]

export default router
