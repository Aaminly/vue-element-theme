/**
 * Created by jiachenpan on 16/11/18.
 */

export function isChrome(ver = 70) {
  const UA = window.navigator.userAgent.toLowerCase()
  const noChrome = ['msie/', 'trident/', 'firefox/', 'ubrowser/', 'opera/', 'bidubrowser/', 'metasr/', 'tencenttraveler/', 'qqbrowser/', 'maxthon/', 'edge/', 'micromessenger/']
  const types = Object.keys(window.navigator.mimeTypes).map(key => window.navigator.mimeTypes[key]).some(({ type }) => type.includes('chromium'))
  const version = UA.match(/chrome.*?\./)[0].match(/\d+/) >= ver
  const chrome = UA && /chrome\/\d+/.test(UA) && !noChrome.some(ua => UA.includes(ua)) && !types && version
  return chrome
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || 'y-m-d h:i:s'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    // if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
    // eslint-disable-next-line eqeqeq
    if (date == 'Invalid Date') return time
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/(y|m|d|h|i|s|a)/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 返回性别图片
import man from '@/assets/images/sex-man.png'
import women from '@/assets/images/sex-women.png'
export function sexImg(sex) {
  return sex ? man : women
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 设置主题
export function setTheme(theme) {
  const body = document.body
  const styleName = theme + '-theme-style'
  if (!document.querySelector('#' + styleName)) {
    const head = document.getElementsByTagName('HEAD').item(0)
    const style = document.createElement('style')
    style.type = 'text/css'
    style.id = styleName
    head.appendChild(style)
    require(`@/assets/theme/${theme}-theme/index.css`)
  }
  body.className = theme + '-theme'
}

// 字符串首字母大写
export function strFirstUpper(str) {
  return str.replace(/( |^)[a-z]/g, first => first.toUpperCase())
}

/**
 * 根据ID返回层级
 * @param location Array
 * @param targetId  Number
 * @return Array
 */
export function id2Level(tree, id, childName = 'children') {
  const level = []
  ;(function id2Level(data, id, parent) {
    Array.isArray(data) &&
      data.forEach((item, index) => {
        if (item.id !== id) {
          item[childName] && id2Level(item[childName], id, [data, index])
        } else {
          parent && id2Level(tree, parent[0][parent[1]].id)
          level.push(item.id)
        }
      })
  })(tree, id)
  return level
}

// 处理tree children为空的情况
export function treeChildrenEmpty(tree, type = 'children') {
  return tree.map(item => {
    if (item[type] && item[type].length !== 0) {
      treeChildrenEmpty(item[type], type)
    } else {
      delete item[type]
    }
    return item
  })
}

// 金额转大写 只支持2位小数
export function number2CHN(num) {
  if (!/^(0|[1-9]\d*)(\.\d{1,2})?$/.test(num)) return '请输入正确的金额'
  if (+num === 0) return '零'
  let unit = '仟佰拾亿仟佰拾万仟佰拾元角分'
  let str = ''
  num += '00'
  const point = num.indexOf('.')
  if (point >= 0) {
    num = num.substring(0, point) + num.substr(point + 1, 2)
  }
  unit = unit.substr(unit.length - num.length)
  for (let i = 0; i < num.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(num.charAt(i)) + unit.charAt(i)
  }
  return str
    .replace(/零(仟|佰|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(万|亿|元)/g, '$1')
    .replace(/(亿)万|(拾)/g, '$1$2')
    .replace(/^元零?|零分/g, '')
    .replace(/元$/g, '元整')
}

// 导出excel
export function exportExcel(data, title) {
  if (!data) return
  const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', title + parseTime(new Date(), 'y-m-d h-i-s') + '.xlsx')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 计算上课时间长度
 * @param startT "08:00"
 * @param endT  "10:00"
 */
export function getSpendhours(startT, endT) {
  if (!(startT && endT)) return
  const startArr = startT.split(':')
  const endArr = endT.split(':')
  return (
    (parseInt(endArr[0]) - parseInt(startArr[0])) * 60 +
    (parseInt(endArr[1]) - parseInt(startArr[1]))
  )
}

/**
 * JSON diff
 * @param o  old obj{}
 * @param n  new obj{}
 */
export function jsonDiff(o, n) {
  const type2str = obj => toString.call(obj)
  const type2fn = { '[object Object]': () => ({}), '[object Array]': () => [] }
  if (type2str(n) !== type2str(o)) {
    throw new Error('New and old parameters are not of the same type')
  }
  const res = type2fn[type2str(n)]()
  for (const i in n) {
    if (Array.isArray(n[i]) && Array.isArray(o[i])) {
      if (n[i].some((s, ind) => s !== o[i][ind])) {
        res[i] = n[i]
      }
    } else {
      if (o[i] !== n[i]) res[i] = n[i]
    }
  }
  return res
}

/**
 * 检测浏览器是否放大
 * @param rsize  Boolean 是否返回具体放大数值
 */
export function detectZoom(rsize) {
  let ratio = 0
  const screen = window.screen
  const ua = navigator.userAgent.toLowerCase()

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth
  }

  if (ratio) {
    ratio = Math.round(ratio * 100)
  }

  return rsize ? ratio : ratio === 100
}

// 离开当前页面提示
function leaveTips(e) {
  const event = window.event || e
  event.returnValue = '确定离开当前页面吗？'
}

// 增加离开当前页面提示事件
export function bindLeaveTips() {
  window.addEventListener('beforeunload', leaveTips)
}

// 删除离开当前页面提示事件
export function unbindLeaveTips() {
  window.removeEventListener('beforeunload', leaveTips)
}
