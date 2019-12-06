/**
 * 查看组件方法
 */

// 由一个组件，向上找到最近的指定组件
export function findComponentUpward(context, comName) {
  let parent = context.$parent
  let name = parent.$options.name
  while (name && (!name || name !== comName)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

// 由一个组件，向上找到所有的指定组件
export function findComponentsUpward(context, comName) {
  const parents = []
  const parent = context.$parent
  if (parent) {
    if (parent.$options.name === comName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, comName))
  } else {
    return []
  }
}

// 由一个组件，向下找到最近的指定组件
export function findComponentDownward(context, comName) {
  const childrens = context.$children
  let children = null
  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === comName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, comName)
        if (children) break
      }
    }
  }
  return children
}

// 由一个组件，向下找到所有的指定组件
export function findComponentsDownward(context, comName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === comName) components.push(child)
    const foundChilds = findComponentsDownward(child, comName)
    return components.concat(foundChilds)
  }, [])
}

// 由一个组件，找到指定组件的兄弟组件
export function findSiblingsComponents(context, comName, exceptMe = true) {
  const res = context.$parent.$children.filter(
    item => item.$options.name === comName
  )
  if (exceptMe) {
    const index = res.findIndex(item => item._uid === context._uid)
    res.splice(index, 1)
  }
  return res
}
