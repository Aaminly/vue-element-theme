<template>
  <div class="student-info-box boxshadow">
    <div class="student-info-box-left">
      <div>
        <h1>{{ studentInfo.name }}</h1>
        <p>
          <span>
            <b class="act-bg">性别</b>
            <b class="act-data">{{ sex[+studentInfo.whetherBoy] }}</b>
          </span>
          <span>
            <b class="act-bg">了解渠道</b>
            <b class="act-data">{{ studentInfo.knownChannleLabel }}</b>
          </span>
          <span v-if="studentInfo.oldAttendClassName">
            <b class="act-bg">学校</b>
            <b class="act-data">{{ studentInfo.oldAttendClassName }}</b>
          </span>
          <span v-if="studentInfo.referralCode">
            <b class="act-bg">推荐码</b>
            <b class="act-data">{{ studentInfo.referralCode }}</b>
          </span>
          <span>
            <b class="act-bg">年级</b>
            <b class="act-data">{{ studentInfo.gradeLabel }}</b>
          </span>
          <span v-for="{subjectId, label, entryScore} in studentInfo.entryScore" :key="subjectId">
            <b class="act-bg">{{ label }}</b>
            <b class="act-data">{{ entryScore }}</b>
          </span>
          <span>
            <b class="act-bg">余额</b>
            <b>{{ '￥'+studentInfo.balance }}</b>
          </span>
        </p>
      </div>
      <p>
        <span>
          <b class="act-bg">注册</b>
          <b>{{ studentInfo.createDate | parseTime }}</b>
        </span>
        <span>
          <b class="act-bg">生日</b>
          <b>{{ studentInfo.birthday }}</b>
        </span>
        <span>
          <b class="act-bg">学号</b>
          <b>{{ studentInfo.no }}</b>
        </span>
        <span>
          <b class="act-bg">
            <i class="el-icon-phone-outline" />
          </b>
          <b>{{ studentInfo.mobile }}</b>
        </span>
        <span v-if="studentInfo.address">
          <b class="act-bg">地址</b>
          <b>{{ studentInfo.address }}</b>
        </span>
        <span v-if="studentInfo.fatherMobile">
          <b class="act-bg">
            父
            <i class="el-icon-phone-outline" />
          </b>
          <b>{{ studentInfo.fatherMobile }}</b>
        </span>
        <span v-if="studentInfo.motherMobile">
          <b class="act-bg">
            母
            <i class="el-icon-phone-outline" />
          </b>
          <b>{{ studentInfo.motherMobile }}</b>
        </span>
      </p>
    </div>
    <div v-if="isEdit" :class="{opened}" class="student-info-box-right">
      <div class="switch-btn act-color" @click="opened = !opened">
        <template v-if="opened">
          <i class="el-icon-close" title="关闭" />
        </template>
        <template v-else>
          <span>编辑</span>
          <i class="el-icon-d-arrow-left" />
        </template>
      </div>
      <div v-show="opened" class="student-info-box-right-content">
        <achievement :is-edit="true" :small-size="true" :entry-score.sync="studentInfo.entryScore" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Achievement from '@/views/components/Achievement'
import { parseTime } from '@/utils'
export default {
  components: {
    Achievement
  },
  props: {
    sid: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      opened: false,
      infoLoading: true,
      studentInfo: {},
      balanceCampus: 0
    }
  },
  computed: {
    ...mapGetters(['sex', 'constant'])
  },
  created() {
    this.studentInfo = {
      address: null,
      balance: 0,
      balanceCampus: 0,
      birthday: '2019-12-06T00:00:00.000+0000',
      courseCounselorId: '1',
      courseCounselorName: '微信营业厅',
      createBy: '6367ad6bb91648cc86865ef32f49302e',
      createDate: '2019-12-06T02:38:30.000+0000',
      email: null,
      entryScore: [],
      fatherMobile: null,
      fatherName: null,
      fatherSmsEnable: null,
      grade: '5',
      gradeLabel: '五年级',
      id: 'e66cab8f01544070ae9ba475b397748c',
      idcardno: null,
      knownChannle: '4',
      knownChannleLabel: '互联网',
      mobile: '187****7740',
      motherMobile: null,
      motherName: null,
      motherSmsEnable: null,
      name: '包青天',
      no: '987654123',
      oldAttendClassCityId: '1514',
      oldAttendClassCityIdHigh: null,
      oldAttendClassCityIdMiddle: null,
      oldAttendClassHighName: null,
      oldAttendClassId: '61d34a53b26441afbaabaccfa48b105a',
      oldAttendClassIdHigh: null,
      oldAttendClassIdMiddle: null,
      oldAttendClassMiddleName: null,
      oldAttendClassName: '开封市包青天小学',
      referralCode: null,
      remarks: null,
      updateDate: '2019-12-06T02:38:30.000+0000',
      whetherBoy: false
    }
    this.studentInfo.birthday = parseTime(this.studentInfo.birthday, 'y-m-d')
    const { entryScore, balanceCampus } = this.studentInfo
    this.$emit('getBalanceCampus', balanceCampus)
    this.studentInfo.entryScore = entryScore.map(item => {
      item.value = item.subjectId
      item.label = this.constant.subject.find(v => v.value === item.subjectId).label
      return item
    })
  },
  methods: {
    getStudentInfo() {
      this.infoLoading = true
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes achievement {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.student-info-box {
  margin-bottom: 22px;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-right: 100px;
  .act-bg {
    border-radius: 3px 0 0 3px;
  }
  .act-data {
    border-radius: 0 3px 3px 0;
  }
  &::before {
    content: "";
    position: absolute;
    top: 10%;
    left: -3px;
    width: 3px;
    height: 80%;
    border-radius: 6px 0 0 6px;
  }
  &-left {
    h1 {
      margin: 0 20px 0 0;
    }
    > div {
      display: flex;
      align-items: flex-end;
    }
    p {
      margin: 10px 0 0 0;
      display: flex;
      > span {
        display: inline-flex;
        color: #fff !important;
        font-size: 14px;
        padding-right: 0;
        margin-right: 10px;
        border-radius: 3px;
        b:last-child {
          color: #444;
          padding-left: 5px;
          background: #ececec;
        }
        b,
        span {
          padding: 0 6px;
          font-weight: initial;
          &:first-child {
            font-weight: 100;
          }
        }
      }
    }
  }
  &-right {
    position: absolute;
    top: 0;
    right: 0;
    background: #f9f9f9;
    width: 40px;
    height: 100%;
    transition: width 0.3s;
    border-radius: 0 6px 6px 0;
    .achievement-box {
      opacity: 0;
    }
    &.opened {
      width: 500px;
      .achievement-box {
        animation: achievement 0.3s ease-in-out 0.3s 1 alternate forwards;
      }
      .switch-btn {
        top: 20px;
        right: 20px;
      }
    }
    &::before {
      content: "";
      position: absolute;
      left: -30px;
      background: #f9f9f9;
      border-radius: 50%;
      width: 65px;
      height: 100%;
      filter: drop-shadow(-5px -1px 5px #f1f1f1);
    }
    .switch-btn {
      position: absolute;
      top: 50%;
      right: 30px;
      z-index: 4;
      transform: translateY(-50%);
      width: 10px;
      cursor: pointer;
    }
    &-content {
      position: relative;
      z-index: 3;
      padding: 22px 22px 0 0;
    }
  }
}
</style>
