<template>
  <div class="achievement-box">
    <div :class="{edit: isEdit}" class="achievement-box-list">
      <template v-if="achievement.length">
        <el-tag
          v-for="tag in achievement"
          :key="tag.name"
          type="subject"
          closable
          class="act-border"
          @close="handleCloseTag(tag)"
        ><b class="act-bg">{{ tag.label }}</b><b class="act-color">{{ tag.entryScore }}</b></el-tag>
      </template>
      <span v-else class="empty">暂无成绩</span>
    </div>
    <div>
      <el-form
        ref="achievementForm"
        :model="achievementForm"
        :rules="rules"
        :inline="true"
        size="midium"
        class="inline"
      >
        <el-form-item prop="subject">
          <el-select
            v-model="achievementForm.subject"
            :collapse-tags="isEdit"
            :size="size"
            multiple
            allow-create
            default-first-option
            placeholder="请选择科目"
          >
            <el-option v-for="item in subject" :key="item.id" :label="item.label" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="entryScore">
          <el-input :size="size" v-model="achievementForm.entryScore" style="width: 100px;" placeholder="输入成绩"/>
        </el-form-item>
        <el-form-item>
          <div class="inline">
            <div>
              <el-button :size="size" type="primary" @click="addAchievement">添加</el-button>
            </div>
            <div v-if="isEdit">
              <el-button
                :disabled="!entryScore.length && !achievement.length"
                :size="size"
                type="primary"
                @click="saveScore"
              >保存</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    entryScore: {
      type: Array,
      default: () => []
    },
    smallSize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      achievement: [],
      achievementForm: {
        subject: [],
        entryScore: ''
      },
      rules: {
        subject: [{ required: true, message: '请选择科目', trigger: 'submit' }],
        entryScore: [
          { required: true, min: 1, max: 3, message: '请输入正确数值', trigger: 'submit' },
          { pattern: /^((1[0-9]{0,2})|([0-9]{1,2})|([1-9]))$/, message: '成绩区间0-199', trigger: 'submit' }
        ]
      }
    }
  },
  computed: {
    subject() {
      return this.$store.getters.constant.subject
    },
    size() {
      return this.smallSize ? 'small' : 'medium'
    }
  },
  watch: {
    entryScore: {
      handler() {
        this.achievement = JSON.parse(JSON.stringify(this.entryScore))
      },
      deep: true
    }
  },
  created() {
    // this.$store.dispatch('getConstant', 'subject')
  },
  methods: {
    addAchievement() {
      this.$refs.achievementForm.validate().then(() => {
        const { subject, entryScore } = this.achievementForm
        const subjectRes = []
        subject.forEach(s => {
          if (this.achievement.some(item => item.value === s.value)) {
            this.achievement.forEach(item => {
              if (item.value === s.value) {
                this.$set(item, 'entryScore', entryScore)
              }
            })
          } else {
            this.$set(s, 'entryScore', entryScore)
            subjectRes.push(s)
          }
        })
        this.achievement.push(...subjectRes)
        this.pushAchievement()
      }).catch(() => { })
    },
    handleCloseTag(tag) {
      this.achievement.splice(this.achievement.findIndex(item => item.value === tag.value), 1)
      this.pushAchievement()
    },
    pushAchievement() {
      this.$emit('achievement', this.achievement.map(item => ({ subjectId: item.value, entryScore: item.entryScore, label: item.label, value: item.value })))
    },
    saveScore() {
      if (!this.achievement.length && !this.entryScore.length) return
    }
  }
}
</script>

<style lang="scss">
.achievement-box {
  width: 100%;
  overflow: hidden;
  &-list {
    display: flex;
    overflow-x: auto;
    margin-bottom: 10px;
    .empty {
      font-size: 14px;
      color: #a7a5a5;
    }
  }
  .inline .el-form-item {
    margin-right: 0;
  }
}
</style>
