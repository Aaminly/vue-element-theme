/* Layout */
import Container from '@/views/components/Container'

/* router modules */
import apply from './apply'

export default {
  path: '/foreground',
  component: Container,
  redirect: '/foreground/apply',
  name: 'Foreground',
  alwaysShow: true,
  meta: {
    title: '前台系统',
    icon: 'foreground',
    id: 1
  },
  children: [
    apply
  ]
}
