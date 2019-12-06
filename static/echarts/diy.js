(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory)
  } else if (
    typeof exports === 'object' &&
    typeof exports.nodeName !== 'string'
  ) {
    // CommonJS
    factory(exports, require('echarts'))
  } else {
    // Browser globals
    factory({}, root.echarts)
  }
})(this, function(exports, echarts) {
  var log = function(msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg)
    }
  }
  if (!echarts) {
    log('ECharts is not Loaded')
    return
  }
  echarts.registerTheme('diy', {
    color: ['#ff715e', '#ffaf51', '#ffee51', '#8c6ac4', '#715c87'],
    backgroundColor: '#ffffff',
    textStyle: {},
    title: {
      textStyle: {
        color: '#ffaf51'
      },
      subtextStyle: {
        color: '#919191'
      }
    },
    line: {
      itemStyle: {
        normal: {
          borderWidth: '2'
        }
      },
      lineStyle: {
        normal: {
          width: '3'
        }
      },
      symbolSize: '8',
      symbol: 'emptyCircle',
      smooth: false
    },
    radar: {
      itemStyle: {
        normal: {
          borderWidth: '2'
        }
      },
      lineStyle: {
        normal: {
          width: '3'
        }
      },
      symbolSize: '8',
      symbol: 'emptyCircle',
      smooth: false
    },
    bar: {
      itemStyle: {
        normal: {
          barBorderWidth: '0',
          barBorderColor: '#ccc'
        },
        emphasis: {
          barBorderWidth: '0',
          barBorderColor: '#ccc'
        }
      }
    },
    pie: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    scatter: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    boxplot: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    parallel: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    sankey: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    funnel: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    gauge: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        },
        emphasis: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      }
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: '#ffee51',
          color0: '#ffffff',
          borderColor: '#ff715e',
          borderColor0: '#797fba',
          borderWidth: '1'
        }
      }
    },
    graph: {
      itemStyle: {
        normal: {
          borderWidth: '0',
          borderColor: '#ccc'
        }
      },
      lineStyle: {
        normal: {
          width: '1',
          color: '#888888'
        }
      },
      symbolSize: '8',
      symbol: 'emptyCircle',
      smooth: false,
      color: ['#ff715e', '#ffaf51', '#ffee51', '#8c6ac4', '#715c87'],
      label: {
        normal: {
          textStyle: {
            color: '#333333'
          }
        }
      }
    },
    map: {
      itemStyle: {
        normal: {
          areaColor: '#555555',
          borderColor: '#999999',
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: 'rgba(255,175,81,0.5)',
          borderColor: '#ffaf51',
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: '#ffffff'
          }
        },
        emphasis: {
          textStyle: {
            color: 'rgb(255,238,81)'
          }
        }
      }
    },
    geo: {
      itemStyle: {
        normal: {
          areaColor: '#555555',
          borderColor: '#999999',
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: 'rgba(255,175,81,0.5)',
          borderColor: '#ffaf51',
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: '#ffffff'
          }
        },
        emphasis: {
          textStyle: {
            color: 'rgb(255,238,81)'
          }
        }
      }
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#666666'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#999999'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#555555']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    valueAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#666666'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#999999'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#555555']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    logAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#666666'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#999999'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#555555']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#666666'
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#999999'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ['#555555']
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
        }
      }
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: '#999999'
        },
        emphasis: {
          borderColor: '#666666'
        }
      }
    },
    legend: {
      textStyle: {
        color: '#999999'
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: '#cccccc',
          width: 1
        },
        crossStyle: {
          color: '#cccccc',
          width: 1
        }
      }
    },
    timeline: {
      lineStyle: {
        color: '#ffaf51',
        width: 1
      },
      itemStyle: {
        normal: {
          color: '#ffaf51',
          borderWidth: 1
        },
        emphasis: {
          color: '#ffaf51'
        }
      },
      controlStyle: {
        normal: {
          color: '#ffaf51',
          borderColor: '#ffaf51',
          borderWidth: 0.5
        },
        emphasis: {
          color: '#ffaf51',
          borderColor: '#ffaf51',
          borderWidth: 0.5
        }
      },
      checkpointStyle: {
        color: '#ff715e',
        borderColor: 'rgba(255,113,94,0.4)'
      },
      label: {
        normal: {
          textStyle: {
            color: '#ff715e'
          }
        },
        emphasis: {
          textStyle: {
            color: '#ff715e'
          }
        }
      }
    },
    visualMap: {
      color: ['#ff715e', '#ffee51', '#797fba']
    },
    dataZoom: {
      backgroundColor: 'rgba(255,255,255,0)',
      dataBackgroundColor: 'rgba(222,222,222,1)',
      fillerColor: 'rgba(255,113,94,0.2)',
      handleColor: '#cccccc',
      handleSize: '100%',
      textStyle: {
        color: '#999999'
      }
    },
    markPoint: {
      label: {
        normal: {
          textStyle: {
            color: '#333333'
          }
        },
        emphasis: {
          textStyle: {
            color: '#333333'
          }
        }
      }
    }
  })
})
