<template>
  <div class="home">
    <div class="home-container">
      <div class="home-left">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane name="learn">
            <span slot="label"><i class="el-icon-date"></i> 学习</span>
            <Learn></Learn>
          </el-tab-pane>
          <el-tab-pane name="chat">
            <span slot="label"><i class="el-icon-s-opportunity"></i> 讨论</span>
            <Chat></Chat>
          </el-tab-pane>

        </el-tabs>
      </div>
      <div class="home-right">
        <el-card class="home-right-t">

        </el-card>
        <el-card class="home-right-b">

        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
const Learn = () => import('components/Home/Learn')
const Chat = () => import('components/Home/Chat')
export default {
  name: 'Home',
  data () {
    return {
      activeName: 'learn'
    }
  },
  components: {
    Learn,
    Chat
  }
}
</script>

<style lang='scss'>
.home-container{
  width: 1100px;
  margin: 0 auto;
  .home-left{
    float: left;
    width: 700px;
    margin-right: 20px;
    .el-tabs__item{
      height: 50px;
      line-height: 50px;
      font-size: 20px;
    }
  }
  .home-right{
    float: left;
    width: 300px;
    .home-right-t{
      width: 100%;
      height: 200px;
    }
    .home-right-b{
      width: 100%;
      height: 200px;
      margin-top: 20px;
    }
  }
}
</style>
