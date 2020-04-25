<template>
  <div class="login">
    <div class="login-box">
      <main>
        <el-tabs :stretch="true" v-model="activeName" >
          <el-tab-pane :lazy="true" label="密码登录" name="1">
            <AcountLogin></AcountLogin>
          </el-tab-pane>
          <el-tab-pane :lazy="true" label="验证码登录" name="2">
            <EmailLogin></EmailLogin>
          </el-tab-pane>
          <el-tab-pane :lazy="true" label="忘记密码" name="3">
            <Forget @toLogin="changeActiveName"></Forget>
          </el-tab-pane>
        </el-tabs>
      </main>
    </div>
  </div>
</template>

<script>
const AcountLogin = () => import('components/Login/AccountLogin')
const EmailLogin = () => import('components/Login/EmailLogin')
const Forget = () => import('components/Login/Forget')
export default {
  name: 'Login',
  data() {
    return {
      activeName: '1'

    }
  },
  methods: {
    changeActiveName(index) {
      this.activeName = index.toString()
    }
  },
  components: {
    AcountLogin, EmailLogin, Forget

  }
}
</script>

<style lang="scss">
.login{
  height:100%;
  background: #fff url('../../assets/images/bg.jpg') no-repeat top center;
  background-size: cover;
  .login-box {
    width: 600px;
    margin: 0 auto;
    padding-top: 70px;
    main{
      border: 1px solid #d6d6d6;
      border-radius: 4px;
      background: #fff;
      overflow: hidden;
      .el-tabs__item{
        height: 85px;
        line-height: 85px;
        font-size: 24px;
      }
      .tab-content{
        border-top: 1px solid #ededed;
        margin: 0 20px;
        padding: 60px 100px 80px;
        .login-btn{
          width: 100%;
        }
        .send-code-btn{
          position: relative;
          display: inline-block;
          width: 40%;
          height: 100%;
          text-align: center;
          top: 1px;
          left: -2px;
          background-color: #67C23A;
          z-index: 10;
          color: #fff;
          border-radius: 0;
          padding: 13px 22px;
          span{
            margin-left: -3px;
          }
        }

      }
    }
  }
}
</style>
