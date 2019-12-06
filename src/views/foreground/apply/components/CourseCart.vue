<template>
  <div :class="{opened: sidebar.opened}" class="class-car-box">
    <div class="class-car-box-left">
      <el-popover placement="top-start" title="购课车" width="600" trigger="click">
        <ul class="car-list">
          <li v-show="!list.length">未选择班级</li>
          <li v-for="item in list" :key="item.id">
            <span>{{ item.campusName }} - {{ item.className }}</span>
            <span class="price-font">￥{{ item.totalPrice }}</span>
            <i class="el-icon-delete" @click="delClass(item.id)"/>
          </li>
        </ul>
        <div slot="reference" class="count">
          <img :src="shuImg">
          <span class="price-font">X</span>
          <span class="price-font">{{ list.length }}</span>
        </div>
      </el-popover>
    </div>
    <div class="class-car-box-right">
      <span class="price-font">CNY：</span>
      <count-num :num="totalPrice" :size="28"/>
      <div class="btn" @click="toPay">
        <span>{{ list.length ? '去结算' : '请报名' }}</span>
        <el-progress
          :show-text="false"
          :stroke-width="89"
          :percentage="100"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CourseCart',
  inject: ['sid'],
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'theme', 'courseCart']),
    shuImg() {
      return require(`@/assets/theme/${this.theme}-theme/images/shu.png`)
    },
    totalPrice() {
      return this.list.map(item => item.totalPrice).reduce((s, n) => +s + +n, 0)
    }
  },
  destroyed() {
    this.$el.style.display = 'none'
  },
  methods: {
    toPay() {
      if (!this.list.length) return
      this.$router.push({ path: '/foreground/apply/pay/' + this.sid })
    },
    delClass(id) {
      this.$store.dispatch('delCourseCart', { id, studentId: this.sid }).then(() => {
        this.refresPopover()
      })
    },
    refresPopover() {
      // 触发resize，让poppover跟随选框，不兼容IE
      const resize = new Event('resize')
      setTimeout(() => {
        window.dispatchEvent(resize)
      }, 66)
    }
  }
}
</script>
<style lang="scss">
.class-car-box {
  .el-progress-bar__outer {
    &,
    > .el-progress-bar__inner {
      border-radius: 0 !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.car-list {
  padding: 0 15px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    span {
      &:first-child {
        width: 350px;
      }
      &:nth-child(2) {
        width: 150px;
        color: #000;
        font-size: 18px;
        font-weight: 700;
      }
    }
    &:not(:last-child) {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    i {
      cursor: pointer;
    }
  }
}
@keyframes class-car {
  from {
    bottom: -89px;
  }
  to {
    opacity: 1;
    bottom: 0;
  }
}
.class-car-box {
  position: fixed;
  left: 36px;
  bottom: -89px;
  z-index: 4;
  width: calc(100vw - 36px);
  height: 89px;
  background: rgba(#fafafa, 0.8);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #f3f3f3;
  transition: all 0.2s;
  animation: class-car 0.3s ease-in-out 0.5s 1 alternate forwards;
  display: flex;
  justify-content: space-between;
  opacity: 0;
  &.opened {
    left: 260px;
    width: calc(100vw - 260px);
  }
  &-left {
    .count {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 136px;
      height: 53px;
      line-height: 53px;
      border: 1px solid #ededed;
      background: #fff;
      margin: 18px 0 0 18px;
      border-radius: 30px;
      cursor: pointer;
      span {
        font-weight: bold;
        padding-left: 10px;
        &:nth-child(2) {
          padding-top: 7px;
        }
        &:last-child {
          font-size: 26px;
          padding-left: 10px;
        }
      }
    }
  }
  &-right {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-weight: bold;
    .btn {
      width: 257px;
      margin-left: 20px;
      position: relative;
      cursor: pointer;
      span {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 89px;
        color: #fff;
        font-weight: 400;
      }
    }
  }
}
</style>
