<template>
  <div class="select-course-box">
    <i class="el-icon-close closed" title="关闭" @click="$emit('close')"/>
    <h4>
      <template v-if="scope.row.classInfo">
        <span>{{ scope.row.classInfo.campusName }}</span>
        <span>{{ scope.row.classInfo.className }}</span>
        <span>{{ scope.row.classInfo.periodsLabel }}</span>
      </template>
    </h4>
    <div class="select-course-box-list">
      <span v-show="!attend.length" class="is-empty">暂无课次</span>
      <div
        v-for="item in attend"
        :key="item.id"
        :class="{'actived': hasSelectedAttend(item.id, order[scope.$index].payAttend), 'no-select': !item.whetherRefund && item.studentAttendClassId }"
        @click="selectedAttend(item, order[scope.$index], item.whetherRefund || (!item.whetherRefund && item.status === '3'))"
      >
        <span>{{ item.workdate }}</span>
        <h1 class="act-color">{{ item.classSequence }}</h1>
        <span :class="sequenceClass(item)">{{ item.statusName || item.rollCallStatusLabel }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
export default {
  name: 'SelectCourse',
  props: {
    isEdit: {
      type: Boolean,
      default: true
    },
    isRefund: {
      type: Boolean,
      default: false
    },
    order: {
      type: Array,
      default: () => []
    },
    scope: {
      type: Object,
      default: () => { }
    },
    attendList: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      sequenceList: [],
      amount: 0
    }
  },
  computed: {
    sequenceClass() {
      return item => {
        return (item.whetherRefund || item.status === '3') ? 'el-button--success' : 'no-buy'
      }
    },
    attend() {
      const { row: { classId: refundId }, classId: payId } = this.scope
      return this.sequenceList[payId || refundId] || []
    }
  },
  watch: {
    attendList: {
      handler() {
        this.sequenceList = deepClone(this.attendList)
        const vals = Object.values(this.attendList)[0]
        this.amount = vals ? vals[0].amount : 0
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    hasSelectedAttend(id, attend) {
      return attend.some(item => item.id === id)
    },
    selectedAttend(item, row, select) {
      const { classId, payAttend: attend } = row
      const sequenceList = this.sequenceList[classId]
      if (item === 'all') {
        if (!Array.isArray(sequenceList)) {
          this.$toast.error('该订单班级暂无课次')
          return
        }
        sequenceList.forEach(item => {
          if (item.status === '3') this.selectedAttend(item, row, item.status)
        })
        return
      } else if (!select || !this.isEdit) return
      const { id, studentAttendClassId } = item
      const index = attend.findIndex(item => item.id === id)
      if (index > -1) attend.splice(index, 1)
      else attend.push({ id, studentAttendClassId, amount: this.amount, whetherRefund: item.whetherRefund })
      let ids = attend.map(item => item.studentAttendClassId || item.id)
      if (this.isRefund) {
        ids = attend.filter(item => item.whetherRefund).map(item => item.studentAttendClassId || item.id)
      }
      const totalPrice = sequenceList
        .filter(item => ids.includes(item.studentAttendClassId || item.id))
        .map(item => (item.studentAmount === 0 ? String(item.studentAmount) : item.studentAmount) || item.amount)
        .reduce((s, n) => +s + +n, 0)

      if (this.isRefund) {
        row._refundPrice = totalPrice
        row._refundNum = ids.length
        row._refundAttendClassIds = ids.join(',')
        return
      }
      row.price = totalPrice
    }
  }
}
</script>

<style lang="scss" scoped>
.select-course-box {
  h4 {
    margin: 0 0 10px 0;
    span {
      padding-right: 10px;
    }
  }
  .closed {
    position: absolute;
    right: 30px;
    top: 10px;
    font-size: 18px;
    cursor: pointer;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 10px);
    > div {
      width: 65px;
      height: 65px;
      border-radius: 6px;
      position: relative;
      border: 1px solid #f3f3f3;
      box-shadow: 0 0 10px #eee;
      background: #fff;
      overflow: hidden;
      margin: 0 10px 10px 0;
      position: relative;
      &.actived:not(.no-select) {
        background: rgba(#409167, 0.2);
        h1,
        span:first-child {
          color: #409167 !important;
        }
      }
      &.no-select {
        background: rgba(#999, 0.2);
        h1,
        span:first-child {
          color: #999 !important;
        }
      }
      h1 {
        margin: 16px 0 0 0;
        text-align: center;
      }
      span {
        font-size: 12px;
        position: absolute;
        left: 0;
        &:first-child {
          left: 3px;
          top: 2px;
          color: #aeadad;
        }
        &:last-child {
          bottom: 0;
          width: 100%;
          text-align: center;
          height: 14px;
          line-height: 14px;
          &.no-buy {
            background: #eee;
            color: #a5a5a5;
          }
        }
      }
    }
  }
}
</style>
