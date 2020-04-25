<template>
<div class='learn'>
  <h2 class="learn-title"><el-tag type="" size="large">操作</el-tag></h2>
  <ul class="select">
    <router-link tag="li" :to="item.path" v-for="item in selectList" :key="item.title">
        <i :class="item.icon"></i>
        <span>{{item.title}}</span>
    </router-link>
  </ul>
  <h2 class="learn-title"><el-tag type="" size="large">成绩</el-tag></h2>
</div>
</template>

<script>
export default {
  name: 'Learn',
  data() {
    return {
      selectList: [
        { icon: 'el-icon-document', title: '在线练习', path: '/practice' },
        { icon: 'el-icon-date', title: '在线考试', path: '/exam' },
        { icon: 'el-icon-notebook-1', title: '我的错题', path: '/error' },
        { icon: 'el-icon-trophy', title: '我的成绩', path: '/grade' },
        { icon: 'el-icon-search', title: '查询书籍', path: '/practice' },
        { icon: 'el-icon-user-solid', title: '个人信息', path: '/profile' }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.learn{
  .select{
    width: 600px;
    margin: 0 auto;
    margin-bottom: 20px;
    overflow: hidden;
    li{
      box-sizing: border-box;
      float: left;
      width: 200px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 26px;
      margin-bottom: 10px;
      cursor: pointer;
      &:hover{
        span{
          color: #25bb9b;
        }
        i{
          background-color: #25bb9b;
        }

      }
      i{
        display: inline-block;
        background-color: #409EFF;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        color: #fff;
        margin-right: 5px;
      }
      span{
        font-size: 24px;
      }

    }
  }
  .learn-title{
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
}

</style>
