
<!--
 * table配置组件参数介绍：
 * props: {
 *    data 数据入参
 *    columns 配置
 *    childType  存在子列表的时候使用，该字段为子列表的字段名称，默认order, 多级子list传入数组
 *    count 需要分页时传入
 *    singleSelected 是否开启单选，默认false
 *    pageSlot 页码slot
 * }
 * columns: {
 *    label 表头显示名称
 *    width 宽度
 *    prop 字段名称，单字段传String,多字段传Array['a', 'b']
 *    separator 多字段实现分隔符，默认'/'，只在多字段生效
 *    fixed 定位
 *    type 'selection' checkbox选择框外部组件通过@multipleSelection获取选中值，'num' 用于改变数字字体
 *    pre 前缀
 *    suf 后缀
 *    parseTime 时间格式化，传入(y-m-d h:i:s)与utils parseTime使用一致
 *    index: true  索引，传入true时生效
 *    renderHeader(h, row, index) renderHeader函数
 *    render(h, row, index) render函数
 *    [
 *      {...}   子列表使用方式，内部配置同上
 *    ]
 * }
 -->
<template>
  <div class="table-box">
    <el-table
      ref="table"
      :key="key"
      :data="data"
      :highlight-current-row="singleSelected"
      :expand-row-keys="expandList"
      :row-key="row => row.id"
      :show-summary="showSummary"
      :summary-method="param => summaryMethod(getSummaries, param)"
      :row-class-name="rowClassName"
      stripe
      border
      style="width: 100%"
      @current-change="(currentRow, oldCurrentRow) => $emit('selected', currentRow, oldCurrentRow)"
      @selection-change="val => $emit('multipleSelection', val)"
      @sort-change="row => $emit('sort-change', row)"
    >
      <template
        v-for="({label, prop, className, width, fixed, type, pre = '', suf = '', separator = '/', parseTime: format , _renderHeader, _child, _childType, _render, index: _i, _multiHeadData, sort = []}, index) in tableRow"
      >
        <el-table-column
          v-if="_multiHeadData"
          :label="_multiHeadData.label"
          :key="index"
          class-name="muliti-header-th">
          <muliti-header :type="type" :data="_multiHeadData.children" :sort="sort"/>
        </el-table-column>
        <el-table-column
          v-else-if="showSummary"
          :key="index"
          :prop="prop"
          :label="label"
          :width="width"
          :fixed="fixed || false"
          :class-name="type === 'num' ? 'price-font': ''"
          align="center"
        >
          <template slot-scope="{row, $index}">
            <template v-if="_render">
              {{ createNode('_render_'+$index, _render(row, $index)) }}
              <slot :name="'_render_'+$index"/>
            </template>
            <template v-else-if="type === 'operation'">
              <slot :row="Object.assign({}, row, {$index})"/>
            </template>
            <template v-else>
              <div class="cell" style="text-align: center;">
                {{ `${pre}${row[prop]}${suf}` }}
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="!_child && !type && !pre && !suf && !Array.isArray(prop) && prop !== 'operation' && type !== 'selection' && !format && !_renderHeader && !_render"
          :key="index"
          :prop="prop"
          :class-name="className"
          :label="label"
          :type="_i ? 'index' : ''"
          :width="width || 'auto'"
          :fixed="fixed || false"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            <div class="child-list">
              <span :class="row[prop] ? '':'is-empty' ">{{ row[prop] || 'N/A' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="type === 'expand'"
          :type="type"
          :key="index"
          :label="label"
          :class-name="className"
          :width="width || 'auto'"
          :fixed="fixed || false"
          show-overflow-tooltip
        >
          <template slot-scope="{row, $index}">
            <template v-if="_render">
              {{ createNode('_render_'+$index, _render(row, $index)) }}
              <slot :name="'_render_'+$index"/>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="type === 'selection' && !_child"
          :key="index"
          :width="width || 55"
          :fixed="fixed || false"
          :type="type"
        />
        <el-table-column
          v-else-if="type === 'index'"
          :key="index"
          :label="label || false"
          :width="width || 55"
          :fixed="fixed || false"
          :type="type"
        />
        <el-table-column
          v-else
          :key="index"
          :label="label"
          :class-name="className"
          :width="width || 'auto'"
          :fixed="fixed || false"
        >
          <template slot="header" slot-scope="{row, $index}">
            {{ _renderHeader ? createNode('_render-header_'+$index, _renderHeader(row, $index)) : label }}
            <slot :name="'_render-header_'+$index"/>
          </template>
          <template slot-scope="{row, $index}">
            <template v-if="!_child">
              <template v-if="_render">
                {{ createNode('_render_'+$index, _render(row, $index)) }}
                <slot :name="'_render_'+$index"/>
              </template>
              <template v-else-if="Array.isArray(prop)">
                <span
                  v-for="(v, index) in prop"
                  :key="index"
                  :class="{'price-font': type === 'num'}"
                >{{ row[v] }}{{ index !== prop.length - 1 ? separator : '' }}</span>
              </template>
              <template v-else-if="type === 'operation'">
                <slot :row="Object.assign({}, row, {$index})"/>
              </template>
              <template v-else-if="type === 'num'">
                <span class="price-font">{{ pre }}{{ row[prop] || 0 }}{{ suf }}</span>
              </template>
              <template v-else-if="format">
                <span>{{ parseTime(row[prop], format) }}</span>
              </template>
              <template v-else>
                <span>{{ pre }}{{ row[prop] }}{{ suf }}</span>
              </template>
            </template>
            <template v-else>
              <el-checkbox-group v-model="childCheckList[$index]" style="font-size: 14px;" @change="i => handleChildChanged(i, $index)">
                <div
                  v-for="(child, index) in getList(row, _childType)"
                  :key="child.id"
                  :style="{height: child.rowNum * 33 + 'px', lineHeight: child.rowNum * 33 + 'px'}"
                  class="child-list"
                >
                  <template v-if="_render">
                    {{ createNode('_render_'+index, _render(child, index)) }}
                    <slot :name="'_render_'+index"/>
                  </template>
                  <template v-else-if="type === 'selection'">
                    <el-checkbox :label="child">{{ null }}</el-checkbox>
                  </template>
                  <template v-else-if="type === 'operation'">
                    <slot :row="child"/>
                  </template>
                  <template v-else-if="format">
                    <div>{{ parseTime(child[prop], format) }}</div>
                  </template>
                  <template v-else-if="Array.isArray(prop)">
                    <div :title="setTitle(child, prop)">
                      <span
                        v-for="(v, index) in prop"
                        :key="index"
                        :class="{'price-font': type === 'num'}"
                      >{{ child[v] }}{{ index !== prop.length - 1 ? separator : '' }}</span>
                    </div>
                  </template>
                  <span v-else-if="whetherEmpty(child[prop])" class="is-empty">N/A</span>
                  <template v-else-if="type">
                    <div class="price-font">{{ pre }}{{ child[prop] }}{{ suf }}</div>
                  </template>
                  <template v-else>
                    <div :title="child[prop]">{{ child[prop] }}</div>
                  </template>
                </div>
              </el-checkbox-group>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="table-box-footer">
      <slot name="footer"/>
    </div>
    <el-pagination
      v-show="count"
      :page-sizes="pageSizes"
      :page-size="limit"
      :total="count"
      :current-page="page"
      :layout="pageLayout"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
      <span class="price-font">{{ pageSlot | formatNum }}</span>
    </el-pagination>
  </div>
</template>

<script>
import pagination from '@/mixin/pagination'
import MulitiHeader from './MulitiHeader'
import { deepClone, parseTime } from '@/utils'
export default {
  name: 'CommTable',
  components: {
    MulitiHeader
  },
  filters: {
    formatNum(val) {
      const num = val && val.match(/\d+/g)
      if (!Array.isArray(num)) return val
      num.forEach(v => {
        const n = String(v)
        val = val.replace(v, n.toLocaleString())
      })
      return val
    }
  },
  mixins: [pagination],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    childType: {
      type: [String, Array],
      default: 'order'
    },
    count: {
      type: Number,
      default: 0
    },
    singleSelected: {
      type: Boolean,
      default: false
    },
    expandList: {
      type: Array,
      default: () => []
    },
    pageSlot: {
      type: String,
      default: ''
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    summaryMethod: {
      type: Function,
      default: (fn, param) => fn(param)
    },
    summaryData: {
      type: Object,
      default: () => null
    },
    rowClassName: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      key: 1,
      tableRow: [],
      childCheckList: [] // 子child checkbox
    }
  },
  computed: {
    setTitle(data, field) {
      return (data, field) => {
        let str = ''
        // eslint-disable-next-line no-return-assign
        field.forEach(f => str += data[f] + '/')
        return str.substr(0, str.length - 1)
      }
    }
  },
  watch: {
    columns: {
      deep: true,
      immediate: true,
      handler() {
        this.tableRow = deepClone(this.columns)
        this.hasChildren(this.tableRow)
        this.tableRow.forEach((item, index) => {
          if (item.renderHeader && typeof item.renderHeader === 'function') {
            item._renderHeader = (row, index) => item.renderHeader(this.$createElement, row, index)
          }
          if (item.render && typeof item.render === 'function') {
            item._render = (row, index) => item.render(this.$createElement, row, index)
          }
          if (item.header) {
            item._multiHeadData = this.multiHeade(deepClone(item.header))
          }
        })
        this.key = this.key + 1
      }
    },
    data: {
      deep: true,
      handler() {
        this.data.forEach(() => {
          this.childCheckList.push([])
        })
      }
    },
    '$parent.page'(page) {
      this.page = page
    }
  },
  methods: {
    parseTime,
    createNode(key, vnode) {
      this.$slots[key] = vnode
    },
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row)
    },
    handleChildChanged(list, index) {
      this.$emit('childMultipleSelection', list, index)
    },
    hasChildren(list, i = 1) {
      list.forEach((item, index) => {
        if (Array.isArray(item)) {
          item.forEach((v, ind) => {
            if (Array.isArray(v)) {
              this.hasChildren(item, ++i)
            } else {
              v._child = i
              if (Array.isArray(this.childType)) {
                v._childType = this.childType.slice(0, i)
              } else {
                v._childType = [this.childType]
              }
            }
          })
          list.splice(index, 1, ...item)
        }
      })
    },
    whetherEmpty(prop) {
      return prop === null || prop === ''
    },
    getList(data, type = []) {
      const t = deepClone(type)
      if (!Array.isArray(t)) return
      if (t.length === 1) {
        if (Array.isArray(data)) {
          return [].concat(...data.map(item => item[t]))
        }
        return data[t]
      } else {
        const list = data[t.splice(0, 1)]
        list.forEach(item => {
          this.$set(item, 'rowNum', item.children.length)
        })
        return this.getList(list, t)
      }
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (this.summaryData && column.property) {
          sums[index] = this.summaryData[column.property].toLocaleString()
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            return isNaN(value) ? prev : prev + curr
          }, 0)
          sums[index] = (this.columns[index].pre ? this.columns[index].pre : '') + sums[index].toLocaleString()
        } else {
          sums[index] = ' '
        }
      })
      return sums
    },
    multiHeade(data) {
      const res = { children: [] }
      for (const [label, child] of Object.entries(data)) {
        res.label = label
        let i = 0
        for (const key in child) {
          const value = child[key]
          i++
          if (Object.prototype.toString.call(value) === '[object Object]') {
            const c = this.multiHeade({ [key]: value })
            c.id = i
            res.children.push(c)
          } else {
            const [field = value, formatter] = Array.isArray(value) ? value : []
            res.children.push({
              id: i,
              label: key,
              prop: field,
              formatter
            })
          }
        }
      }
      return res
    }
  }
}
</script>

<style lang="scss">
.table-box {
  .price-font {
    font-size: 16px;
  }
}
</style>
<style lang="scss" scoped>
.table-box {
  .el-pagination {
    &:first-of-type {
      margin-top: 0;
    }
    .price-font {
      padding-right: 15px;
    }
  }
  > div {
    .child-list {
      height: 33px;
      line-height: 33px;
      position: relative;
      .is-empty {
        font-size: 12px;
      }
      > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:not(:last-child)::before {
        content: "";
        position: absolute;
        left: -10px;
        bottom: -1px;
        width: calc(100% + 20px);
        height: 1px;
        background: #eee;
      }
    }
  }
  &-footer {
    margin-top: 13px;
  }
  &-title {
    &-left {
      display: flex;
      align-items: flex-start;
      .tit {
        text-align: center;
      }
    }
    &-right {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    }
    .tit {
      margin: 0 10px 10px 0;
      padding: 0 10px;
      line-height: 33px;
      background: #eaeaea;
      border-radius: 3px;
      display: flex;
      align-items: center;
      > span:first-child {
        color: #707070;
        &:not(:only-of-type) {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
