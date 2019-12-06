export default {
  methods: {
    exportFile({ api, title = this.$route.meta.title, params = {}, onlyParams = '' }) {
      this.$confirm(`是否导出${title}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('exportCheck', {
            api,
            title,
            params: onlyParams || {
              ...this.select,
              ...params
            },
            h: this.$createElement
          })
        })
        .catch(() => {})
    }
  }
}
