import EleMultiCascader from '@/components/EleMultiCascader'
import CountNum from '@/components/CountNum'
import CommTable from '@/views/components/CommTable'

const MyPlugin = {
  install(Vue) {
    Vue.component(EleMultiCascader.name, EleMultiCascader)
    Vue.component(CountNum.name, CountNum)
    Vue.component(CommTable.name, CommTable)
  }
}

export default MyPlugin
