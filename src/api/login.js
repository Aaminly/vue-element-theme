import request from '@/utils/request'

// 登录
export const login = (username, password) => {
  return request({
    url: '/user/authenCheck',
    data: {
      userPhoneAndName: username,
      password
    }
  })
}
// 获取用户信息
export const getUserInfo = token => {
  token = token.split(';')
  return request({
    url: '/a/sysManage/getUserLoginInfo',
    data: {
      id: token[0]
    }
  })
}

// 登出
export const logout = () => {
  return request({
    url: '/user/logout'
  })
}

// 发送验证码
export const getAuthenCode = data => {
  return request({
    url: '/user/getAuthenCode',
    data
  })
}

// 忘记或修改密码
export const changePassword = data => {
  return request({
    url: '/user/changePassword',
    data
  })
}
