<template>
  <div class="ele-input-box">
    <el-popover
      v-model="showPopover"
      placement="bottom-start"
      popper-class="ele-input-box-popover"
      trigger="manual"
      width="230"
    >
      <div v-loading="loading">
        <ul ref="ele-input-ul" class="ele-input-box-list" @mousewheel="mousewheel">
          <li v-for="(item, index) in dataList" :key="index" @click="pushSelected(item)">
            <slot :item="item"/>
          </li>
          <li v-show="noMore" class="no-more">没有更多了...</li>
        </ul>
      </div>
      <template slot="reference">
        <el-input
          v-model="value"
          :placeholder="placeholder"
          clearable
          @change="$emit('input', value)"
          @focus="inpFocus"
          @blur="visibility = false"
        />
      </template>
    </el-popover>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    fetchSuggestions: {
      type: Function,
      default: () => { }
    },
    fetchData: {
      type: Function,
      default: () => { }
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  data() {
    return {
      loading: false,
      $ul: null,
      dataList: [],
      visibility: false,
      noMore: false,
      page: 1
    }
  },
  computed: {
    showPopover() {
      return this.visibility && this.dataList.length
    }
  },
  watch: {
    value(ov, nv) {
      const value = this.value
      this.fetchSuggestions(value, this.setData)
    }
  },
  mounted() {
    this.$ul = this.$el.querySelector('.ele-input-box-list')
  },
  methods: {
    setData(result) {
      this.dataList = result
    },
    async mousewheel(e) {
      const { scrollTop, scrollHeight } = this.$ul
      if (scrollHeight - scrollTop === 272 && !this.noMore) {
        this.loading = true
        this.noMore = true
        const res = await this.fetchData(null, ++this.page)
        res && (this.noMore = false)
        this.loading = false
      }
    },
    inpFocus() {
      this.visibility = true
      this.fetchSuggestions(this.inpVal, this.setData)
    },
    pushSelected(item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="scss">
.ele-input-box-popover {
  padding: 12px 0 !important;
}
.ele-input-box {
  input {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
}
</style>
<style lang="scss" scoped>
.ele-input-box {
  &-list {
    padding: 0;
    margin: 0;
    list-style: none;
    max-height: 272px;
    overflow: auto;
    li {
      line-height: 34px;
      padding: 0 20px;
      cursor: pointer;
      color: #5a5e66;
      font-size: 14px;
      list-style: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover:not(.no-more) {
        background-color: #f3f5f7;
      }
      &.no-more {
        color: #ccc;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        cursor: default;
      }
    }
  }
}
</style>
