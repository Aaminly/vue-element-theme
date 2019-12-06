<template>
  <div class="cascader-wrapper">
    <el-popover
      ref="eleMultiCascaderPopover"
      v-model="showPopover"
      placement="bottom-start"
      trigger="manual"
      width="160"
      popper-class="cascader-popper"
    >
      <div slot="reference">
        <el-select
          v-model="selectedLabels"
          :placeholder="placeholder"
          :disabled="disabled"
          :size="size"
          multiple
          style="width: 100%;"
          popper-class="hide-popper"
          @change="selectChange"
          @focus="handleFocus"
          @visible-change="visibleChange"
        />
      </div>
      <div v-clickoutside="hidePopover" class="cascader-menu-wrapper">

        <template v-for="(cas, index) in casTree">
          <el-scrollbar :key="index">
            <ul class="el-cascader-menu cascader-menu">
              <li
                v-for="(item, itemIdx) in cas"
                :class="{
                  'el-cascader-menu__item': true,
                  'el-cascader-menu__item--extensible': item[props.children] && item[props.children].length > 0,
                  'has-checked-child': item.hasCheckedChild,
                  'is-active': item.hasCheckedChild,
                }"
                :key="itemIdx"
                @click="spreadNext(item[props.children], index)"
              >
                <el-checkbox
                  :disabled="item.disabled"
                  v-model="item.checked"
                  @change="checked => { checkedChange(item, index, checked) }"
                />
                <span :title="item[props.label]">{{ item[props.label] }}</span>
              </li>
            </ul>
          </el-scrollbar>
        </template>
      </div>
    </el-popover>
  </div>
</template>

<script>
import Clickoutside from '@/utils/clickoutside'
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
export default {
  name: 'EleMultiCascader',
  directives: { Clickoutside },
  props: {
    value: {
      type: Array | String,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    props: {
      type: Object,
      default: () => ({
        value: 'id',
        label: 'name',
        children: 'children'
      })
    },
    size: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      elWidth: '',
      popperWidth: '',
      showPopover: false,
      clonedOpts: [],
      casTree: [],
      selectedItems: [],
      selectedLabels: [],
      selectedValues: [],
      hasInitModel: false
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.initOpts()
        this.initDatas()
      }
    },
    value: {
      deep: true,
      handler() {
        if (!this.hasInitModel) {
          this.initDatas()
          this.hasInitModel = true
        }
      }
    }
  },
  created() {
    this.initOpts()
    this.initDatas()
  },
  mounted() {
    // 设置弹出层宽度
    this.elWidth = this.$el.offsetWidth
    this.setPopperWidth()
  },
  destroyed() {
    this.clonedOpts = null
    this.casTree = null
    this.selectedItems = null
    this.selectedLabels = null
    this.selectedvalues = null
  },
  methods: {
    initOpts() {
      if (this.options.length) {
        this.clonedOpts = deepClone(this.options)
        this.casTree = [this.clonedOpts]
      }
    },
    // 初始化
    initDatas() {
      this.selectedValues = this.value || []
      this.selectedItems = []
      this.selectedLabels = []
      this.recursiveOpt(this.clonedOpts)
    },
    // 递归option数据
    recursiveOpt(children) {
      const vm = this
      children.forEach(child => {
        child.checked = false
        if (this.selectedValues.some(val => val + '' === child[this.props.value] + '')) {
          this.selectedItems.push(child)
          this.selectedLabels.push(child[this.props.label])
          child.checked = true
          this.describeCheckedMap(child)
        } else {
          child.checked = false
        }
        if (child[this.props.children] && child[this.props.children].length > 0) {
          vm.recursiveOpt(child[this.props.children])
        }
      })
    },
    // 描述已选中路径
    describeCheckedMap(targetChild) {
      const vm = this
      function findParents(parents = [], children) {
        children.forEach(child => {
          if (targetChild[vm.props.value] === child[vm.props.value]) {
            if (child.checked) {
              parents.forEach(per => {
                per.hasCheckedChild = true
              })
            } else {
              // 倒序遍历
              for (let i = parents.length - 1; i >= 0; i--) {
                const per = parents[i]
                let hasCheckedChild = false
                if (per[vm.props.children] && per[vm.props.children].length > 0) {
                  hasCheckedChild = per[vm.props.children].some(
                    v => v.checked || v.hasCheckedChild
                  )
                }
                per.hasCheckedChild = hasCheckedChild
              }
            }
          } else {
            if (Array.isArray(child[vm.props.children])) {
              findParents([...parents, child], child[vm.props.children])
            }
          }
        })
      }
      findParents([], this.clonedOpts)
    },
    // 展开下一级
    spreadNext(children, index) {
      if (index || index === 0) {
        if (children && children.length > 0) {
          this.casTree.splice(index + 1, this.casTree.length - 1, children)
        } else {
          this.casTree.splice(index + 1, this.casTree.length - 1)
        }
        this.setPopperWidth()
      }
    },
    syncData() {
      // 同步数据到上层
      this.$emit('input', this.selectedValues)
      this.$emit('change', this.selectedValues, this.selectedItems)
    },
    // 选择框点击删除
    selectChange(val) {
      this.selectedLabels = val
      const deletedItem = this.selectedItems.filter(
        item => !val.includes(item[this.props.label])
      )
      deletedItem.forEach(item => {
        item.checked = false
      })
      // deletedItem.checked = false
      this.describeCheckedMap(deletedItem)
      this.selectedItems = this.selectedItems.filter(v =>
        this.selectedLabels.includes(v[this.props.label])
      )
      this.selectedValues = this.selectedItems.map(v => v[this.props.value])
      this.syncData()
      this.refresPopover()
    },
    // 菜单选中变化
    checkedChange(item, index, checked) {
      if (checked) {
        this.selectedItems.push(item)
      } else {
        this.selectedItems = this.selectedItems.filter(
          selectedItem => selectedItem[this.props.label] !== item[this.props.label]
        )
      }
      this.selectedLabels = []
      this.selectedValues = []
      this.selectedItems.forEach(item => {
        this.selectedLabels.push(item[this.props.label])
        this.selectedValues.push(item[this.props.value])
      })
      this.syncData()
      this.describeCheckedMap(item)
      this.refresPopover()
    },
    // 改变菜单宽度
    setPopperWidth() {
      const cascaderPopper = this.$refs.eleMultiCascaderPopover.$refs.popper
      const width = (180 + 1) * this.casTree.length
      cascaderPopper.style.width = width + 'px'
    },
    visibleChange(visible) {
      if (visible) {
        this.showPopover = true
      }
    },
    handleFocus(evt) {
      if (this.disabled) return
      this.$emit('focus', evt)
    },
    hidePopover(evt) {
      this.showPopover = false
      this.$emit('blur', evt)
    },
    refresPopover() {
      // 触发resize，让poppover跟随选框，不兼容IE
      const resize = new Event('resize')
      setTimeout(() => {
        window.dispatchEvent(resize)
      }, 66)
    },
    clearLabels() {
      this.selectedLabels = []
      this.selectChange([])
    }
  }
}
</script>

<style lang="scss">
.hide-popper {
  display: none;
}
.cascader-menu-wrapper {
  height: 204px;
  overflow: hidden;
  display: flex;
  > div{
    box-sizing: border-box;
    border-right: 1px solid #e4e7ed;
    .el-scrollbar__wrap{
      margin-right: -11px !important;
      margin-bottom: -11px !important;
    }
    .el-checkbox{
      margin-right: 10px;
    }
  }
}
.cascader-popper {
  padding: 0 !important;
  .popper__arrow {
    left: 35px !important;
  }
}
.el-cascader-menu__item.has-checked-child {
  background-color: #f5f7fa !important;
}
</style>
