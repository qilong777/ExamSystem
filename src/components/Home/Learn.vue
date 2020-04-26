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
export default {
  name: 'Learn',
  data() {
    return {
      selectList: [
        { icon: 'el-icon-document', title: '在线练习', path: '/practice' },
        { icon: 'el-icon-date', title: '在线考试', path: '/exam' },
        { icon: 'el-icon-notebook-1', title: '我的错题', path: '/error' },
        { icon: 'el-icon-trophy', title: '我的成绩', path: '/grade' },
        { icon: 'el-icon-search', title: '查询书籍', path: '/search' },
        { icon: 'el-icon-user-solid', title: '个人信息', path: '/profile' }
      ]
    }
  },
  methods: {
    createGrade() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.querySelector('.grade'))
      // 绘制图表
      myChart.setOption({
        timeline: {
          data: [0, 1, 2],
          label: {
            formatter: function(s) { return '第' + Number(s + 1) + '页' }
          },
          autoPlay: false,
          playInterval: 3000,
          tooltip: { formatter: function(s) { return '第' + Number(s.value + 1) + '页' } }
        },
        options: [
          { title: { text: '本学期考试成绩如下' },
            tooltip: {},
            xAxis: {
              type: 'category',
              name: '课程',
              axisTick: {
                alignWithLabel: true
              }
            },
            yAxis: {
              name: '成绩',
              type: 'value',
              data: ['高等数学1', '英语', '数据结构', '操作系统', '计算机网络']
            },
            series: [{
              name: '成绩',
              type: 'bar',
              data: [60, 60, 60, 60, 60, 10],
              animationDelay: function (idx) {
                return idx * 10
              }
            }]
          },
          {
            xAxis: {
              data: ['高等数学1', '英语', '数据结构', '操作系统', '计算机网络']
            },
            series: [{
              data: [10, 20, 60, 60, 60, 60]
            }]
          },
          {
            xAxis: {
              data: ['高等数学1', '英语', '数据结构', '操作系统', '计算机网络']
            },
            series: [{
              data: [60, 60, 60, 100, 60, 30]
            }]
          }
        ]

      })
    }
  },
  mounted() {
    this.createGrade()
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
