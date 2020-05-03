<template>
<div class='my-practice'>
  <h2>我的练习情况</h2>
  <hr>
  <el-card class="my-practice-card">
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyPractice',
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ratio() {
      return (this.userInfo.correctNum / this.userInfo.practiceNum * 100).toFixed(2) + '%'
    }
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
          left: '100px',
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
    }
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

<style lang='scss' scoped>
.my-practice{
  h2{
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  .my-practice-card{
    width: 100%;
    // height: 200px;
    margin-top: 20px;
    .practice-info{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
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
</style>
