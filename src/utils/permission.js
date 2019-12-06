import store from '@/store'
import { superAdminId } from '@/utils/auth'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    // 排除超管
    return hasPermission || store.getters.userInfo.id === superAdminId
  } else {
    console.error(`need roles! Like v-permission="['id']"`)
    return false
  }
}
