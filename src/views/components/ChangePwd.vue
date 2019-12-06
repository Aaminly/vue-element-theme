<template>
  <div class="change-pwd">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      status-icon
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="userPhone">
        <el-input
          v-model="ruleForm.userPhone"
          :disabled="!!token"
          maxlength="11"
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-input v-model="ruleForm.verificationCode" maxlength="6" autocomplete="new-password">
          <el-button
            slot="append"
            :disabled="pullStatus"
            type="primary"
            @click.native="getverificationCode"
          >{{ pullStatus ? pullInterval + 's重试' : '获取验证码' }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="new-password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="new-password"/>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getAuthenCode, changePassword } from '@/api/login'
export default {
  name: 'ChangePwd',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pullStatus: false, // 是否在拉取验证码状态
      pullInterval: 60, // 拉取间隔
      timer: null, // 定时器
      ruleForm: {
        userPhone: '',
        verificationCode: '',
        password: '',
        checkPass: ''
      },
      rules: {
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              if (!/^\d+$/.test(value) || value.length !== 11) {
                callback(new Error('请输入正确的11位手机号!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, message: '请输入6位验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, max: 20, message: '请输入6-20位长度的密码', trigger: 'blur' }
        ],
        checkPass: [{ required: true, validator: validateCheckPass, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['token', 'userInfo'])
  },
  destroyed() {
    clearInterval(this.timer)
  },
  created() {
    this.token && (this.ruleForm.userPhone = this.userInfo.mobile)
  },
  methods: {
    ...mapActions(['fedLogOut']),
    getverificationCode() {
      const { userPhone } = this.ruleForm
      if (!userPhone || userPhone.length !== 11) {
        this.$refs.ruleForm.validateField('userPhone')
        return
      }
      const pullInterval = this.pullInterval
      if (!this.pullStatus) {
        this.pullStatus = true
        this.timer = setInterval(() => {
          if (this.pullInterval > 1) {
            this.pullInterval--
          } else {
            this.pullInterval = pullInterval
            this.pullStatus = false
            clearInterval(this.timer)
          }
        }, 1000)
        getAuthenCode({
          userPhoneAndName: this.userInfo.mobile || userPhone
        }).then(() => {
          this.$message.success('验证码发送成功')
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { userPhone, verificationCode, password } = this.ruleForm
          changePassword({
            Loading: true,
            userPhone,
            verificationCode,
            password
          }).then(() => {
            if (this.token) {
              this.$message.success('密码修改成功，即将跳转登录页~')
              setTimeout(() => {
                this.fedLogOut().then(() => {
                  location.reload() // 为了重新实例化vue-router对象 避免bug
                })
              }, 2000)
            } else {
              this.$message.success('密码设置成功，请使用新密码进行登录~')
              this.$refs.ruleForm.resetFields()
              this.$emit('close')
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.forget-pwd {
  .change-pwd {
    .el-input-group__append {
      padding: 0 10px !important;
    }
    .el-form-item__error {
      padding: 0 0 0 10px;
    }
    input {
      color: #444 !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.change-pwd {
  .submit {
    margin-bottom: 0;
  }
}
</style>
