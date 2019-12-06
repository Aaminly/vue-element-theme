import request from '@/utils/request'

// 获取字典
export const getSysDictList = data =>
  request({
    url: '/a/backgroundSystem/sysDict/findSysDictList',
    data
  })

// 获取用户列表
export const getSysUserListSingle = data =>
  request({
    url: '/a/sysManage/findSysUserListSingle',
    data
  })

// 获取教师列表
export const getTeacherListSingle = data =>
  request({
    url: '/a/teacher/teacherAbout/findTeacherListSingle',
    data
  })

// 获取教室列表
export const getClassroomListSingle = data =>
  request({
    url: '/a/backgroundSystem/classroom/findClassroomListSingle',
    data
  })

// 获取课程安排规律列表
export const getDateslotListSingle = data =>
  request({
    url: '/a/backgroundSystem/dateslot/findDateslotListSingle',
    data
  })

// 首页第一部分统计（包括总收入，总退费，在读学员数，确认收入）
export const getFirstStatistics = data =>
  request({
    url: '/a/home/findFirstStatistics',
    data
  })

// 首页第二部分统计（包括注册人数，订单数）
export const getSecondStatistics = data =>
  request({
    url: '/a/home/findSecondStatistics',
    data
  })

// 首页第三部分统计（包括转班通知，调课通知）
export const getThreeStatistics = data =>
  request({
    url: '/a/home/findThreeStatistics',
    data
  })

// 首页第四部分统计（包括学员年级，学员来源，近30天咨询转化）
export const getFourStatistics = data =>
  request({
    url: '/a/home/findFourStatistics',
    data
  })

// 通过卡号获取银行卡名称
export const getBank = data =>
  request({
    url: '/a/sysManage/getBank',
    params: data,
    method: 'GET'
  })

// 获取实时天气
export const getWeather = data =>
  request({
    url: '/a/home/getWeather',
    data
  })

// 图片上传
export const uploadImg = data =>
  request({
    url: '/a/sysManage/uploadImg',
    data
  })
