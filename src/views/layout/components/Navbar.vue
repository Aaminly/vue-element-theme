<template>
  <div class="navbar">
    <div class="left-native">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"
      />
      <breadcrumb class="breadcrumb-container"/>
    </div>
    <div class="right-avatar">
      <!-- <i class="el-icon-question question" title="问卷调查" @click="$refs.question.comp.show = true"/> -->
      <fast-nav/>
      <Weather/>
      <el-dropdown class="avatar-container" trigger="click" size="small" @command="handleCommand">
        <div class="avatar-wrapper">
          <p>
            {{ userInfo.userName }}
            <el-tag size="mini" class="act-color">{{ userInfo.currentRoleName }}</el-tag>
          </p>
          <p>{{ userInfo.currentCampusNames }}</p>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="userSettings">
            <svg-icon icon-class="setting" style="margin-right: 5px;"/>个人设置
          </el-dropdown-item>
          <!-- <el-dropdown-item command="wifi">
            <svg-icon icon-class="wifi" style="margin-right: 5px;"/>网络测速
          </el-dropdown-item> -->
          <el-dropdown-item command="tijian">
            <svg-icon icon-class="tijian" style="margin-right: 5px;"/>系统体检
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
            <svg-icon icon-class="logout" style="margin-right: 5px;"/>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <speed-test ref="speedtest"/>
    <tijian ref="tijian"/>
    <!-- <question-naire ref="question"/> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import FastNav from './FastNav'
import Weather from './Weather'
import SpeedTest from '@/components/SpeedTest'
import QuestionNaire from '@/components/QuestionNaire'
import Tijian from '@/components/Tijian'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Weather,
    FastNav,
    SpeedTest,
    QuestionNaire,
    Tijian
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    handleCommand(command) {
      switch (command) {
        case 'userSettings':
          this.$store.dispatch('toggleDrawer')
          break
        case 'wifi':
          this.$refs.speedtest.comp.show = true
          break
        case 'tijian':
          this.$refs.tijian.comp.show = true
          break
        case 'logout':
          this.$store.dispatch('fedLogOut').then(() => {
            this.$router.push({ path: '/login' })
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
          break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  border-radius: 0px !important;
  border: 0 !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 10px;
  position: relative;
  z-index: 2;
  .hamburger-container {
    padding: 3px 10px 0;
  }
  .left-native{
    display: flex;
    height: 84px;
    line-height: 84px;
  }
  .right-avatar {
    display: flex;
    align-items: center;
    height: 46px;
    line-height: 46px;
    .question{
      font-size: 26px;
      cursor: pointer;
    }
    p {
      margin: 0;
      line-height: 16px;
      font-size: 14px;
    }
    & > div:not(.fast-nav-box) {
      background: rgba(#ebeef1, 0.7);
      box-shadow: 0 0 8px rgba(#ccc, 0.9);
      height: 46px;
      margin-left: 20px;
      line-height: 46px;
      padding: 0 20px;
      border-radius: 25px;
      &:last-child {
        p {
          &:first-child {
            padding-top: 6px;
            color: #000;
            span {
              color: #848585;
              font-size: 12px;
              padding-left: 8px;
            }
          }
          &:last-of-type {
            font-size: 12px;
            color: #848585;
          }
        }
      }
    }
  }
  .avatar-container {
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -10px;
        top: 17px;
        font-size: 12px;
      }
    }
  }
}
</style>
