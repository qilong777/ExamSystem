<template>
<div class='bind-email'>
  <h2>修改密码</h2>
  <hr>
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
        <el-button :loading="sendLoading" class="send-code-btn" type="success" :disabled="timer != null" @click.prevent="sendCode">{{SendTx}}</el-button>
        <!-- <a href="#" class="send-code-btn" @click.prevent="sendCode">{{SendTx}}</a> -->
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="btns" label-width="0px">
        <el-button style="width:100%" :loading="loginLoading" type="success" @click="bindEmail" class="login-btn" >{{loginTx}}</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'BindEmail',
  data() {
    return {
      // 定时器
      timer: null,
      // 剩余时间
      remainTime: 60,
      // 登录表单对应的数据对象
      loginForm: {
        email: '',
        code: ''
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
      },
      sendLoading: false,
      loginLoading: false
    }
  },
  computed: {
    SendTx() {
      if (this.timer === null) {
        if (this.sendLoading) {
          return ''
        }
        return '发送验证码'
      } else {
        return this.remainTime + 's'
      }
    },
    loginTx() {
      if (this.loginLoading) {
        return '绑定中'
      } else {
        return '立即绑定'
      }
    }
  },
  methods: {
    ...mapMutations(['setEmail']),
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
        this.sendLoading = true
        const res = await this.$api.sendBindCode(this.loginForm.email)
        this.sendLoading = false
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

    // 绑定邮箱按钮点击事件
    bindEmail() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          this.loginLoading = true
          const res = await this.$api.bindEmail(this.loginForm)
          if (res.status === 1) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.setEmail(this.loginForm.email)
            this.loginForm.email = ''
            this.loginForm.code = ''
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
          this.loginLoading = false
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.bind-email{
  h2{
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  .el-form{
    width: 400px;
    margin: 20px auto;
  }
}
</style>
