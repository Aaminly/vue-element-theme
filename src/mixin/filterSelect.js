import { gradeConfig } from '@/utils/auth'
import { deepClone } from '@/utils'

// 获取过滤后的学部列表
function getDepartment(department, type) {
  const selectType = Array.isArray(type) ? type : [type]
  const grades = new Set()
  selectType.forEach(t => {
    for (const i in gradeConfig) {
      if (t <= gradeConfig[i]) {
        grades.add(i)
        break
      }
    }
  })
  return [...grades].reduce((prev, curr, index, arr) => {
    if (prev.some(item => item.value !== curr) || !prev.length) {
      const res = deepClone(department).find(t => t.value === curr)
      if (res) {
        res.disabled = arr.length > 1
        prev.push(res)
      }
    }
    return prev.filter(Boolean)
  }, [])
}

// 获取过滤后的年级列表
function getGrade(grade, type) {
  return grade.reduce((prev, curr) => {
    if (curr.value <= gradeConfig[type] && (type === '1' || curr.value > gradeConfig[type - 1])) {
      prev.push(curr)
    }
    return prev
  }, [])
}

// 获取过滤后的科目列表
function getSubject(subject, type) {
  const selectType = Array.isArray(type) ? type : [type]
  const filterData = selectType.reduce((prev, curr) => {
    const firstFilter = subject.filter(s => s.gradeIds.split(',').includes(curr))
    prev.push(...firstFilter.filter(f => !prev.some(p => p.id === f.id)))
    return prev
  }, [])
  return filterData.length ? filterData : subject
}

export default {
  computed: {
    filterDepartment() {
      return (type = '', department = this.constant.department_type) =>
        type.length ? getDepartment(department, type) : department
    },
    filterGrade() {
      return (type = '', grade = this.constant.grade) =>
        type.length
          ? Array.isArray(type)
            ? [].concat(...[...type].sort().map(t => getGrade(grade, t)))
            : getGrade(grade, type) : grade
    },
    filterSubject() {
      return (type = '', subject = this.constant.subject) =>
        type.length ? getSubject(subject, type) : subject
    }
  }
}
