<template>
  <div :class="classObj" class="app-wrapper">
    <el-scrollbar wrap-class="main-scroll" view-style="height: 100%;" wrap-style="overflow-x: hidden;" style="height: 100%; z-index: 2">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
      <sidebar class="sidebar-container"/>
      <div class="main-container">
        <navbar/>
        <tags-view v-show="fastNav"/>
        <app-main/>
      </div>
      <drawer>
        <user-settings/>
      </drawer>
      <!-- <update-record/> -->
      <el-backtop target=".main-scroll" bottom="100"/>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import Drawer from '@/components/Drawer'
import UserSettings from '@/views/components/UserSettings'
import UpdateRecord from '@/views/components/UpdateRecord'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    Drawer,
    UserSettings,
    UpdateRecord
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(['sidebar', 'device', 'fastNav']),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
