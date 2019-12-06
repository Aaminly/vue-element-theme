<template>
  <div class="class-query-box">
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.particularYearForIdentity" clearable placeholder="年份">
            <el-option
              v-for="item in constant.particular_year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.seasonForIdentity" clearable placeholder="季节">
            <el-option
              v-for="item in constant.season"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.projectTypeForIdentity" clearable placeholder="类别">
            <el-option
              v-for="item in constant.project_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.department" clearable placeholder="学部">
            <el-option
              v-for="item in filterDepartment(select.gradeForIdentity)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.gradeForIdentity" clearable placeholder="年级">
            <el-option
              v-for="item in filterGrade(select.department)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.subjectForIdentity" clearable placeholder="科目">
            <el-option
              v-for="item in filterSubject(select.gradeForIdentity)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.classTypeForIdentity" clearable placeholder="班型">
            <el-option
              v-for="item in constant.class_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.periodsForIdentity" clearable placeholder="期别">
            <el-option
              v-for="item in constant.periods"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-input
            v-model.trim="select.teacherName"
            clearable
            placeholder="教师姓名"
            @keyup.enter.native="fetchData('search')"
          />
        </div>
        <div>
          <el-date-picker
            v-model="select.beginClassDateString"
            type="date"
            placeholder="开课日期"
            value-format="yyyy-MM-dd"/>
        </div>
        <div>
          <el-date-picker
            v-model="select.endClassDateString"
            type="date"
            placeholder="结课日期"
            value-format="yyyy-MM-dd"/>
        </div>
        <div>
          <el-input
            v-model.trim="select.className"
            clearable
            placeholder="班级名称"
            @keyup.enter.native="fetchData('search')"
          />
        </div>
        <div>
          <el-cascader
            :options="constant.campus_city_param"
            v-model="campus"
            :props="{label: 'name', value:'id'}"
            :show-all-levels="false"
            placeholder="所属校区"
            clearable
            change-on-select
            @change="val => getLastVal(val, 'adminOrganIds')"
          />
        </div>
        <div class="checkbox-list">
          <div class="class-list">
            <el-checkbox v-model="select.whetherShowHadEndClass" label="已结课班级"/>
            <el-checkbox v-model="select.whetherOnlyShowNotFullClass" label="仅未满班级"/>
          </div>
        </div>
        <div class="inline">
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="resetSearch('campus,timeslotType,classWeekDay')">重置搜索条件</el-button>
          <el-button
            v-permission="['4-1']"
            v-if="isExport"
            type="primary"
            icon="el-icon-download"
            @click="exportFile(exportConfig)"
          >导出</el-button>
        </div>
      </div>
    </div>
    <comm-table
      :data="dataList"
      :columns="columns"
      :page-slot="whetherPageSlot"
    >
      <div slot-scope="{row}">
        <slot :row="row">
          <el-button
            :disabled="whetherInSelectedClass(row.id)"
            type="text"
            @click="e => apply(e, row)"
          >{{ row.whetherExcess ? '候补' : '报名' }}</el-button>
        </slot>
      </div>
    </comm-table>
    <template v-if="isApply">
      <course-cart :list="courseCart"/>
      <car-ball ref="carBall"/>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import CourseCart from './CourseCart'
import CarBall from '@/views/components/CarBall'
import { exportPxxclassListForReception } from '@/api/exportFile'
export default {
  name: 'ClassQuery',
  inject: ['sid'],
  components: {
    CourseCart,
    CarBall
  },
  mixins: [tables],
  props: {
    isApply: {
      type: Boolean,
      default: true
    },
    isOperation: {
      type: Boolean,
      default: true
    },
    isExport: {
      type: Boolean,
      default: false
    },
    campusCity: {
      type: Boolean,
      default: false
    },
    classSettings: {
      type: Object,
      default: () => {}
    },
    inClassTimes: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      exportConfig: {
        api: exportPxxclassListForReception,
        title: '班级列表'
      },
      campus: [],
      timeslotType: [],
      classWeekDay: [],
      select: {
        department: '',
        particularYearForIdentity: '',
        adminOrganIds: '',
        seasonForIdentity: '',
        teacherName: '',
        periodsForIdentity: '',
        className: '',
        gradeForIdentity: '',
        subjectForIdentity: '',
        timeslotType: '',
        projectTypeForIdentity: '',
        classTypeForIdentity: '',
        classWeekDay: '',
        beginClassDateString: '',
        endClassDateString: '',
        whetherShowHadEndClass: false,
        whetherOnlyShowNotFullClass: false,
        whetherShowInClassTimeAndTimes: false
      },
      dataList: [],
      columns: [
        { label: '校区', prop: 'adminOrganName' },
        {
          label: '班级名称',
          width: 300,
          render: (h, row) => {
            return h('el-button', {
              attrs: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.$router.push({ path: '/foreground/queryClass/classInfo/' + row.id })
                }
              }
            }, row.className)
          }
        },
        { label: '期别', prop: 'periodsName' },
        { label: '重复周期', prop: 'classWeekDayName', width: 80 },
        {
          label: '教师',
          render: (h, row) => {
            return h('el-button', {
              attrs: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.$router.push({ path: '/foreground/queryClass/teacherInfo/' + row.teacherId })
                }
              }
            }, row.teacherName)
          }
        },
        { label: '教室', prop: 'classroomName' },
        { label: '开课/结课日期', prop: ['startClassDate', 'endClassDate'], width: 165, separator: '~' },
        { label: '上课时间', prop: 'timeslotName', width: 120 },
        { label: '剩余/总课次', prop: ['leftTimes', 'totalTimes'], type: 'num', width: 100 },
        { label: '总金额', prop: 'totalPrice', type: 'num', pre: '￥', width: 100 },
        { label: '课时', prop: 'classHours', type: 'num' },
        { label: '招生情况', prop: ['signupNum', 'maxStudentsNum'], type: 'num' },
        { label: '报名人数', prop: 'signupNum', type: 'num' },
        { label: '缴费人数', prop: 'payNum', type: 'num' },
        { label: '剩余名额', prop: 'leftNum', type: 'num' },
        { label: '候补人数', prop: 'waitNum', type: 'num' },
        { label: '操作', type: 'operation', fixed: 'right', width: 50 }
      ],
      selectedClass: [],
      pageSlot: null
    }
  },
  computed: {
    ...mapGetters(['constant', 'courseCart']),
    whetherPageSlot() {
      const { studentTimes = 0, studentNumber = 0 } = this.pageSlot || {}
      return this.pageSlot ? `在班总人次：${studentTimes}人 | 在班总人数：${studentNumber}人` : ''
    }
  },
  created() {
    this.dataList = [
      {
        adminOrganName: '陇海',
        campusName: '陇海',
        classHours: 2,
        className: '2020年春季六年级数学笃学5班(综合)',
        classWeekDay: '4',
        classWeekDayName: '周四',
        classroomId: '280',
        classroomName: '方圆创世A座5楼教室5',
        classroomNo: '04970005',
        createDate: '2019-04-14T09:14:22.000+0000',
        dateslotName: '20春17次周四(郑州)',
        endClassDate: '2020-06-11',
        excessNum: 5,
        id: '54588',
        leftNum: 3,
        leftTimes: 17,
        maxStudentsNum: 25,
        payNum: 22,
        periods: '',
        periodsName: null,
        signupNum: 22,
        startClassDate: '2020-02-20',
        status: '1',
        statusName: '上架',
        teacherId: '810',
        teacherName: '江元元',
        teacherNo: '90105273',
        timeslotName: '18:00-20:00',
        totalPrice: 2040,
        totalTimes: 17,
        updateByName: '闫越洋',
        updateDate: '2019-12-06T06:09:11.000+0000',
        waitNum: '0',
        whetherDelete: false,
        whetherEdit: true,
        whetherExcess: false
      }
    ]
  },
  methods: {
    async apply(e, { id, whetherExcess }) {
      this.$refs.carBall.drop(e.target)
    },
    whetherInSelectedClass(id) {
      return this.courseCart.some(item => item.classId === id)
    }
  }
}
</script>

<style lang="scss">
.class-query-box {
  padding-bottom: 90px;
  .select-tools {
    > div > div {
      margin: 0 10px 10px 0 !important;
      &.inline {
        padding-left: 5px;
        align-items: center;
      }
    }
    margin-bottom: 0;
  }
}
</style>
