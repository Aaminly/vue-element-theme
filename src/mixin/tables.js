import checkPermission from '@/utils/permission'
import { pickerOptions, deepClone } from '@/utils'
import utils from './utils'
import pagination from './pagination'
import exportFile from './exportFile'
import filterSelect from './filterSelect'

export default {
  mixins: [utils, pagination, exportFile, filterSelect],
  data() {
    return {
      count: 0,
      loading: true,
      resetSearchCriteria: {},
      quickOptions: {
        shortcuts: pickerOptions
      }
    }
  },
  computed: {
    exportStatus() {
      return this.$store.state.exportFile.exportStatus
    }
  },
  mounted() {
    this.select && this.initSearchCriteria()
  },
  methods: {
    checkPermission,
    initSearchCriteria() {
      // 深拷贝默认搜索条件，以便重置搜索
      this.resetSearchCriteria = deepClone(this.select)
    },
    resetSearch(files = '', fn = () => {}) {
      // 重置搜索条件
      if (files && !(files instanceof MouseEvent)) {
        const fieldArr = files.split(',')
        for (const i of fieldArr) {
          this[i] = []
        }
      }
      this.select = deepClone(this.resetSearchCriteria)
      if (this.$refs.multiCascader) {
        this.$refs.multiCascader.clearLabels()
      }
      fn()
    },
    resetField(field, select = 'select') {
      field.split(',').forEach(prop => {
        this[select][prop] = ''
      })
    },
    BFD(fetchFn, loadName = 'loading') {
      this[loadName] = true
      return fetchFn
        .then(() => {
          this[loadName] = false
        })
        .catch(res => {
          this[loadName] = res.message === 'cancel'
        })
    },
    renderStateTag(state, isVNode = false) {
      // 返回状态的Tag标签
      const stateList = {
        success: [
          '审核通过',
          '启用',
          '已付款',
          '已支付',
          '已报名',
          '上架',
          '通过',
          '是',
          '正确',
          '连接正常',
          '退款成功',
          '签到',
          '审核完成',
          '续报',
          '未结课',
          '打开'
        ],
        info: ['草稿', '申请中', '请假', '未签到', '已结课', '未购买'],
        warning: ['待审核', '打款中', '繁忙', '申请退款'],
        danger: [
          '审核不通过',
          '打款不通过',
          '停用',
          '错误',
          '打款失败',
          '不通过',
          '下架',
          '否',
          '错误',
          '断开连接',
          '退款',
          '锁定'
        ]
      }
      let tagType = ''
      for (const i in stateList) {
        if (stateList[i].includes(state)) {
          tagType = i
        }
      }
      if (isVNode) {
        return state
          ? this.$createElement(
            'el-tag',
            {
              attrs: {
                type: tagType
              }
            },
            state
          )
          : ''
      }
      return `<span class="el-tag el-tag--${tagType} el-tag--small">${state}</span>`
    },
    whetherSearch(res, flag = true) {
      for (const key in res) {
        if (!this.select[key]) {
          flag && this.$toast.error(res[key])
          return false
        }
      }
      return true
    },
    monthRangeBlur(vm, data) {
      // 月份多选插件光标处理
      let refs = []
      data
        ? (refs = ['startMonth' + data, 'endMonth' + data])
        : (refs = ['startMonth', 'endMonth'])
      const nextRef = refs.filter(item => item !== vm.name)
      vm.value && !this.$refs[nextRef].value && this.$refs[nextRef].focus()
    },
    parseDate(date, first, last, obj = 'select') {
      if (!date) date = ['', '']
      this[obj][first] = date[0]
      this[obj][last] = date[1]
    },
    getLastVal(data, field, obj = 'select') {
      if (!data) data = ['']
      this[obj][field] = data[data.length - 1] || ''
    },
    getMultipleLastVal(data, field, obj = 'select') {
      if (!data) data = ['']
      else data = deepClone(data)
      this[obj][field] = data.map(item => item.pop()).join(',') || ''
    }
  }
}
