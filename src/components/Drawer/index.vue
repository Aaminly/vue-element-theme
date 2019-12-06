<template>
  <div ref="plugDrawer" :class="'plug-drawer plug-drawer-' + position">
    <div class="plug-drawer-mask" @click="toggleDrawer"/>
    <div :style="{width: oWidth, height: oHeight}" class="plug-drawer-content-wrapper">
      <div class="plug-drawer-content">
        <div class="plug-drawer-body">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    position: {
      type: String,
      default: 'right'
    },
    closable: { // 是否支持点击遮罩层关闭
      type: Boolean,
      default: true
    },
    width: {
      type: String | Number,
      default: 300
    },
    height: {
      type: String | Number,
      default: 300
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['drawer']),
    oWidth() {
      return (this.width | 0) !== 0 ? this.width + 'px' : this.width
    },
    oHeight() {
      switch (this.position) {
        case 'right':
          return '100%'
      }
      return (this.height | 0) !== 0 ? this.height + 'px' : this.height
    }
  },
  watch: {
    drawer(val) {
      val && this.toggleDrawer()
    }
  },
  methods: {
    toggleDrawer() {
      const drawer = this.$refs.plugDrawer
      const drawerContent = drawer.querySelector('.plug-drawer-content-wrapper')
      if (drawer.classList.contains('plug-drawer-open')) {
        if (!this.closable) return
        drawerContent.style.transform = 'translateX(' + this.oWidth + ')'
        setTimeout(() => {
          drawer.classList.remove('plug-drawer-open')
        }, 200)
        this.$store.dispatch('toggleDrawer', false)
      } else {
        if (this.drawer) {
          drawer.classList.add('plug-drawer-open')
          drawerContent.style.transform = 'translateX(0)'
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@keyframes antdDrawerFadeIn {
  0% {
    opacity: 0;
  }
  to {
    opacity: 0.3;
  }
}
.plug-drawer {
  position: fixed;
  top: 0;
  width: 0;
  height: 100%;
  z-index: 99999;
  &-mask {
    position: fixed;
    width: 100%;
    height: 0;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.65);
    filter: alpha(opacity=50);
    transition: opacity 0.3s linear, height 0s ease 0.3s;
  }
  &-content-wrapper {
    position: fixed;
    width: 0;
  }
  &-right {
    .plug-drawer-content-wrapper {
      right: 0;
      transform: translateX(100%);
      overflow-y: auto;
    }
  }
  &.plug-drawer-open {
    width: 100%;
    transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    .plug-drawer-mask {
      opacity: 0.3;
      height: 100%;
      animation: antdDrawerFadeIn 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
      transition: none;
    }
    .plug-drawer-content-wrapper {
      transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86) 0s,
        width 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86) 0s;
      background: #fff;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
