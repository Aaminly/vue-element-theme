const getters = {
  sex: state => state.app.sex.map(item => item.label),
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  drawer: state => state.app.drawer,
  theme: state => state.app.theme,
  fastNav: state => state.app.fastNav,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  status: state => state.user.status,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  constant: state => state.constant.constant,
  courseCart: state => state.apply.courseCart,
  printCard: state => state.apply.printCardInfo,
  campusStatus: state => state.campus.campusStatus,
  exportStatus: state => state.exportFile.exportStatus,
  itemQuestionMsg: state => state.itemQuestionMsg.msg
}
export default getters
