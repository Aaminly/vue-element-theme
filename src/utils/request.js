// import axios from 'axios'
// import { Message, MessageBox, Loading } from 'element-ui'
import Router from '../router'
import store from '../store'
import { getToken } from '@/utils/auth'
import { bindLeaveTips, unbindLeaveTips } from '@/utils'

const timeout = 60 // 秒
const exportTimeout = 3600 * 1000

const Loadings = (text, time = timeout) => {
  const loading = window.ELEMENT.Loading.service({
    lock: true,
    text: text || '正在处理您的操作，请稍候...',
    spinner: 'el-icon-loading',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.7)'
  })

  setTimeout(() => {
    if (loading.visible) {
      window.ELEMENT.Message.error('请求超时')
      loading.close()
    }
  }, time * 1000) // 超时设定 30s

  return loading
}

let firstTimeout = false

// loading队列
const loadingQueue = new Map()

// 请求队列
const requestQueue = new Map()

// 取消请求
const CancelToken = window.axios.CancelToken
// 不响应取消接口
const notCancel = ['findSysDictList', 'findThreeStatistics', 'findSchoolListForAddStudent']

// 创建axios实例
const service = window.axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  method: 'POST',
  timeout: timeout * 1000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    const url = config.url.match(/\/[a-z]+$/gi)[0]
    if (!notCancel.some(v => url.includes(v))) {
      if (requestQueue.has(url)) {
        requestQueue.get(url)('cancel')
        requestQueue.delete(url)
      }
      config.cancelToken = new CancelToken(c => {
        requestQueue.set(url, c)
      })
    }
    // console.log(requestQueue, url)
    if (store.getters.token) {
      const TOKEN = getToken()
      config.headers['X-Token'] = TOKEN // 让每个请求携带自定义token 请根据实际情况自行修改
      if (config.data) {
        if (config.data instanceof FormData) {
          config.data.append('token', TOKEN)
        } else {
          config.data.token = TOKEN
        }
      }
    }
    if (config.responseType === 'arraybuffer') {
      config.timeout = exportTimeout
      config.onDownloadProgress = event => {
        try {
          const name = config.url.split('/').pop()
          const fileQueue = store.state.exportFile.exportQueue
          const downProgress = ((event.loaded / event.total) * 100) | 0
          const { notify } = fileQueue[name]
          notify.$children[0].percentage = downProgress
          if (downProgress === 100) {
            setTimeout(() => {
              notify.close()
              delete fileQueue[name]
              store.commit('SET_EXPORT_QUEUE', fileQueue)
              const exportStatus = !!Object.keys(fileQueue).length
              if (!exportStatus) {
              // 设置导出状态为未导出
                store.commit('SET_EXPORT_STATUS', false)
                // 当前导出队列清空时卸载离开页面误操作方法
                unbindLeaveTips()
              }
            }, 1000)
          }
        // eslint-disable-next-line no-empty
        } catch (err) { }
      }
    } else {
      if (config.data && 'Loading' in config.data) {
        if (config.data.Loading) {
          bindLeaveTips()
          loadingQueue.set(config.url, Loadings())
        }
        delete config.data.Loading
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    const { exportStatus } = store.state.exportFile
    const fn = response.config.url.match(/\/a\/([a-z]+|\/)+/gi)
    if (fn)loadingQueue.get(fn[0]) && loadingQueue.get(fn[0]).close()
    exportStatus || unbindLeaveTips()
    const url = response.config.url.match(/\/[a-z]+$/gi)[0]
    requestQueue.delete(url)
    if (res instanceof ArrayBuffer) {
      window.ELEMENT.Message.success('导出成功')
      return response.data
    }
    const message = (type = 'error', msg = res.msg) => {
      window.ELEMENT.Message({
        message: msg,
        type,
        duration: 5 * 1000
      })
    }
    /**
     * code为非10000是抛错 可结合自己业务进行修改
     */
    if (res.code < 2000) {
      // 508:非法的token; 512:其他客户端登录了; 502:Token 过期了;
      if (res.code === 508 || res.code === 512 || res.code === 502) {
        if (!firstTimeout) {
          firstTimeout = true
          store.dispatch('fedLogOut').then(() => {
            Router.replace({
              path: '/redirect' + Router.history.current.fullPath
            })
            message()
            setTimeout(() => {
              firstTimeout = false
            }, 2000)
          })
        }
      } else if (res.code === 1001) {
        message('warning')
      } else {
        message()
      }
      return Promise.reject(res.msg)
    } else {
      if (res.code < 10000 && res.msg) {
        message('info')
      }
      return response.data
    }
  },
  error => {
    const { exportStatus } = store.state.exportFile
    // window.ELEMENT.Loading.close()
    for (const [, fn] of loadingQueue) {
      fn.close()
    }
    exportStatus || unbindLeaveTips()
    if (error.message !== 'cancel') {
      window.ELEMENT.Message({
        message: error.msg || '与服务器断开连接',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
