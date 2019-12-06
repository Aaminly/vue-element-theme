export default {
  methods: {
    handleInputBlur(e, item, key, val) {
      const t = e.target
      if (!t.value) t.value = val
      if (item[key] === undefined) {
        this.$set(item, key, val)
      }
    }
  }
}
