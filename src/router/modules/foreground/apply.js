import Layout from '@/views/layout/Layout'

export default {
  path: 'apply',
  component: Layout,
  redirect: '/foreground/apply/index',
  name: 'Apply',
  meta: {
    title: '报名'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/foreground/apply'),
      name: 'ApplyList',
      meta: {
        title: '学员列表',
        activeMenu: '/foreground/apply'
      },
      hidden: true
    },
    {
      path: 'student/:id',
      component: () => import('@/views/foreground/apply/info'),
      name: 'StudentInfo',
      redirect: '/foreground/apply/student/:id/classQuery',
      meta: {
        title: '学员详情',
        breadcrumb: false
      },
      hidden: true,
      children: [
        {
          path: 'classQuery',
          component: () =>
            import('@/views/foreground/apply/components/ClassQuery'),
          name: 'ClassQuery',
          meta: {
            title: '班级查询',
            animation: false,
            activeMenu: '/foreground/apply'
          }
        }
      ]
    }
  ]
}
