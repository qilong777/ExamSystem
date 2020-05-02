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
  <div class="grade"></div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Learn',
  data() {
    return {
      selectList: [
        { icon: 'el-icon-document', title: '在线练习', path: '/practice' },
        { icon: 'el-icon-date', title: '在线考试', path: '/exam' },
        { icon: 'el-icon-notebook-1', title: '我的错题', path: '/error' },
        { icon: 'el-icon-trophy', title: '我的成绩', path: '/grade' },
        // { icon: 'el-icon-search', title: '查询书籍', path: '/search' },
        { icon: 'el-icon-user-solid', title: '个人信息', path: '/profile' }
      ],
      barChart: null
    }
  },
  computed: {
    ...mapState(['userInfo']),
    gradeAxis() {
      if (this.userInfo.exam) {
        return this.userInfo.exam.map(ele => ele.examName)
      } else {
        return []
      }
    },
    gradeData() {
      if (this.userInfo.exam) {
        return this.userInfo.exam.map(ele => ele.score)
      } else {
        return []
      }
    }

  },
  methods: {
    createGrade() {
      // let grade = this.userInfo.exam
      // 基于准备好的dom，初始化echarts实例
      if (!this.barChart) { this.barChart = this.$echarts.init(document.querySelector('.grade')) }
      // let options = []
      // 绘制图表

      let num = 5
      let AlldataAxis = this.gradeAxis
      let Alldata = this.gradeData
      let dataAxis = ['', '', '', '', '']
      let data = ['', '', '', '', '']
      let yeshu = []
      let len = AlldataAxis.length

      let j = Math.floor((len - 1) / num) + 1
      for (let i = 0; i < j; i++) {
        yeshu.push(i)
      }

      for (let i = 0; i < len && i < num; i++) {
        dataAxis[i] = AlldataAxis[i]
        data[i] = Alldata[i]
      }

      let now = num
      let option = {
        timeline: {
          data: yeshu,
          label: {
            formatter: function (s) { return '第' + (s + 1) + '页' }
          },
          autoPlay: true,
          playInterval: 3000,
          tooltip: { formatter: function (s) { return '第' + (s.value + 1) + '页' } }
        },
        options: [
          {
            tooltip: { 'trigger': 'axis' },
            calculable: true,
            grid: { 'y2': 80 },
            xAxis: [{
              axisLabel: {
                interval: 0,
                inside: 'true',
                fontSize: '16',
                color: '#fff',
                formatter: function (val) {
                  let strs = val.split('') // 字符串数组
                  let str = ''
                  for (let i = 0, len = strs.length; i < len; i++) { // 遍历字符串数组
                    str += strs[i]
                    str += '\n' // 按需要求余
                  }
                  return str
                }
              },
              z: 10,
              'type': 'category',
              // 'axisLabel':{'interval':0},
              'data': dataAxis
            },
            {
              'type': 'category',
              'name': '科目',
              position: 'bottom'
            }],
            yAxis: [
              {
                'type': 'value',
                'name': '成绩',
                'max': 100
              }
            ],
            series: [
              {
                name: '成绩',
                type: 'bar',
                data: data
              }]
          }
        ]
      }
      while (now < len) {
        dataAxis = ['', '', '', '', '']
        data = ['', '', '', '', '']
        for (let i = 0; now < len && i < num; i++, now++) {
          dataAxis[i] = AlldataAxis[now]
          data[i] = Alldata[now]
        }
        let obj = {
          series: [{ 'data': data }],
          xAxis: [{ 'data': dataAxis }]
        }
        option['options'].push(obj)
      }
      this.barChart.setOption(option)
    }
  },
  mounted() {
    let timer = setInterval(() => {
      if (this.userInfo.exam) {
        this.createGrade()
        clearInterval(timer)
        timer = null
      }
    }, 100)
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
  .grade{
    width: 600px;
    height: 400px;
    margin: 0 auto;
  }
}

</style>
