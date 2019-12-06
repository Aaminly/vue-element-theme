<template>
  <el-dialog
    :title="oTitle"
    :width="width"
    :top="top"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :class="{dialog: true, 'window-max': windowMax, 'window-min': windowMin}"
    :modal-append-to-body="appendToBody"
    :append-to-body="appendToBody"
    center
    @click.native="windowSwitch"
    @close="closed"
  >
    <div class="dialog-tools">
      <i class="el-icon-minus" title="最小化" @click.stop="windowSwitch"/>
      <i :title="windowMax ? '还原' : '最大化'" @click="windowMax = !windowMax">
        <svg-icon :icon-class="windowMax ? 'wmin' : 'wmax'"/>
      </i>
    </div>
    <slot/>
    <slot name="footer"/>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    width: {
      type: String,
      default: '70%'
    },
    title: {
      type: String,
      default: '标题'
    },
    top: {
      type: String,
      default: '70px'
    },
    modal: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      windowMin: false,
      windowMax: false,
      oTitle: '',
      visible: false,
      show: null
    }
  },
  watch: {
    title: {
      handler() {
        this.oTitle = this.title
      },
      immediate: true
    },
    show() {
      if (this.show !== null) {
        this.visible = this.show
        if (this.windowMin) this.windowMin = false
        this.$emit('opend')
      }
      this.show = null
    }
  },
  created() {
    this.hasModal = this.model
  },
  methods: {
    setTitle(title) {
      this.oTitle = title
    },
    closed() {
      this.$emit('close')
    },
    windowSwitch({ target }) {
      if (target.className === 'el-icon-minus' || this.windowMin) {
        this.windowMin = !this.windowMin
      }
    }
  }
}
</script>

<style lang="scss">
.dialog {
  transition: all 0.3s;
  .el-dialog {
    min-width: 350px;
  }
  &.window-min {
    top: auto;
    left: auto;
    bottom: 35px;
    right: 40px;
    width: 100px;
    height: 60px;
    overflow: hidden;
    box-shadow: 0 0 10px #ccc;
    opacity: 0.7;
    background: #fff;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
    & + div,
    & > div {
      display: none;
    }
    &:after {
      content: "弹出框";
      position: absolute;
      top: 0;
      width: 100px;
      height: 20px;
      line-height: 20px;
      background: #f5f5f5;
      font-size: 12px;
      text-align: center;
      color: #999;
    }
    &:before {
      content: "点击还原";
      position: absolute;
      width: 100px;
      top: 33px;
      font-size: 12px;
      text-align: center;
    }
  }
  &.window-max {
    background: #fff;
    .el-dialog {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      box-shadow: none;
    }
  }
  .el-dialog__header {
    background: #f5f5f5;
    padding: 10px 0 9px !important;
    border-bottom: 1px solid #eee;
    .el-dialog__headerbtn {
      top: 15px;
    }
  }
  .el-dialog__body {
    .btn {
      width: 100%;
      margin: 10px 0 0 0 !important;
      > div {
        display: flex !important;
        justify-content: center;
      }
    }
  }
  .dialog-tools {
    position: absolute;
    right: 47px;
    top: 15px;
    font-size: 12px;
    display: flex;
    align-items: center;
    width: 42px;
    height: 17px;
    i {
      cursor: pointer;
      color: #0a76a4;
    }
    .el-icon-minus {
      font-size: 17px;
      margin: 0 13px 0 0;
    }
  }
}
</style>
