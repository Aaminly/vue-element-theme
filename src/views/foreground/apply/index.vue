<template>
  <div class="apply-box">
    <div class="select-tools">
      <div>
        <div>
          <el-input
            v-model.trim="searchVal"
            placeholder="姓名/电话"
            clearable
            @keyup.enter.native="fetchData('search')"
          />
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$router.push({name: 'AddStudent'})"
          >新增</el-button>
        </div>
      </div>
    </div>
    <comm-table :data="dataList" :columns="columns" :count="count">
      <template slot-scope="{row}">
        <slot :id="row.id">
          <el-button
            type="text"
            @click="goInfo(row)"
          >查看</el-button>
        </slot>
      </template>
    </comm-table>
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import { parseTime } from '@/utils'
export default {
  name: 'ApplyList',
  mixins: [tables],
  provide() {
    return {
      sid: this.$route.params.id
    }
  },
  data() {
    return {
      columns: [
        {
          label: '学员姓名',
          width: 150,
          render: (h, row) => {
            return h('el-button', {
              props: {
                type: 'text'
              },
              on: {
                click: () => this.goInfo(row)
              }
            }, row.name)
          }
        },
        { label: '学员编号', prop: 'no', width: 150 },
        { label: '性别', prop: 'sex', width: 60 },
        { label: '出生日期', prop: 'birthday', width: 120 },
        { label: '就读年级', prop: 'gradelable', width: 100 },
        { label: '就读学校', prop: 'oldAttendClassName' },
        { label: '联系电话', prop: 'mobile', width: 130 },
        { label: '所属校区', prop: 'campusName', width: 160 },
        { label: '操作人', prop: 'courseCounselorName', width: 100 },
        { label: '已结课/在读/已支付/总数', prop: ['inSession', 'beReading', 'paid', 'sum'], width: 175, type: 'num' },
        { label: '操作', type: 'operation', fixed: 'right', width: 100 }
      ],
      dataList: [],
      searchVal: ''
    }
  },
  created() {
    this.fetchData()
  },
  activated() {
    this.fetchData()
  },
  methods: {
    goInfo(row) {
      this.$router.push({ path: `/foreground/apply/student/${row.id}/classQuery` })
    },
    fetchData(type) {
      if (type === 'search') this.page = 1
      const list = [{
        address: '',
        attendClassNumber: null,
        beReading: 1,
        birthday: '2008-08-05T16:00:00.000+0000',
        campusName: 'xxx',
        courseCounselorId: '527',
        courseCounselorName: '张静',
        createByName: '张静',
        email: '',
        fatherMobile: '',
        fatherName: '',
        grade: '5',
        gradelable: '五年级',
        id: 'asdasdasdsad',
        idcardno: '',
        inSession: 0,
        knownChannleLabel: '朋友介绍',
        mobile: '123',
        motherMobile: '',
        motherName: '',
        name: '哈哈哈',
        no: '123',
        oldAttendClassHighName: null,
        oldAttendClassId: null,
        oldAttendClassIdHigh: null,
        oldAttendClassIdMiddle: null,
        oldAttendClassMiddleName: null,
        oldAttendClassName: '小学',
        paid: 2,
        studentSource: '1',
        sum: 3,
        whetherBoy: true,
        whetherBoyLabel: '男'
      }]
      this.dataList = list.map(item => {
        item.birthday = parseTime(item.birthday, 'y-m-d')
        item.sex = item.whetherBoy ? '男' : '女'
        return item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.apply-box {
  .price-font {
    font-size: 16px;
  }
}
</style>
