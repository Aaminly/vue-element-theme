<template>
  <Dialog ref="tijian" :append-to-body="true" title="系统体检" width="650px" @opend="initChart" @close="clear(true)">
    <div class="tijian-box">
      <div class="tijian-box-echarts">
        <div ref="echarts" style="height: 500px;"/>
      </div>
      <ul class="tijian-list">
        <li v-for="(item, index) in queue" :key="index">{{ item.title }} <i :class="`el-icon-${item.status}`" :style="{color: item.status === 'success' ? '#67c23a' : '#f56c6c'}"/></li>
      </ul>
      <el-button v-show="percentage === 0" type="primary" @click="play">开始体检</el-button>
    </div>
  </Dialog>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import Dialog from '@/components/Dialog'
import { isChrome, detectZoom, deepClone } from '@/utils'

const color_percent0 = 'rgba(204,204,204,1)'
const color_percent100 = 'rgba(12,255,0,.3)'

let level = 0

// color_percent0 = 'rgba(255,0,36,1)'
// color_percent100 = 'rgba(255,0,36,.3)'

export default {
  components: {
    Dialog
  },
  data() {
    return {
      chart: null,
      timer: null,
      chartTxt: '系统体检',
      percentage: 0,
      queue: [],
      list: [
        { title: '正在检测是否是谷歌浏览器......', status: 'loading', fn: isChrome },
        { title: '正在检测当前浏览器是否缩放......', status: 'loading', fn: detectZoom }
        // { title: '正在清理当前运行垃圾......', status: 'loading' }
      ]
    }
  },
  computed: {
    comp() {
      return this.$refs.tijian
    }
  },
  mounted() {
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }
    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setOptions({ percent, dotArray }) {
      this.chart.setOption({
        // backgroundColor: '#000',
        title: {
          'x': '50%',
          'y': '45%',
          textAlign: 'center',
          top: '61%', // 字体的位置
          'text': this.chartTxt,
          'textStyle': {
            'fontWeight': 'normal',
            'color': '#000',
            'fontSize': 30
          },
          'subtextStyle': { // 副标题的文字的样式
            'fontWeight': 'bold',
            'fontSize': 18,
            'color': '#3ea1ff'
          }

        },
        xAxis: {
          show: false, // 是否展示x轴
          min: function(value) { // 调整x轴上面数据的位置
            return value.min - 7
          },
          max: function(value) {
            return value.max + 7
          },
          splitLine: {
            lineStyle: {
              show: true,
              type: 'dashed'
            }
          },
          'axisLabel': {
            'interval': 0,
            rotate: 40,
            textStyle: {
              fontSize: 12,
              color: '#000'
            }
          },
          data: ['1', '2', '3', '4', '5']
        },
        yAxis: {
          show: false,
          // name: '万元',
          max: 200,
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          'name': '',
          'type': 'pie',
          'radius': ['50%', '70%'],
          'center': ['50%', '40%'],
          'avoidLabelOverlap': false,
          'startAngle': 225,
          'color': [{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0.4,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: color_percent0 // 0% 处的颜色
            }, {
              offset: 1,
              color: color_percent100 // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }, 'none'],
          'hoverAnimation': false, // 是否开启 hover 在扇区上的放大动画效果。
          'legendHoverLink': false, // 是否启用图例 hover 时的联动高亮。
          'label': {
            'normal': {
              'show': false,
              'position': 'center'
            },
            'emphasis': {
              'show': true,
              'textStyle': {
                'fontSize': '30',
                'fontWeight': 'bold'
              }
            }
          },
          'labelLine': {
            'normal': {
              'show': false
            }
          },
          'data': [{
            'value': 75,
            'name': '1'
          }, {
            'value': 25,
            'name': '2'
          }]
        }, {
          'name': ' ',
          'type': 'pie',
          'radius': ['48%', '47%'],
          'center': ['50%', '40%'],
          'avoidLabelOverlap': false, // 是否启用防止标签重叠策略
          'startAngle': 225,

          'hoverAnimation': false,
          'legendHoverLink': false,
          'label': {
            'normal': {
              'show': false,
              'position': 'center'
            },
            'emphasis': {
              'show': true,
              'textStyle': {
                'fontSize': '30',
                'fontWeight': 'bold'
              }
            }
          },
          'labelLine': {
            'normal': {
              'show': false
            }
          },
          'data': [{
            'value': 75,
            'name': '1'
          }, {
            'value': 25,
            'name': '2'
          }]
        }, {
          'name': '',
          'type': 'pie',
          'radius': ['50%', '70%'],
          'center': ['50%', '40%'],
          'avoidLabelOverlap': false,
          'startAngle': 315,
          'color': ['rgba(34,34,34,.9)', '#ff7a00', 'transparent'],
          'hoverAnimation': false,
          'legendHoverLink': false,
          'clockwise': false, // 饼图的扇区是否是顺时针排布。
          'itemStyle': {
            'normal': {
              'borderColor': 'transparent',
              'borderWidth': '20'
            },
            'emphasis': {
              'borderColor': 'transparent',
              'borderWidth': '20'
            }
          },
          'z': 10,
          'label': {
            'normal': {
              'show': false,
              'position': 'center'
            }

          },
          'labelLine': {
            'normal': {
              'show': false
            }
          },
          'data': [{
            'value': (100 - percent) * 270 / 360,
            'label': {
              normal: {
                formatter: percent + '%',
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '90',
                  fontWeight: 'normal',
                  color: '#000'
                }
              }
            },
            'name': ''
          }, {
            'value': 1,
            'name': ''
          }, {
            'value': 100 - (100 - percent) * 270 / 360,
            'name': ''
          }]
        },
        // 总共有5个小球
        {
          name: '',
          symbolOffset: ['20', '0'], // 就是把自己向上移动了一半的位置，在 symbol 图形是气泡的时候可以让图形下端的箭头对准数据点。
          type: 'scatter',
          data: [80, 80, 80, 80, 80]
        },
        // 根据数据判断小球的颜色
        {
          name: '',

          type: 'scatter',
          symbolOffset: ['20', '0'], // 移动小球的位置
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
            offset: 0,
            color: color_percent0
          }, {
            offset: 1,
            color: color_percent100
          }]),
          data: dotArray
        },
        { // 第一个线
          name: '',

          type: 'line',
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
            offset: 0,
            color: color_percent0
          }, {
            offset: 1,
            color: color_percent100
          }]),
          symbol: 'none',
          data: [85, 85, 85, 85, 85, 85]
        },
        { // 第二根线
          name: '',

          type: 'line',
          symbol: 'none', // 去掉横线上的小点
          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
            offset: 0,
            color: color_percent0
          }, {
            offset: 1,
            color: color_percent100
          }]),
          data: [75, 75, 75, 75, 75, 75]
        }
        ]
      })
    },
    calculateDot(data) {
      const dotArray = []
      const num = Math.ceil(data / 20)
      if (num) {
        dotArray.push(...new Array(num).join().split(',').map(s => 80))
        if (level !== num) {
          const list = deepClone(this.list).slice(0, num)
          if (list.length) {
            this.queue = list.map(s => {
              if (s.fn) {
                setTimeout(() => {
                  s.status = s.fn() ? 'success' : 'error'
                }, 1000)
              }
              return s
            })
          }
        }
      }
      level = num
      return {
        percent: data,
        dotArray
      }
    },
    initChart() {
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs.echarts, 'diy')
        this.setOptions(this.calculateDot(0))
      })
    },
    play() {
      this.chartTxt = '体检中...'
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.percentage < 100) this.percentage += 6
        else this.clear()
        this.setOptions(this.calculateDot(this.percentage))
      }, 66)
    },
    clear(stop) {
      clearInterval(this.timer)
      this.percentage = 100
      this.chartTxt = '完成'
      if (stop) {
        this.percentage = 0
        this.queue = []
      }
    }
  }
}
</script>

<style lang="scss">
.tijian-box{
  margin: 0 auto;
  text-align: center;
  > ul{
    text-align: left;
  }
  &-echarts{
    height: 350px;
    overflow: hidden;
  }
}
</style>
