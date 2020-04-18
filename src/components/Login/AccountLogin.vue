<template>
  <div class="tab-content">
    <el-form
      ref="loginFormRef"
      class="login-form"
      label-width="100px"
      :model="loginForm"
      :rules="loginFormRules">
      <!-- 用户名 -->
      <el-form-item prop="id" label="学号/邮箱">
        <el-input v-model="loginForm.id" placeholder="请输入用户名或邮箱"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="verify" label="验证码">
        <el-input v-model="loginForm.verify" placeholder="请输入验证码" style="width:60%"></el-input>
        <img :src="verifySrc" style="width:40%" alt="" @click="changeVerify">
      </el-form-item>
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
import { verifySrc } from '@/baseConst'

export default {
  data() {
    return {
      verifySrc,
      // 登录表单对应的数据对象
      loginForm: {
        id: '201611621123',
        password: '123456',
        verify: '',
        checked: false
      },
      // 登录表单验证规则
      loginFormRules: {
        // 验证用户名
        id: [
          { required: true, message: '请输入学号或邮箱', trigger: 'blur' }
        ],
        // 验证密码
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符之间', trigger: 'blur' }
        ],
        // 验证验证码
        verify: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeVerify() {
      this.verifySrc = verifySrc + Date.now()
    },
    // 登录按钮点击事件
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const res = await this.$api.login(this.loginForm)
          if (res.status === 1) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
          } else {
            this.changeVerify()
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

<style lang="scss">

</style>
