<template>
  <div class="add-student-box not-boxshadow">
    <div class="add-student-box-left boxshadow">
      <div class="go-back">
        <el-button type="goback" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
      </div>
      <h2 class="title">基本信息</h2>
      <el-form
        ref="student"
        :model="student"
        :rules="rules"
        label-position="top"
        label-width="80px"
        size="midium"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="student.name" style="width: 217px;" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="性别" prop="whetherBoy">
          <el-select v-model="student.whetherBoy" placeholder="请选择性别">
            <el-option
              v-for="(item, index) in $store.state.app.sex"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-select v-model="student.grade" placeholder="请选择年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="常用电话" prop="mobile">
          <el-input v-model.trim="student.mobile" style="width: 317px;" placeholder="请输入常用电话"/>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="student.birthday"
            type="date"
            value-format="timestamp"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="就读学校(必填一项)" prop="oldAttendClassId">
          <div v-for="(item, index) in 3" :key="item" :class="{ 'mb-10': index < 2}" class="inline">
            <el-cascader
              :options="cityTree"
              v-model="schoolSettings[index].city"
              :props="{ checkStrictly: true, value: 'id', label: 'name'}"
              placeholder="行政区划"
              style="width: 200px;"
            />
            <el-select v-model="student[schoolSettings[index].field]" :disabled="!schoolSettings[index].city.length" :placeholder="`请选择${schoolSettings[index].label}`" :remote-method="query => getTargetSchool(query, index, item)" :loading="schoolSettings[index].loading" reserve-keyword remote filterable style="width: 250px;">
              <el-option
                v-for="item in schoolSettings[index].list"
                :key="item.id"
                :label="item.schoolName"
                :value="item.id"/>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="科目入学成绩">
          <achievement
            :entry-score.sync="student.entryScore"
            @achievement="v => student.entryScore = v"
          />
        </el-form-item>
        <el-form-item label="了解渠道" prop="knownChannle">
          <el-select v-model="student.knownChannle" placeholder="请选择了解渠道">
            <el-option
              v-for="item in constant.known_channle"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="操作人" prop="courseCounselorId">
          <el-select v-model="student.courseCounselorId" placeholder="请选择操作人">
            <el-option
              v-for="item in courseCounselorList"
              :key="item.id"
              :label="item.userName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="submit-btn">
            <el-button type="primary" style="width: 300px;" @click="saveStudent">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-student-box-right boxshadow">
      <h2 class="title">更多信息</h2>
      <el-form
        :model="student"
        :rules="rules"
        label-position="top"
        label-width="80px"
        size="midium"
      >
        <el-form-item label="父亲姓名">
          <el-input v-model.trim="student.fatherName" style="width: 217px;" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="父亲电话" prop="fatherMobile">
          <el-input
            v-model.trim="student.fatherMobile"
            style="width: 317px; margin-right: 10px;"
            placeholder="请输入父亲电话"
          />
          <el-checkbox :disabled="!student.fatherMobile" v-model="student.fatherSmsEnable">接收短信通知</el-checkbox>
        </el-form-item>
        <el-form-item label="母亲姓名">
          <el-input v-model.trim="student.motherName" style="width: 217px;" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="母亲电话" prop="motherMobile">
          <el-input
            v-model.trim="student.motherMobile"
            style="width: 317px; margin-right: 10px;"
            placeholder="请输入母亲电话"
          />
          <el-checkbox :disabled="!student.motherMobile" v-model="student.motherSmsEnable">接收短信通知</el-checkbox>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="student.email" style="width: 317px;" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcardno">
          <el-input v-model.trim="student.idcardno" style="width: 317px;" placeholder="请输入身份证号"/>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model.trim="student.address" placeholder="请输入联系地址"/>
        </el-form-item>
        <el-form-item label="备注">
          <el-input :rows="4" v-model.trim="student.remarks" type="textarea" placeholder="请输入备注"/>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Achievement from '@/views/components/Achievement'
import { treeChildrenEmpty, id2Level } from '@/utils'
export default {
  name: 'AddStudent',
  components: {
    Achievement
  },
  data() {
    const checkSchool = (rule, value, callback) => {
      const { oldAttendClassIdMiddle, oldAttendClassIdHigh } = this.student
      if (!value && !oldAttendClassIdMiddle && !oldAttendClassIdHigh) {
        callback(new Error('必须选择一项就读学校!'))
      } else {
        callback()
      }
    }
    return {
      schoolSettings: [
        {
          loading: false,
          city: [],
          list: [{ id: '1', schoolName: '未知' }],
          label: '小学',
          name: '',
          field: 'oldAttendClassId'
        },
        {
          loading: false,
          city: [],
          list: [{ id: '1', schoolName: '未知' }],
          label: '初中',
          name: '',
          field: 'oldAttendClassIdMiddle'
        },
        {
          loading: false,
          city: [],
          list: [{ id: '1', schoolName: '未知' }],
          label: '高中',
          name: '',
          field: 'oldAttendClassIdHigh'
        }
      ],
      student: {
        name: '',
        whetherBoy: null,
        grade: '',
        mobile: '',
        birthday: '',
        oldAttendClassId: '',
        oldAttendClassIdMiddle: '',
        oldAttendClassIdHigh: '',
        courseCounselorId: '',
        fatherName: '',
        fatherMobile: '',
        fatherSmsEnable: '',
        motherName: '',
        motherMobile: '',
        motherSmsEnable: '',
        knownChannle: '',
        email: '',
        idcardno: '',
        address: '',
        remarks: '',
        entryScore: []
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              if (!/^[\u4e00-\u9fa5]{1,}[0-9]{0,}$/g.test(value) || value.length > 10) {
                callback(new Error('请输入以中文开头的正确姓名!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        whetherBoy: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        grade: [{ required: true, message: '请选择年级', trigger: 'change' }],
        mobile: [
          { required: true, min: 11, max: 11, message: '请输入11位常用电话', trigger: 'blur' },
          { pattern: /^\d+$/, message: '请输入正确的电话号码', trigger: 'blur' }
        ],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
        oldAttendClassId: [
          { required: true, validator: checkSchool, trigger: 'change' }
        ],
        knownChannle: [{ required: true, message: '请选择了解渠道', trigger: 'change' }],
        motherMobile: [{ pattern: /^\d{11}$/, message: '请输入正确的手机号', trigger: 'blur' }],
        fatherMobile: [{ pattern: /^\d{11}$/, message: '请输入正确的手机号', trigger: 'blur' }],
        email: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }],
        idcardno: [{ pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/, message: '请输入正确的身份证号', trigger: 'blur' }]
      },
      courseCounselorList: [],
      city: [],
      cityTree: []
    }
  },
  computed: {
    ...mapGetters(['constant', 'userInfo'])
  },
  async created() {
    // this.$store.dispatch('getConstant', ['grade', 'known_channle', 'subject'])
    // this.getCourseCounselor()
    // this.$nextTick(() => {
    //   this.student.courseCounselorId = this.userInfo.id
    // })
    // await this.getCityTree()
    // const { id } = this.$route.params
    // id && this.getStudentInfo(id)
  },
  methods: {
    getCourseCounselor() {
    },
    getCityTree() {
    },
    getSchool(cityId, departmentType, schoolName, index) {
      const item = this.schoolSettings[index]
      item.loading = true
    },
    getTargetSchool(query, index, dep) {
      const item = this.schoolSettings[index]
      const city = item.city
      this.getSchool(city[city.length - 1], dep, query, index)
    },
    saveStudent() {
      this.$refs.student.validate().then(() => {
        const params = {
          Loading: true,
          ...this.student,
          userCampusIds: this.userInfo.currentCampusIds,
          studentSource: 1
        }
        params.entryScore.map(item => {
          delete item.label
          delete item.value
          return item
        })
      }).catch(() => { })
    },
    getStudentInfo(id) {
    }
  }
}
</script>
<style lang="scss">
.add-student-box {
  .el-form-item {
    margin-bottom: 15px !important;
    .el-form-item__label {
      line-height: 28px;
      padding: 0 !important;
      color: #000;
    }
  }
  .inline:last-of-type{
    margin-bottom: 0 !important;
  }
}
</style>
<style lang="scss" scoped>
.add-student-box {
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  &-left,
  &-right {
    width: calc(50% - 11px);
    flex: initial !important;
  }
  .go-back {
    position: absolute;
  }
  .title {
    text-align: center;
    margin-top: 5px;
  }
  .submit-btn {
    text-align: center;
    padding-top: 30px;
  }
}
</style>
