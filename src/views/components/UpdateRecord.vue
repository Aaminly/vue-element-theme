<template>
  <Dialog ref="updateRecord" title="更新日志" width="500px">
    <el-divider>2019-06-14</el-divider>
    <ul>
      <li>Backtop</li>
      <li>新增 Backtop 组件 (#15541 by @iamkun)</li>
      <li>PageHeader</li>
      <li>新增 PageHeader 组件 (#15714 by @ziyoung)</li>
      <li>InfiniteScroll</li>
      <li>新增 InfiniteScroll 指令 (#15567 by @iamkun)</li>
      <li>Cascader</li>
      <li>新增多选模式和 filter-method 方法 (#15611 by @SimonaliaChen)</li>
      <li>Message</li>
      <li> 信息依次展示 (#15639 by @island205)</li>
      <li>Tag</li>
      <li>新增 effect 属性 (#15725 by @SimonaliaChen)</li>
      <li>Tabs</li>
      <li> 卡片模式下标题左对齐 (#15695 by @luckyCao)</li>
    </ul>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog'
export default {
  name: 'UpdateRecord',
  components: {
    Dialog
  },
  mounted() {
    // this.$refs.updateRecord.show = true
  }
}
</script>
