// import { Notification } from 'element-ui'
import { exportExcel, bindLeaveTips } from '@/utils'
import { checkForExport } from '@/api/exportFile'

const Vue = new window.Vue()

const notify = (title, h) => {
  return window.ELEMENT.Notification.success({
    title,
    position: 'bottom-right',
    dangerouslyUseHTMLString: true,
    showClose: false,
    customClass: 'export-file',
    message: h('el-progress', {
      props: {
        strokeWidth: 18,
        percentage: 0
      }
    }),
    duration: 0
  })
}

const exportFile = {
  state: {
    exportStatus: false,
    exportProgress: 0,
    exportQueue: {}
  },
  mutations: {
    SET_EXPORT_STATUS(state, status) {
      state.exportStatus = status
    },
    SET_EXPORT_PROGRESS(state, num) {
      state.exportProgress = num
    },
    SET_EXPORT_QUEUE(state, list) {
      state.exportQueue = list
    }
  },
  actions: {
    exportCheck({ dispatch }, { api, title, params, h }) {
      // 正则提取导出方法名
      let fnName = String(api)
        .match(/\/([a-z]{1,}('|"))/gi)[0]
        .trim()
        .substr(1)
      fnName = fnName.substr(0, fnName.length - 1)
      checkForExport({ [fnName]: params }).then(() => {
        dispatch('exportFile', { fnName, api, title, params, h })
      })
    },
    exportFile({ commit, state }, { fnName, api, title, params, h }) {
      try {
        // 深拷贝下载队列
        const queueList = state.exportQueue
        // 判断当前导出是否在任务队列，防止多次导出相同任务
        if (Object.keys(queueList).includes(fnName)) {
          Vue.$toast.error(`${title}正在导出`)
          return
        }
        // 绑定离开页面误操作方法
        bindLeaveTips()
        // 设置当前导出任务到队列，开启打包notify
        queueList[fnName] = {
          notify: notify(`正在云端打包-${title}`, h)
        }
        // 提交到store管理
        commit('SET_EXPORT_QUEUE', queueList)
        // 设置导出状态为正在导出
        commit('SET_EXPORT_STATUS', true)
        // 获取userID当Key
        const userId = this.getters.userInfo.id
        const key = new Date().getTime() + '' + userId
        // 设置key到下载参数里
        params.dateLength = key
        // 下载文件
        api({ ...params }).then(res => {
          // 浏览器下载文件
          exportExcel(res, title)
        })
        // 打开SSE云打包
        const SSE = new EventSource(
          process.env.BASE_API +
            `a/sysManage/exportLength?method=${fnName}&dateLength=${key}&userId=${userId}`
        )
        // SSE消息响应
        SSE.onmessage = event => {
          // length总进度、nowLength当前已完成进度
          const { length, nowLength } = JSON.parse(event.data)
          if (length && nowLength) {
            // 计算长度
            const speed = (nowLength / length) * 100
            // 提交到store管理
            commit(
              'SET_EXPORT_PROGRESS',
              (speed > 100 ? 100 : speed).toFixed(2)
            )
            // 获取当前SSE方法名
            const name = SSE.url.match(/=[a-z]{1,}/i)[0].substr(1)
            // 获取当前打包对象
            const { notify } = queueList[name]
            // // 动态设置当前云打包进度
            notify.$children[0].percentage = state.exportProgress
            // 当进度完成时操作
            if (nowLength >= length) {
              // 关闭SSE
              SSE.close()
              // 设置下载notify
              notify.title = `正在下载-${title}`
              notify.$children[0].percentage = 0
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export default exportFile
