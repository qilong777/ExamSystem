<template>
  <div class="top-wrapper">
    <div class="top-container clearfix">
      <router-link class="logo" to="/">
      <h2>
        <img src="@/assets/images/logo.png" alt="logo">
      </h2>
      </router-link>
      <div class="top-menu-l">
        <router-link class="item" v-for="(value,key) in menuTop" :key="key" :to="'/' + key" :class="{'active':$route.path==='/' + key}">{{value}}</router-link>
      </div>
      <div class="top-menu-r">
        <router-link
          class="item1"
          to="/message"
          :class="{'active':$route.path==='/message'}">
          <el-badge is-dot>
            <i class="el-icon-chat-dot-square"></i>
          </el-badge>
          消息
        </router-link>
        <router-link
          class="item profile-item"
          to="/profile"
          :class="{'active':$route.path==='/profile'}">
          <el-avatar :size="50" :src="headImg"></el-avatar>
          <el-card class="profile-card">
            <router-link class="profile-item" to="/profile"><i class="el-icon-user-solid"></i> 我的信息</router-link>
            <a class="profile-item" @click.prevent="logOut" ><i class="el-icon-switch-button"></i> 退出系统</a>
          </el-card>
        </router-link>
      </div>
    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TopMenu',
  data() {
    return {
      // 菜单栏左侧导航项
      menuTop: {
        home: '首页',
        practice: '在线练习',
        exam: '在线考试',
        error: '我的错题',
        grade: '我的成绩'
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    headImg() {
      return this.userInfo.headImg + '#' + Date.now()
    }
  },
  methods: {
    async logOut() {
      const res = await this.$api.logOut()
      if (res.status === 1) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$cookie.removeItem('userInfo')
        this.$cookie.removeItem('sessionId')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-wrapper{
  position: fixed;
  background-color: #3d444c;
  top: 0;
  width: 100%;
  z-index: 999;
  // padding: 0 100px;
  .top-container{
    width: 1100px;
    margin:  0 auto;
    .logo{
      float: left;
      height: 54px;
      line-height: 54px;
      padding-right: 30px;
      cursor: pointer;
      img{
        width: 50px;
        height: 50px;
      }
    }
    .top-menu-l{
      float: left;
      border-bottom: 0 none;
    }
    .top-menu-r{
      float: right;
      padding-right: 50px;
      border-bottom: 0 none;
      .profile-item{
        position: relative;
        &:hover{
          .profile-card{
            display: block;
            .el-card__body{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 10px;
              .profile-item{
                flex-grow: 1;
              }
              .profile-item:hover{
                color: #67C23A;
              }
            }
          }

        }
      }
      .profile-card{
        display: none;
        position: absolute;
        top: 54px;
        right: 0;
        width: 130px;
      }
    }
    .item{
      float: left;
      height: 54px;
      line-height: 54px;
      padding: 0 10px;
      color: #ccc;
      font-size: 16px;
      &.active,&:hover{
        background-color: #000;
        color: #fff;
        transition: all 0.3s;
      }
      span{
        margin-top: 2px;
      }
    }
    .item1{
      float: left;
      box-sizing: border-box;
      height: 54px;
      padding: 15px 10px;
      color: #ccc;
      font-size: 16px;
      &.active,&:hover{
        background-color: #000;
        color: #fff;
        transition: all 0.3s;
      }
    }
  }

}
</style>
