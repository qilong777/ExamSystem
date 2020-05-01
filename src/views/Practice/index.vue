<template>
  <div class="practice">
    <el-card class="select-box">
      <h2>请选择题目类型</h2>
      <el-transfer
        class="select-type"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        v-model="value"
        :button-texts="['取消', '选择']"
        :titles="['所有题目类型', '已选择的题目类型']"
        target-order="push"
        :data="practiceList">
      </el-transfer>
      <div class="select-origin">
        <span>题目来源：</span>
          <el-radio v-model="origin" label="1">只出错题</el-radio>
          <el-radio v-model="origin" label="2">只出新题</el-radio>
          <el-radio v-model="origin" label="3">不限来源</el-radio>
      </div>
      <div class="select-num">
        <span>练习题数：</span>
          <el-radio v-model="num" label="1">5题</el-radio>
          <el-radio v-model="num" label="2">10题</el-radio>
          <el-radio v-model="num" label="3">20题</el-radio>
      </div>
      <div class="btn-list">
        <el-button @click="startPractice" type="success">开始答题</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Practice',
  data () {
    return {
      practiceList: [],
      value: [],
      origin: '3',
      num: '1'

    }
  },
  methods: {
    filterMethod(query, item) {
      return item.label.indexOf(query) !== -1
    },
    async getPractice() {
      const res = await this.$api.getPractice()
      if (res.status === 1) {
        this.practiceList = res.data.map(ele => {
          return {
            key: ele.id,
            label: ele.name
          }
        })
      }
    },
    startPractice() {
      console.log(this.value)
    }
  },
  created() {
    this.getPractice()
  }
}
</script>

<style lang='scss' scoped>
.practice{
  .select-box{
    h2{
      text-align: center;
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 20px;
    }
    width: 900px;
    margin: 0 auto;
    .select-type{
      width: 600px;
      margin: 20px auto;
    }
    .select-origin{
      font-size: 18px;
      padding-left: 150px;
      margin-bottom: 20px;
    }
    .select-num{
      font-size: 18px;
      padding-left: 150px;
    }
    .btn-list{
      text-align: center;
      margin: 20px 0;
    }
  }
}
</style>
