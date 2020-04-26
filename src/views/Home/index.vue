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
          <h2>周三 2020/04/26</h2>
          <p>天气:多云转晴；温度：26℃</p>
          <p class="avatar-wrapper">
            <router-link to="/profile">
              <el-avatar  class="avatar" :size="80" :src="avatarUrl">廖奕浩</el-avatar>
            </router-link>
          </p>
          <p>姓名：廖奕浩</p>
          <p>学号：201611621123</p>
          <p>学院：数学与计算机学院</p>
          <p>班级：计科1161</p>

        </el-card>
        <el-card class="home-right-b">
          <ul class="practice-info">
            <li>
              <span>练题数</span>
              <span>80</span>
            </li>
            <li>
              <span>错题数</span>
              <span>100</span>
            </li>
            <li>
              <span>正确率</span>
              <span>80%</span>
            </li>
          </ul>
          <div class="practice-chart">

          </div>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
const Learn = () => import('components/Home/Learn')
const Chat = () => import('components/Home/Chat')
export default {
  name: 'Home',
  data () {
    return {
      activeName: 'learn'
    }
  },
  computed: {
    ...mapState(['avatarUrl'])
  },
  components: {
    Learn,
    Chat
  },
  methods: {
    createPracticeInfo() {
      const myChart = this.$echarts.init(document.querySelector('.practice-chart'))

      myChart.setOption({
        title: {
          text: '练习情况情况',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: '30px',
          data: ['正确题数', '错误题数']
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 80, name: '正确题数' },
              { value: 20, name: '错误题数' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  },
  mounted() {
    this.createPracticeInfo()
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
      // height: 200px;
      .avatar-wrapper{
        text-align: center;
        margin: 20px 0;
        .avatar{
          box-sizing: content-box;
          padding: 5px;
        }
      }

    }
    .home-right-b{
      width: 100%;
      // height: 200px;
      margin-top: 20px;
      .practice-info{
        display: flex;
        justify-content: center;
        align-items: center;
        li{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 20px;
          span{
            margin-bottom: 10px;
          }
        }
      }
      .practice-chart{
        width: 100%;
        height: 325px;
      }
    }
  }
}
</style>
