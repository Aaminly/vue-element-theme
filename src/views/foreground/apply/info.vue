<template>
  <div class="info-box not-boxshadow">
    <student ref="studentInfo" :sid="sid" :is-edit="true"/>
    <div class="info-box-content boxshadow">
      <el-button
        v-show="notShowTabs"
        type="goback"
        icon="el-icon-arrow-left"
        @click="$router.push({name: gobackRouteName})"
      >返回</el-button>
      <div v-show="notShowTabs" class="info-box-content-link">
        <el-tabs v-model="linkActived" :before-leave="tabClickBefore">
          <el-tab-pane
            v-for="link in linkList"
            :key="link.name"
            :name="link.name"
            :label="link.label"
          />
        </el-tabs>
      </div>
      <div class="info-box-content-view">
        <keep-alive include="ClassQuery">
          <router-view @freshStudent="$refs.studentInfo.getStudentInfo()"/>
        </keep-alive>
      </div>
    </div>
    <Dialog
      ref="printCard"
      :title="`听课证打印 ${printCardInfo.length === 1 ? '' : '（' + (carouselIndex + 1) + ' / ' + printCardInfo.length + '）'}`"
      width="1000px"
      @close="$store.commit('SET_PRINT_CARD', [])"
    >
      <el-carousel :autoplay="false" arrow="always" trigger="click" type="card" height="460px" @change="i => carouselIndex = i">
        <el-carousel-item v-for="(info, index) in printCardInfo" :key="index" style="width: 576px; left: -48px;">
          <course-card ref="courseCard" :info="info"/>
        </el-carousel-item>
      </el-carousel>
      <el-button slot="footer" type="primary" class="print-btn" @click="printCard">打印</el-button>
    </Dialog>
  </div>
</template>

<script>
import Student from './student'
import Dialog from '@/components/Dialog'
import CourseCard from '@/views/components/CourseCard'
import Print from '@/plugins/print'
const LINK = [
  {
    label: '班级查询',
    name: 'ClassQuery'
  },
  {
    label: '在读班级',
    name: 'AttendClass'
  },
  {
    label: '已结课班级',
    name: 'FinishedClass'
  },
  {
    label: '支付完成',
    name: 'PayFinish'
  },
  {
    label: '转班记录',
    name: 'ChangeClassRecord'
  },
  {
    label: '调课记录',
    name: 'CurriculumAdjustRecord'
  },
  {
    label: '退费记录',
    name: 'RefundRecordApply'
  },
  {
    label: '候补记录',
    name: 'RepairRecord'
  },
  {
    label: '其他收费',
    name: 'ApplyOtherPayment'
  },
  {
    label: '订单',
    name: 'Order'
  },
  {
    label: '未完成订单',
    name: 'UnfinishedOrder'
  },
  {
    label: '支付记录',
    name: 'PaymentRecord'
  },
  {
    label: '余额',
    name: 'Balance'
  }
]

export default {
  name: 'StudentInfo',
  components: {
    Student,
    Dialog,
    CourseCard
  },
  provide() {
    return {
      sid: this.sid
    }
  },
  data() {
    return {
      linkList: LINK,
      notShowTabs: true,
      linkActived: 'ClassQuery',
      printCardInfo: [],
      gobackRouteName: 'ApplyList',
      carouselIndex: 0
    }
  },
  computed: {
    sid() {
      return this.$route.params.id
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (from.name === 'OtherPaymentList') vm.gobackRouteName = from.name
    })
  },
  watch: {
    '$store.getters.printCard': {
      deep: true,
      handler(info) {
        this.printCardInfo = info
        if (info.length !== 0) this.$refs.printCard.show = true
      }
    },
    '$route.path'() {
      if (this.linkActived.name) this.linkActived = this.$route.name
      this.notShowTabs = this.$route.name !== 'Withdrawal'
    }
  },
  created() {
    this.linkActived = this.$route.name
  },
  methods: {
    tabClickBefore(navName) {
      const { name } = this.linkList.find(item => item.name === navName)
      this.$router.push({ name })
    },
    printCard() {
      const list = this.printCardInfo
      let printHtm = document.createElement('div')
      printHtm.setAttribute('style', 'width: 576px; margin: 0 auto;')
      const style = document.createElement('style')
      style.setAttribute('media', 'print')
      style.innerHTML = '@page{ size: portrait; }'
      printHtm.appendChild(style)
      list.forEach((info, index) => {
        const div = document.createElement('div')
        index > 0 && div.setAttribute('style', 'page-break-before:always')
        div.appendChild(this.$refs.courseCard[index].$el.children[0])
        printHtm.appendChild(div)
      })
      Print(printHtm)
      printHtm = null
      this.$refs.printCard.show = false
    }
  }
}
</script>

<style lang="scss">
.info-box {
  .el-tabs__header {
    margin-bottom: 5px;
  }
  .el-carousel__mask{
    background-color: #000;
  }
}
.print-btn {
  display: block !important;
  margin: 20px auto 0 !important;
}
</style>

<style lang="scss" scoped>
.info-box {
  position: relative;
  &-content {
    &-link {
      padding-top: 10px;
      margin: -43px 0 0 110px;
      position: relative;
      &:after{
        content: "";
        position: absolute;
        left: -110px;
        height: 0px;
        width: calc(100% + 110px);
        border-bottom: 1px solid #f0f0f0;
      }
      a {
        padding: 0 11px;
        color: #7d7d7d;
      }
    }
    &-view {
      padding: 14px 0;
    }
  }
}
</style>
