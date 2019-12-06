<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="logo">
      <router-link to="/">
        <div>
          <svg-icon icon-class="theme" class="act-color" style="font-size: 24px; margin: 0 auto"/>
        </div>
        <div>
          <p>主题切换Demo</p>
          <p>Theme Changer</p>
        </div>
      </router-link>
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="activeMenu"
      :collapse="isCollapse"
      :collapse-transition="false"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item
        v-for="route in permission_routers"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    activeMenu() {
      const { meta, path } = this.$route
      // if set path, the sidebar will highlight the path you set
      return meta.activeMenu || path
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  > a {
    display: flex !important;
    height: 116px;
    justify-content: center;
    align-items: center;
    .act-color {
      font-size: 55px;
    }
    > div {
      &:first-child {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        text-align: center;
        line-height: 70px;
        img {
          width: 48px;
        }
      }
      &:last-child {
        width: 140px;
        padding-left: 10px;
        border-radius: 50%;
        > p {
          margin: 0;
          padding-top: 5px;
          line-height: 14px;
          &:first-child {
            font-size: 16px;
            padding-left: 7px;
          }
          &:last-child {
            font-size: 12px;
            transform: scale(0.9);
          }
        }
      }
    }
  }
}
</style>
