<template>
  <section :class="{ 'app-main': true, 'not-home': key !== '/index' }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews" max="10">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    ...mapGetters(['cachedViews', 'fastNav']),
    key() {
      const { fullPath, meta: { animation = true } } = this.$route
      return animation ? fullPath : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  width: calc(100% - 44px);
  position: relative;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
.app-main {
  &.not-home {
    margin-bottom: 22px !important;
    > div:only-child{
      flex-grow: 1;
    }
    .not-boxshadow{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      > .boxshadow:not(:first-child){
        flex-grow: 1;
      }
    }
    > div:not(.not-boxshadow),
    > div.not-boxshadow .boxshadow{
      padding: 22px;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      background: rgba(255, 255, 255, 0.65);
      border-radius: 6px;

    }
  }
}
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
