import request from '@/utils/request'

const responseType = 'arraybuffer'

// 验证导出
export const checkForExport = data =>
  request({
    url: '/a/sysManage/checkForExport',
    data
  })

// 导出学生列表
export const exportStudentList = data =>
  request({
    url: '/a/class/classAbout/exportStudentListByClassId',
    data,
    responseType
  })

// 导出未缴费查询列表
export const exportFindStudentOrderList = data =>
  request({
    url: '/a/signUpPayFees/exportFindStudentOrderList',
    data,
    responseType
  })

// 导出候补管理列表
export const exportSignupCandidateList = data =>
  request({
    url: '/a/signUpPayFees/exportSignupCandidateList',
    data,
    responseType
  })

// 导出转班查询
export const exportTurnClassList = data =>
  request({
    url: '/a/businessQuery/exportTurnClassList',
    data,
    responseType
  })

// 导出班级查询
export const exportPxxclassListForReception = data =>
  request({
    url: '/a/class/classAbout/exportPxxclassListForReception',
    data,
    responseType
  })

// 导出调课查询
export const exportChangeClassScheduleList = data =>
  request({
    url: '/a/businessQuery/exportChangeClassScheduleList',
    data,
    responseType
  })

// 导出签到记录
export const exportAttendChangeInfoList = data =>
  request({
    url: '/a/class/attendClass/exportAttendChangeInfoList',
    data,
    responseType
  })

// 导出业务量列表
export const exportStudentBusinessList = data =>
  request({
    url: '/a/businessQuery/exportStudentBusinessList',
    data,
    responseType
  })

// 导出退费查询-退费单列表
export const exportFindBigRefundOrderList = data =>
  request({
    url: '/a/signUpPayFees/exportFindBigRefundOrderList',
    data,
    responseType
  })

// 导出退费查询-报名退费列表
export const exportFindSignUpRefundOrderList = data =>
  request({
    url: '/a/signUpPayFees/exportFindSignUpRefundOrderList',
    data,
    responseType
  })

// 导出退费查询-其他退费列表
export const exportFindOtherOrderRefundList = data =>
  request({
    url: '/a/signUpPayFees/exportFindOtherOrderRefundList',
    data,
    responseType
  })

// 导出退费查询-导出提现记录
export const exportFindWithdrawList = data =>
  request({
    url: '/a/balance/exportFindWithdrawList',
    data,
    responseType
  })

// 导出退费查询-导出余额非0学员
export const exportBalanceNotZeroList = data =>
  request({
    url: '/a/balance/exportBalanceNotZeroList',
    data,
    responseType
  })

// 导出余额归集记录
export const exportFindBalanceGroupList = data =>
  request({
    url: '/a/balance/exportFindBalanceGroupList',
    data,
    responseType
  })

// 导出校区列表
export const exportAdminOrganList = data =>
  request({
    url: '/a/backgroundSystem/adminOrgan/exportAdminOrganList',
    data,
    responseType
  })

// 导出教师级别
export const exportTeacherLevelHistoryList = data =>
  request({
    url: '/a/teacher/teacherLevelHistory/exportTeacherLevelHistoryList',
    data,
    responseType
  })

// 导出财务主体列表
export const exportFinanceBodyList = data =>
  request({
    url: '/a/backgroundSystem/adminOrgan/exportFinanceBodyList',
    data,
    responseType
  })

// 导出财务确认
export const exportIncomeConfirmList = data =>
  request({
    url: '/a/financeDateStatistics/exportIncomeConfirmList',
    data,
    responseType
  })

// 导出财务确认按id
export const exportIncomeConfirmById = data =>
  request({
    url: '/a/financeDateStatistics/exportIncomeConfirmById',
    data,
    responseType
  })

// 导出财务实时确认列表
export const exportIncomeConfirmActualTimeList = data =>
  request({
    url: '/a/financeDateStatistics/exportIncomeConfirmActualTimeList',
    data,
    responseType
  })

// 导出财务实时确认按id
export const exportIncomeConfirmActualTimeListById = data =>
  request({
    url: '/a/financeDateStatistics/exportIncomeConfirmActualTimeListById',
    data,
    responseType
  })

// 导出财务签到查询
export const exportAttendList = data =>
  request({
    url: '/a/signUpPayFees/exportAttendList',
    data,
    responseType
  })

// 导出财务教师课酬-按校区
export const exportPaymentByCampusId = data =>
  request({
    url: '/a/teacher/exportPaymentByCampusId',
    data,
    responseType
  })

// 导出财务教师课酬-按教师
export const exportPaymentByTeacher = data =>
  request({
    url: '/a/teacher/exportPaymentByTeacher',
    data,
    responseType
  })

// 导出财务教师课酬-详情
export const exportPaymentInfo = data =>
  request({
    url: '/a/teacher/exportPaymentInfo',
    data,
    responseType
  })

// 导出财务跨区转班
export const exportTurnList = data =>
  request({
    url: '/a/financeDateStatistics/exportTurnList',
    data,
    responseType
  })

// 导出财务分析
export const exportFinanceAnalysisList = data =>
  request({
    url: '/a/financeDateStatistics/exportFinanceAnalysisList',
    data,
    responseType
  })

// 导出财务 变动记录明细
export const exportFindChangeList = data =>
  request({
    url: '/a/financeManage/exportFindChangeList',
    data,
    responseType
  })

// 导出财务 变动记录汇总
export const exportChangeCollectList = data =>
  request({
    url: '/a/financeManage/exportChangeCollectList',
    data,
    responseType
  })

// 导出财务 校区财务主体变动记录
export const exportCampusAndFinanceChange = data =>
  request({
    url: '/a/financeManage/exportCampusAndFinanceChange',
    data,
    responseType
  })

// 导出校区对账-支付记录列表
export const exportFindAmountPaymentInfoList = data =>
  request({
    url: '/a/businessQuery/exportFindAmountPaymentInfoList',
    data,
    responseType
  })

// 导出校区对账-课程报名列表/其他收费列表
export const exportFindOrderList = data =>
  request({
    url: '/a/businessQuery/exportFindOrderList',
    data,
    responseType
  })

// 导出校区对账-课程报名列表/对账查询
export const exportAccountQueryList = data =>
  request({
    url: '/a/businessQuery/exportVerifyBillRecordList',
    data,
    responseType
  })
// 获取班级点名册
export const exportClassStudentBook = data =>
  request({
    url: '/a/class/exportClassStudentBook',
    data,
    responseType
  })

// 导出教师列表
export const exportTeacherList = data =>
  request({
    url: '/a/teacher/teacherAbout/exportTeacherList',
    data,
    responseType
  })

// 导出教师课表
export const exportTeacherTimetable = data =>
  request({
    url: '/a/teacher/teacherAbout/exportTeacherTimetable',
    data,
    responseType
  })

// 导出后台班级列表
export const exportPxxclassListForBackstage = data =>
  request({
    url: '/a/class/classAbout/exportPxxclassListForBackstage',
    data,
    responseType
  })

// 导出后台教室列表
export const exportClassroomList = data =>
  request({
    url: '/a/backgroundSystem/classroom/exportClassroomList',
    data,
    responseType
  })

// 导出后台学员信息列表
export const exportFindStudentList = data =>
  request({
    url: '/a/student/exportFindStudentList',
    data,
    responseType
  })

// 导出财务-收入情况-通过id导出
export const exportIncomeById = data =>
  request({
    url: '/a/financeDateStatistics/exportIncomeById',
    data,
    responseType
  })

// 导出财务-收入情况
export const exportIncomeList = data =>
  request({
    url: '/a/financeDateStatistics/exportIncomeList',
    data,
    responseType
  })

// 导出财务-优惠设置-班级优惠
export const exportClassDiscountList = data =>
  request({
    url: '/a/financeManage/exportClassDiscountList',
    data,
    responseType
  })

// 导出财务-优惠设置-活动优惠
export const exportActivityDiscountList = data =>
  request({
    url: '/a/financeManage/exportActivityDiscountList',
    data,
    responseType
  })

// 导出财务-优惠设置-连报优惠
export const exportContinuousDiscountList = data =>
  request({
    url: '/a/financeManage/exportContinuousDiscountList',
    data,
    responseType
  })

// 导出学科-班级运营数据
export const exportClassOperationData = data =>
  request({
    url: '/a/subject/exportClassOperationData',
    data,
    responseType
  })

// 导出学科-班级运营数据批量学员
export const exportClassOperationDataStu = data =>
  request({
    url: '/a/subject/exportClassOperationDataStu',
    data,
    responseType
  })

// 导出学科-学员运营数据
export const exportStudentOperationData = data =>
  request({
    url: '/a/subject/exportStudentOperationData',
    data,
    responseType
  })

// 导出学科 产品线分析
export const exportProductLineList = data =>
  request({
    url: '/a/subject/exportProductLineList',
    data,
    responseType
  })

// 导出学科-三率分析-按老师
export const exportThreeRateAnalysisForTeacher = data =>
  request({
    url: '/a/subject/exportThreeRateAnalysisForTeacher',
    data,
    responseType
  })

// 导出学科-三率分析-按老师Id
export const exportThreeRateAnalysisForTeacherByClass = data =>
  request({
    url: '/a/subject/exportThreeRateAnalysisForTeacherByClass',
    data,
    responseType
  })

// 导出学科-三率分析-按校区
export const exportThreeRateAnalysisForAdminOrgan = data =>
  request({
    url: '/a/subject/exportThreeRateAnalysisForAdminOrgan',
    data,
    responseType
  })

// 导出学科-三率分析-按年级
export const exportThreeRateAnalysisForGrade = data =>
  request({
    url: '/a/subject/exportThreeRateAnalysisForGrade',
    data,
    responseType
  })

// 导出学科-常规分析-人次
export const exportPerson = data =>
  request({
    url: '/a/subject/exportPerson',
    data,
    responseType
  })

// 导出学科-常规分析-学员注册人数
export const exportRegisterPerson = data =>
  request({
    url: '/a/subject/exportRegisterPerson',
    data,
    responseType
  })

// 导出配置-中小学设置
export const exportSchoolList = data =>
  request({
    url: '/a/sysManage/exportSchoolList',
    data,
    responseType
  })

// 导出配置-操作日志
export const exportSysOperationInfoList = data =>
  request({
    url: '/a/sysManage/exportSysOperationInfoList',
    data,
    responseType
  })
// 导出配置-导出日志
export const exportSysExportInfoList = data =>
  request({
    url: '/a/sysManage/exportSysExportRecordList',
    data,
    responseType
  })

// 导出配置-用户管理-用户列表
export const exportSysUserList = data =>
  request({
    url: '/a/sysManage/exportSysUserList',
    data,
    responseType
  })

// 导出财务-确认汇总列表
export const exportIncomeConfirmSummaryList = data =>
  request({
    url: '/a/financeDateStatistics/exportIncomeConfirmSummaryList',
    data,
    responseType
  })

// 导出财务-确认汇总单条
export const exportIncomeConfirmSummaryListById = data =>
  request({
    url: '/a/financeDateStatistics/exportIncomeConfirmSummaryListById',
    data,
    responseType
  })

// 导出三率分析
export const exportThreeRateList = data =>
  request({
    url: '/a/subject/exportThreeRateList',
    data,
    responseType
  })

// 导出财务-收入汇总
export const exportIncomeSummaryList = data =>
  request({
    url: '/a/financeDateStatistics/exportIncomeSummaryList',
    data,
    responseType
  })

// 导出财务-收入汇总导出详情
export const exportIncomeSummaryListById = data =>
  request({
    url: '/a/financeDateStatistics/exportIncomeSummaryListById',
    data,
    responseType
  })

// 导出财务-退费率分析
export const exportFindRefundRateList = data =>
  request({
    url: '/a/subject/exportFindRefundRateList',
    data,
    responseType
  })

// 导出财务-定级数据分析与老师三率分析
export const exportGradingDataList = data =>
  request({
    url: '/a/subject/exportGradingDataList',
    data,
    responseType
  })

// 导出前台-校区报账
export const exportCampusAccountFor = data =>
  request({
    url: '/a/businessQuery/exportCampusAccountFor',
    data,
    responseType
  })

// 导出前台-个人报账
export const exportPersonAccountFor = data =>
  request({
    url: '/a/businessQuery/exportPersonAccountFor',
    data,
    responseType
  })

  // 导出班级变动记录
export const exportClassOperationInfoList = data =>
  request({
    url: '/a/sysManage/exportClassOperationInfoList',
    data
  })
