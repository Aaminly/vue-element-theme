<template>
  <div class="toast-box">
    <i :class="icon" class="icon"/>
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'warning'
    },
    message: {
      type: String,
      default: ''
    }
  },
  computed: {
    icon() {
      return 'el-icon-' + this.type
    }
  }
}
</script>

<style lang="scss" scoped>
.toast-box {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);
  height: 70px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  & > .icon {
    font-size: 35px;
    padding-right: 10px;
  }
  & > span {
    font-size: 24px;
  }
}
</style>
