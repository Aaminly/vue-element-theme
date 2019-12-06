<template>
  <div class="car-ball-box">
    <transition
      v-for="(ball, index) in balls"
      :key="index"
      name="drop"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div v-show="ball.show" :class="{opened}" class="ball">
        <div class="inner inner-hook"/>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: []
    }
  },
  computed: {
    opened() {
      return this.$store.state.app.sidebar.opened
    }
  },
  methods: {
    drop(el) {
      // 触发一次事件就会将所有小球进行遍历
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) { // 将false的小球放到dropBalls
          ball.show = true
          ball.el = el // 设置小球的el属性为一个dom对象
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter(el) { // 这个方法的执行是因为这是一个vue的监听事件
      let count = this.balls.length
      while (count--) {
        const ball = this.balls[count]
        if (ball.show) {
          const rect = ball.el.getBoundingClientRect() // 获取小球的相对于视口的位移(小球高度)
          const x = rect.left - (this.opened ? 300 : 80)
          const y = -(window.innerHeight - rect.top - 60) // 负数,因为是从左上角往下的的方向
          el.style.display = '' // 清空display
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          // 处理内层动画
          const inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter(el, done) { // 这个方法的执行是因为这是一个vue的监听事件
      /* eslint-disable no-unused-vars */
      const rf = el.offsetHeight // 触发重绘html
      this.$nextTick(() => { // 让动画效果异步执行,提高性能
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        // 处理内层动画
        const inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done) // Vue为了知道过渡的完成，必须设置相应的事件监听器。
      })
    },
    afterEnter(el) { // 这个方法的执行是因为这是一个vue的监听事件
      const ball = this.dropBalls.shift() // 完成一次动画就删除一个dropBalls的小球
      if (ball) {
        ball.show = false
        el.style.display = 'none' // 隐藏小球
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.car-ball-box {
  .ball {
    position: fixed;
    left: 80px;
    bottom: 50px;
    z-index: 1003;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    &.opened {
      left: 300px;
    }
    .inner {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      transition: all 0.5s linear;
    }
  }
}
</style>
