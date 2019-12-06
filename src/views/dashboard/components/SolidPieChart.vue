<template>
  <div class="pie-chart">
    <h4>{{ title }}</h4>
    <div ref="pieChart" :class="className" :style="{height:height,width:width}"/>
  </div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    chartData: {
      type: Array,
      default: () => ([])
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.setOptions()
      }
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    initChart() {
      this.chart = echarts.init(this.$refs.pieChart, 'diy')
      this.setOptions()
    },
    setOptions() {
      const names = this.chartData.map(item => item.name)
      if (!names.length) return
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: params => {
            const { name, value, percent, data: { children = [] } } = params
            let htm = ''
            children && children.forEach(({ name: cname, value: cvalue }) => {
              htm += `${cname}: ${cvalue}人<br/>`
            })
            return `${name}(${value}人) ${percent}% ${htm ? `：<br/>${htm}` : children.length ? percent + '%' : ''}`
          }
        },

        series: [
          {
            name: 'hidden',
            radius: ['0%', '70%'],
            type: 'pie',
            seriesLayoutBy: 'row',
            label: {
              normal: {
                formatter: ['{b|{b}}', '{c|{c}人}'].join('\n'),
                rich: {
                  b: {
                    color: '#000',
                    fontSize: 14
                  },
                  c: {
                    color: '#999',
                    fontSize: 12,
                    lineHeight: 12
                  }
                }
              }
            },
            data: this.chartData
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scope>
.pie-chart {
  h4 {
    margin: 0 0 10px 0;
  }
}
</style>
