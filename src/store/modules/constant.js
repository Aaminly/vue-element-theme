import { getSysDictList } from '@/api'
import { strFirstUpper, treeChildrenEmpty } from '@/utils'

const constant = {
  state: {
    // 不是常量集合，还需在constant里声明
    noConstant: ['campus', 'role', 'city'],
    // 当一个常量值存在多种参数需求时需要配置，以便在select下拉框使用，需要加_
    configure: {
      whetherShowSameLevel: '_city', // campus是否显示校区同级数据
      level: '_level', // campus校区显示层级
      notLabelAuth: '_all' // 不按权限拉取所有学部、年级、科目列表
    },
    constant: {
      campus: [], // 校区全部
      campus_param: [], // 当前校区数据
      campus_city_param: [], // 校区同级数据
      campus_level_param: [], // 校区层级数据
      role: [], // 角色
      city: [], // 省市区
      grade: [], // 年级权限列表
      grade_param: [], // 年级带参数
      grade_all_param: [], // 年级无权限所有列表
      subject: [], // 科目权限列表
      subject_param: [], // 科目带参数
      subject_all_param: [], // 科目无权限所有列表
      known_channle: [], // 了解渠道
      classroom_equipment: [], // 设备
      week_day_type: [], // 周期
      particular_year: [], // 年份
      particular_year_param: [], // 年份带参数
      season: [], // 季节
      season_param: [], // 季节带参数
      periods: [], // 期别
      periods_param: [],
      project_type: [], // 类别
      project_type_param: [], // 类别带参数
      class_type: [], // 班型
      class_type_param: [], // 班型带参数
      timeslot_type: [], // 时段
      class_status: [], // 班级状态
      department_type: [], // 学部权限列表
      department_type_all_param: [], // 学部无权限所有列表
      turn_class_condition: [], // 转班条件
      teacher_post_nature: [], // 岗位性质
      nation_type: [], // 民族
      political_affiliation_type: [], // 政治面貌
      marital_status: [], // 婚姻状况
      charge_type: [], // 收费项目类别
      paystatus: [], // 支付状态
      payment_type: [], // 支付方式
      refund_pay_type: [], // 退费方式
      refund_reaon_type: [], // 退费类型
      sign_up_record_show_way: [], // 签到记录查看方式
      refund_reson: [], // 退费具体原因
      refund_status: [], // 退费状态
      orderstatus: [], // 订单状态
      pos_status_type: [], // POS机状态
      pos_pay_status_type: [], // POS机收费方式
      deal_type: [], // 交易类型
      gathering_type: [], // 收款方式
      withdraw_deposit: [], // 提现状态
      withdraw_type: [], // 提现方式
      school_type: [], // 办学资质
      sign_status: [] // 签到状态
    }
  },
  mutations: {
    SET_DICT(state, { type, list }) {
      state.constant[type] = list
    },
    SET_CAMPUS(state, { query, list }) {
      state.constant['campus' + query] = list
    },
    SET_ROLE(state, list) {
      state.constant.role = list
    },
    SET_CITY(state, list) {
      state.constant.city = list
    },
    DEL_PARAM_DICT(state) {
      for (const key of Object.keys(state.constant)) {
        if (key.includes('_param')) {
          state.constant[key] = []
        }
      }
    },
    CLEAR_CONSTANT(state) {
      for (const key of Object.keys(state.constant)) {
        state.constant[key] = []
      }
    }
  },
  actions: {
    getConstant({ dispatch, state }, name) {
      const events = []
      const isConstant = params => {
        const { type } = params
        delete params.hasCatch
        if (state.noConstant.includes(type)) {
          events.push(dispatch('get' + strFirstUpper(type), params))
        } else {
          events.push(dispatch('getDict', params))
        }
      }
      const strSplit = name => {
        let query = ''
        if (name.includes('=')) {
          const [type, params] = name.split('=')
          const [key, val] = params.split(':')
          query = `${state.configure[key] || ''}_param`
          return {
            type,
            [key]: val === 'update' ? true : JSON.parse(val),
            query,
            hasCatch: val === 'update' ? false : !!state.constant[type + query].length
          }
        }
        return { type: name, query, hasCatch: !!state.constant[name].length }
      }
      if (Array.isArray(name)) {
        for (const item of name) {
          const params = strSplit(item)
          if (params.hasCatch) {
            continue
          }
          isConstant(params)
        }
      } else {
        const params = strSplit(name)
        if (params.hasCatch) {
          return
        }
        isConstant(params)
      }
      return Promise.all(events)
    },
    getDict({ commit }, params = {}) {
      const { query = '', ...obj } = params
      return new Promise((resolve, reject) => {
        getSysDictList(obj)
          .then(response => {
            const list = response.data.list
            commit('SET_DICT', { type: params.type + query, list })
            resolve(list)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getCampus({ commit }, params = {}) {
      const { query, ...obj } = params
      return new Promise((resolve, reject) => {
        getCampusTree({
          // adminOrganType: 1,
          adminOrganStatus: true,
          ...obj
        })
          .then(response => {
            commit('SET_CAMPUS', {
              query,
              list: treeChildrenEmpty(response.data.list)
            })
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getCity({ commit }) {
      return new Promise((resolve, reject) => {
        getCityTree({})
          .then(response => {
            commit('SET_CITY', treeChildrenEmpty(response.data.list))
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getRole({ commit }) {
      // return new Promise((resolve, reject) => {
      //   getRoleList({})
      //     .then(response => {
      //       commit('SET_ROLE', response.data.list)
      //       resolve()
      //     })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
    }
  }
}
export default constant
