/**
 * @description 全埋点
 *  1.在所有methods方法中埋点为函数名
 *  2.在钩子函数中 (activated - created - mounted) 依次寻找这三个钩子
 *    如果存在就会增加埋点 VIEW
 *
 * 用法：
 *   @Buried
 *   在单文件导出对象一级子对象下;
 *   如果某方法不想设置埋点 可以 return 'noBuried' 即可
 */
export function Buried(target, funcName, descriptor) {
  const oriMethods = Object.assign({}, target.methods)
  const oriTarget = Object.assign({}, target)
  // methods方法中
  if (target.methods) {
    for (const name in target.methods) {
      target.methods[name] = function() {
        const result = oriMethods[name].call(this, ...arguments)
        // 如果方法中返回 noBuried 则不添加埋点
        if (typeof result === 'string' && result.includes('noBuried')) {
          console.log(name + '方法设置不添加埋点')
        } else if (result instanceof Promise) {
          result.then(res => {
            if (typeof res === 'string' && res.includes('noBuried')) { console.log(name + '方法设置不添加埋点'); return }
            console.log('添加埋点在methods方法中：', name.toUpperCase())
            this.$log(name)
          })
        } else {
          console.log('添加埋点在methods方法中：', name.toUpperCase())
          this.$log(name)
        }
        return result
      }
    }
  }
  // 钩子函数中
  const hookFun = (funName) => {
    target[funName] = function() {
      const result = oriTarget[funName].call(this, ...arguments)
      console.log('添加埋点，在钩子函数' + funName + '中：', 'VIEW')
      this.$log('VIEW')
      return result
    }
  }
  // 钩子函数中 view
  if (target.activated) {
    return hookFun('activated')
  } else if (target.created) {
    return hookFun('created')
  } else if (target.mounted) {
    return hookFun('mounted')
  }
}
