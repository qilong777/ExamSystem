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
        <a href="#" class="send-code-btn" @click.prevent="sendCode">{{SendTx}}</a>
      </el-form-item>
      <!--  -->
      <el-form-item class="check-wrapper">
        <el-checkbox v-model="loginForm.checked">七天免登录</el-checkbox>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="btns" label-width="0px">
        <el-button type="success" @click="login" class="login-btn" >立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EmailLogin',
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
        checked: false
      },
      // 登录表单验证规则
      loginFormRules: {
        // 验证用户名
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
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
        if (this.timer) {
          this.$message({
            message: '请等待60s后再发送',
            type: 'error'
          })
          return
        }
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
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const res = await this.$api.emailLogin(this.loginForm)
          if (res.status === 1) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            if (this.loginForm.checked) {
              this.$cookie.setItem('userInfo', res.userInfo, 7)
            }
            this.$router.push('/')
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

<style>

</style>
