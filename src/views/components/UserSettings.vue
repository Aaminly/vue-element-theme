<template>
  <div class="user-settings">
    <h3>个人设置</h3>
    <p v-if="!firstEnter">
      <!-- <el-alert :closable="false" title="请修改您的默认密码再进行其他操作！" type="error"/> -->
    </p>
    <div class="theme-picker flex between">
      <h5>
        主题色
        <sup class="act-color">beta</sup>
      </h5>
      <theme-picker/>
    </div>
    <el-collapse v-model="collapseNames" accordion>
      <el-collapse-item title="界面皮肤" name="theme">
        <div class="change-theme">
          <theme/>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="update-time">{{ userInfo.systemUpdateTime }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChangePwd from './ChangePwd'
import Theme from './Theme'
import ThemePicker from './ThemePicker'
export default {
  components: {
    ChangePwd,
    Theme,
    ThemePicker
  },
  data() {
    return {
      role: '',
      collapseNames: 'roles',
      fastNavState: true,
      themeColor: ''
    }
  },
  computed: {
    ...mapGetters(['fastNav', 'userInfo']),
    firstEnter() {
      return this.userInfo.whetherEditPassword
    }
  },
  created() {
    this.fastNavState = this.fastNav
    this.role = this.userInfo.currentRoleId
  },
  methods: {
    toggleFastNav() {
      this.$store.dispatch('toggleFastNav')
    },
    roleChange(role) {
      const { currentRoleId, id } = this.userInfo
      if (this.role !== currentRoleId) {
        this.$confirm('是否确认切换身份?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
        }).catch(() => {
          this.role = this.userInfo.currentRoleId
        })
      }
    }
  }
}
</script>

<style lang="scss">
.user-settings {
  padding: 22px;
  h5 {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .update-time{
    position: absolute;
    bottom: 10px;
    color: #ababab;
    font-size: 12px;
    text-align: center;
  }
  .theme-picker {
    margin-top: 23px;
    align-items: center;
    > div:last-child {
      margin-top: 0;
      height: 28px;
    }
    h5 {
      margin: 0;
    }
    sup {
      color: #444;
      font-weight: 100;
    }
  }
  .fast-nav {
    display: flex;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    h5 {
      margin: 0;
    }
  }
  .el-collapse {
    border: 0 !important;
    .el-collapse-item__header {
      font-weight: bold;
      font-size: 14px;
      color: #000;
      height: 30px;
      line-height: 30px;
      border: 0;
      i {
        line-height: 30px;
      }
    }
    .el-collapse-item__wrap {
      border: 0;
    }
    .el-collapse-item__content {
      padding: 10px 0;
    }
  }
  .change-theme {
    .el-scrollbar {
      height: calc(100vh - 215px);
    }
  }
  .el-radio-group {
    display: block !important;
    .el-radio-button {
      display: block;
      margin-bottom: 5px;
      &:focus:not(.is-focus):not(:active) {
        box-shadow: none;
      }
      .el-radio-button__inner {
        display: block;
        border: 1px solid #ddd;
        border-radius: 5px !important;
        padding: 5px;
        p {
          margin: 0;
          line-height: 16px;
          text-align: left;
        }
      }
      &.is-active {
        .el-radio-button__inner {
          border-color: transparent;
          box-shadow: none;
        }
      }
    }
  }
}
</style>
