<script>
export default {
  name: 'MulitiHeader',
  props: {
    type: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    sort: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    whetherSort(field) {
      if (this.sort.length && !this.sort.includes(field)) {
        return false
      }
      return this.type === 'sort' ? 'custom' : false
    }
  },
  render() {
    const _c = this.$createElement
    const res = this.data.map(({ id, label, prop, children, formatter }) => {
      const child = children ? _c('muliti-header', {
        props: {
          data: children,
          className: 'muliti-header-th'
        }
      }, null) : null
      const props = {
        label,
        prop,
        className: 'muliti-header-th',
        sortable: this.whetherSort(prop),
        width: this.type === 'sort' ? 120 : 'auto'
      }
      if (formatter && typeof formatter === 'function') {
        props.width = 150
        props.formatter = (row, column, cellValue, index) => formatter(_c, row, column, cellValue, index)
      }
      return _c('el-table-column', {
        props
      }, [child])
    })
    /**
     * HANK方法 修复渲染顺序错误问题
     */
    if (res.length > 1) {
      res.unshift(res.pop())
    }
    return _c('div', res)
  }
}
</script>
