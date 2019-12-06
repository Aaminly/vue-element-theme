<template>
  <Dialog ref="question" title="问卷" width="650px">
    <div class="question-naire">
      <h3>亲爱的老师，耽误您1分钟做一个问卷调查，以帮助系统更加完善！</h3>
      <el-divider content-position="left">满意度</el-divider>
      <el-rate
        v-model="rate"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
        show-text/>
      <el-divider content-position="left">不好的地方或建议</el-divider>
      <el-input
        v-model="textarea"
        type="textarea"
        placeholder="请输入内容"
        maxlength="200"
        show-word-limit
      />
      <p><el-button type="primary">提交</el-button><el-checkbox v-model="anonymous">匿名</el-checkbox></p>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      rate: null,
      textarea: '',
      anonymous: false
    }
  },
  computed: {
    comp() {
      return this.$refs.question
    }
  }
}
</script>

<style lang="scss" scoped>
.question-naire{
  p > button{
    margin-right: 10px;
  }
}
</style>
