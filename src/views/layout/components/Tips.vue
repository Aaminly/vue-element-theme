<template>
  <div v-show="show" class="window-tips-box">
    <div :class="{ ['el-alert--' + tipsConfig.type]: true}" class="el-alert is-center is-dark">
      <i :class="{['el-icon-' + tipsConfig.type]: true}" class="el-alert__icon"/>
      <div class="el-alert__content">
        <span class="el-alert__title" v-html="tipsConfig.message"/>
        <!-- <i class="el-alert__closebtn el-icon-close" @click="close"/> -->
      </div>
    </div>
  </div>
</template>

<script>
import { isChrome } from '@/utils'
export default {
  name: 'WindowTips',
  props: {
    tipsConfig: {
      show: false,
      type: Object,
      default: () => ({
        type: 'success',
        message: ''
      })
    }
  },
  computed: {
    show() {
      return this.tipsConfig.show
    }
  },
  created() {
    if (process.env.NODE_ENV === 'development') {
      // this.tipsConfig = {
      //   show: true,
      //   type: 'warning',
      //   message: process.env.BRANCHES
      // }
    } else {
      if (!isChrome()) {
        this.tipsConfig = {
          show: true,
          type: 'error',
          message: '检测出当前使用的不是谷歌浏览器或版本过低！为获得更好的使用体验，请<a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">下载安装</a>'
        }
      }
    }
  },
  methods: {
    close() {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
.window-tips-box {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  z-index: 9999;
  padding: 0 20px;
  .el-alert {
    border-radius: 0;
    box-shadow: 0 0 10px rgba(#444, 0.2);
    border-radius: 0 0 10px 10px;
    .el-alert__closebtn{
      color: #444 !important;
    }
    a{
      color: #2c79ca;
      display: inline-block;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>
