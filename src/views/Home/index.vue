<template>
  <div class="home">
    <div class="home-container clearfix">
      <div class="home-left">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane name="learn">
            <span slot="label"><i class="el-icon-date"></i> 学习</span>
            <Learn></Learn>
          </el-tab-pane>
          <!-- <el-tab-pane name="chat">
            <span slot="label"><i class="el-icon-s-opportunity"></i> 讨论</span>
            <Chat></Chat>
          </el-tab-pane> -->

        </el-tabs>
      </div>
      <div class="home-right">
        <el-card class="home-right-t">
          <h2 class="date">{{date}}</h2>
          <p class="time">{{time}}</p>
          <p class="avatar-wrapper">
            <router-link to="/profile">
              <el-avatar  class="avatar" :size="80" :src="userInfo.headImg">廖奕浩</el-avatar>
            </router-link>
          </p>
          <div class="student-info">
            <p>姓名：{{userInfo.name}}</p>
            <p>学号：{{userInfo.id}}</p>
            <p>学院：{{userInfo.academyName}}</p>
            <p>班级：{{userInfo.className}}</p>
          </div>
        </el-card>
        <el-card class="home-right-b">
          <ul class="practice-info">
            <li>
              <span>练题数</span>
              <span>{{userInfo.practiceNum}}</span>
            </li>
            <li>
              <span>答对题</span>
              <span>{{userInfo.correctNum}}</span>
            </li>
            <li>
              <span>答错题</span>
              <span>{{userInfo.errorNum}}</span>
            </li>
            <li>
              <span>正确率</span>
              <span>{{ratio}}</span>
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
import moment from 'moment'
import { mapState } from 'vuex'
const Learn = () => import('components/Home/Learn')
// const Chat = () => import('components/Home/Chat')
export default {
  name: 'Home',
  data () {
    return {
      activeName: 'learn',
      date: '',
      time: '',
      timer: null,
      pieChart: null

    }
  },
  computed: {
    ...mapState(['userInfo']),
    ratio() {
      return (this.userInfo.correctNum / this.userInfo.practiceNum * 100).toFixed(2) + '%'
    }
  },
  components: {
    Learn
    // Chat
  },
  methods: {
    createPracticeInfo() {
      let userInfo = this.userInfo
      if (!this.pieChart) {
        this.pieChart = this.$echarts.init(document.querySelector('.practice-chart'))
      }
      this.pieChart.setOption({
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
              { value: userInfo.correctNum, name: '正确题数' },
              { value: userInfo.errorNum, name: '错误题数' }
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
    },
    createTimer() {
      this.formatTime()
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.timer = setInterval(() => {
        this.formatTime()
      }, 1000)
    },
    formatTime() {
      let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let date = new Date()
      let week = weeks[date.getDay()]
      this.date = week + ' ' + moment().format('YYYY/MM/DD')
      this.time = moment().format('hh:mm:ss')
    }
  },
  created() {
    this.createTimer()
  },
  mounted() {
    let timer = setInterval(() => {
      if (this.userInfo.practiceNum) {
        this.createPracticeInfo()
        clearInterval(timer)
        timer = null
      }
    }, 100)
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
      .date{
        text-align: center;
        font-weight: bold;
        font-size: 24px;
      }
      .time{
        text-align: center;
        font-size: 20px;
      }
      .avatar-wrapper{
        text-align: center;
        margin: 20px 0;
        .avatar{
          box-sizing: content-box;
          padding: 5px;
        }
      }
      .student-info{
        text-align: center;
        // padding-left: 50px;
        p{
          margin: 5px 0;
          font-size: 18px;
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
          margin: 10px;
          span{
            margin-bottom: 10px;
          }
        }
      }
      .practice-chart{
        width: 100%;
        height: 270px;
      }
    }
  }
}
</style>
