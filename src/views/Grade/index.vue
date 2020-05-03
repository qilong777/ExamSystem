<template>
<div class='grade'>

  <el-tabs class="grade-wrapper" type="border-card">
    <h2>我的成绩</h2>
    <hr>
    <el-tab-pane label="表格形式">
      <el-input
        class="search"
        placeholder="请输入关键字"
        prefix-icon="el-icon-search"
        v-model="kw">
      </el-input>
      <el-table
        :data="exam"
        border
        height="400"
        class="grade-table">
        <el-table-column
          prop="examName"
          label="科目"
          width="200">
        </el-table-column>
        <el-table-column
          prop="score"
          label="分数"
          width="200">
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="图表形式">
      <div id="grade"></div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Grade',
  data() {
    return {
      barChart: null,
      kw: ''
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
    },
    exam() {
      let exam = [...this.userInfo.exam]
      return exam.filter(ele => ele.examName.indexOf(this.kw) !== -1)
    }
  },
  methods: {
    createGrade() {
      // let grade = this.userInfo.exam
      // 基于准备好的dom，初始化echarts实例
      if (!this.barChart) { this.barChart = this.$echarts.init(document.getElementById('grade')) }
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
.grade{
  .grade-wrapper{
    width: 900px;
    margin: 0 auto;
    .search{
      width: 400px;
      margin: 20px 235px;
    }
    .grade-table{
      width: 401px;
      margin: 0 auto;
      text-align: center;
    }
    h2{
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    #grade{
      width: 600px;
      height: 480px;
      margin: 0 auto;
      font-size: 16px;
    }
  }
}
</style>
