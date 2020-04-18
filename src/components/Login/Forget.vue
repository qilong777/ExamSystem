<template>
  <div class="tab-content">
    <el-form
      ref="loginFormRef"
      class="login-form"
      label-width="100px"
      :model="loginForm"
      :rules="loginFormRules">
      <!-- 邮箱 -->
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <!-- 邮箱验证码 -->
      <el-form-item prop="code" label="邮箱验证码">
        <el-input v-model="loginForm.code" placeholder="请输入邮箱验证码" style="width:60%"></el-input>
        <a href="#" class="send-code-btn" @click="sendCode">{{SendTx}}</a>
      </el-form-item>
      <!-- 新密码 -->
      <el-form-item prop="password" label="新密码">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="btns" label-width="0px">
        <el-button type="success" @click="changePassword" class="login-btn" >修该密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 定时器
      timer: null,
      // 剩余时间
      remainTime: 60,
      // 登录表单对应的数据对象
      loginForm: {
        email: '1635889910@qq.com',
        code: '',
        password: '1234567'
      },
      // 登录表单验证规则
      loginFormRules: {
        // 验证用户名
        email: [
          { required: true, message: '请输入学号或邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入学号或邮箱', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符之间', trigger: 'blur' }
        ],
        // 验证密码
        code: [
          { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    SendTx() {
      if (this.timer === null) {
        return '发送验证码'
      } else {
        return this.remainTime + 's'
      }
    }
  },
  methods: {
    // 启动定时器
    startTimer() {
      if (this.timer) {
        return
      }
      this.timer = setInterval(() => {
        this.remainTime -= 1

        if (this.remainTime <= 0) {
          clearInterval(this.timer)
          this.remainTime = 60
          this.timer = null
        }
      }, 1000)
    },

    // 发送邮箱验证码
    async sendCode() {
      if (this.loginForm.email !== '') {
        const res = await this.$api.sendCode(this.loginForm.email)
        if (res.status === 1) {
          this.$message({
            message: '验证码发送成功',
            type: 'success'
          })
          this.startTimer(60)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          this.remainTime = Math.ceil(res.remainTime) || 60
          this.startTimer()
        }
      } else {
        this.$message({
          message: '请输入邮箱',
          type: 'warning'
        })
      }
    },
    // 登录按钮点击事件
    changePassword() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const res = await this.$api.changePassword(this.loginForm)
          if (res.status === 1) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }
      })
    }
  }
}
</script>
