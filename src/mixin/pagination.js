export default {
  data() {
    return {
      page: 1,
      limit: 10,
      pageSizes: [10, 30, 50, 100],
      pageLayout: 'slot, total, sizes, prev, pager, next, jumper',
      vm: null
    }
  },
  created() {
    let that = this
    while (!this.vm && that.$parent) {
      if (that.fetchData) {
        this.vm = that
      } else {
        that = that.$parent
      }
    }
    if (this.limit !== 10) this.pageSizes.splice(0, 1, this.limit)
  },
  methods: {
    handleSizeChange(val, param = { page: 'page', limit: 'limit', fn: 'fetchData' }) {
      // 公共分页每页显示条数
      const { page, limit, fn } = param
      this.vm[limit] = val
      this.vm[page] = 1
      this.vm[fn] && this.vm[fn]()
    },
    handleCurrentChange(val, param = { page: 'page', fn: 'fetchData' }) {
      // 公共分页页码事件
      const { page, fn } = param
      this.vm[page] = val
      this.vm[fn] && this.vm[fn]()
    }
  }
}
