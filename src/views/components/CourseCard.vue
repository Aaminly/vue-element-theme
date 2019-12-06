<template>
  <div class="course-card-box">
    <div class="course-card-box-print">
      <q-r-canvas :options="config" class="qrcode"/>
      <p>
        <i>姓名</i>
        <b>{{ info.studentName }}</b>
      </p>
      <p>
        <i>学员号</i>
        <b>{{ info.studentNo }}</b>
      </p>
      <p>
        <i>校区 / 教室 / 金额</i>
        <b>{{ info.campusName }} / {{ info.classroomName }} / ￥{{ info.realPayment || 0 }}元</b>
      </p>
      <p>
        <i>日期</i>
        <b>{{ info.startTime | parseTime('y-m-d') }} ~ {{ info.endTime | parseTime('y-m-d') }}</b>
      </p>
      <p>
        <i>班级</i>
        <b>{{ info.className }}</b>
      </p>
      <div class="time">
        <p>
          <i>上课时间</i>
          <b>{{ info.timeslotName }}</b>
        </p>
        <p>
          <i>任课老师</i>
          <b>{{ info.teacherName }}</b>
        </p>
        <p>
          <i>听课证编号</i>
          <b>{{ info.no }}</b>
        </p>
      </div>
      <div class="stub">
        <q-r-canvas :options="config" class="qrcode"/>
        <p>
          <i>姓名 / 学员号</i>
          <b>{{ info.studentName }} / {{ info.studentNo }}</b>
        </p>
        <p>
          <i>校区 / 教室 / 资金收款 / 余额</i>
          <b>{{ info.campusName }} / {{ info.classroomName }} /￥{{ (info.realPayment-info.balance).toFixed(2) }} /￥{{ info.balance }}</b>
        </p>
        <p>
          <i>日期</i>
          <b>{{ info.startTime | parseTime('y-m-d') }} ~ {{ info.endTime | parseTime('y-m-d') }}</b>
        </p>
        <p>
          <i>班级</i>
          <b>{{ info.className }}</b>
        </p>
        <div class="time">
          <p>&nbsp;</p>
          <p>
            <i>上课时间 / 任课老师</i>
            <b>{{ info.timeslotName }} / {{ info.teacherName }}</b>
          </p>
          <p>
            <i>听课证编号</i>
            <b>{{ info.no }}</b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QRCanvas } from 'qrcanvas-vue'
export default {
  name: 'CourseCard',
  components: {
    QRCanvas
  },
  props: {
    info: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      config: {
        data: this.info.studentNo,
        size: 50
      }
    }
  },
  watch: {
    info: {
      deep: true,
      immediate: true,
      handler() {
        this.$nextTick(() => {
          const canvas = [...document.querySelectorAll('.course-card-box canvas')]
          canvas.forEach(item => {
            const qrImg = this.convertCanvasToImage(item)
            item.parentNode.replaceChild(qrImg, item)
          })
        })
      }
    }
  },
  methods: {
    convertCanvasToImage(canvas) {
      var image = new Image()
      image.src = canvas.toDataURL('image/png')
      image.className = 'qr-code-img'
      return image
    }
  }
}
</script>

<style lang="scss">
.course-card-box {
  background: url(../../assets/images/card.png) no-repeat;
  background-size: cover;
  &-print {
    font-size: 12px;
    width: 100%;
    height: 460px;
    padding: 100px 0 0 20px;
    position: relative;
    .qr-code-img {
      width: 50px;
      height: 50px;
    }
    p {
      margin: 0 0 5px 0;
      i {
        display: block;
        height: 20px;
        line-height: 20px;
        color: #949292;
      }
      b {
        color: #000;
        height: 30px;
        line-height: 30px;
      }
    }
    > .time {
      position: absolute;
      left: 210px;
      top: 120px;
      text-align: right;
    }
    > .stub {
      width: 300px;
      position: absolute;
      top: 160px;
      right: -45px;
      transform: rotate(-90deg);
      p {
        margin: 0;
        margin-left: -45px;
        i,
        b {
          height: 16px;
          line-height: 16px;
        }
        &:nth-child(2) {
          padding-top: 20px;
        }
      }
      .time {
        position: absolute;
        right: 0;
        top: 30px;
        text-align: right;
      }
      .qr-code-img {
        position: absolute;
        right: 0;
        top: 8px;
      }
    }
  }
}
</style>
