<template>
  <div class="practice">
    <el-card class="select-box">
      <h2>请选择题目类型</h2>
      <el-transfer
        class="select-type"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入题目类型"
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
          <el-radio v-model="num" :label="5">5题</el-radio>
          <el-radio v-model="num" :label="10">10题</el-radio>
          <el-radio v-model="num" :label="20">20题</el-radio>
      </div>
      <div class="btn-list">
        <el-button :loading="loadPractice" @click="startPractice" type="success">开始答题</el-button>
      </div>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogShow"
      width="30%"
      center>
      <span>{{tip}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="toStartPractice">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Practice',
  data () {
    return {
      practiceList: [],
      value: [],
      origin: '3',
      num: 5,
      loadPractice: false,
      tip: '',
      dialogShow: false
    }
  },
  methods: {
    ...mapMutations(['setPracticeInfo']),
    filterMethod(query, item) {
      return item.label.indexOf(query) !== -1
    },
    async getPracticeType() {
      const res = await this.$api.getPracticeType()
      if (res.status === 1) {
        this.practiceList = res.data.map(ele => {
          return {
            key: ele.id,
            label: ele.name
          }
        })
      }
    },
    async startPractice() {
      this.loadPractice = true
      const res = await this.$api.getPracticeByIds({
        subjectIds: this.value,
        origin: this.origin,
        num: this.num
      })
      if (res.status === 1) {
        if (res.data.length === 0) {
          this.$message({
            message: '该类型题目数量为0，请重新选择',
            type: 'error'
          })
          return
        }
        this.setPracticeInfo(res.data)
        this.$router.push('/practiceStart')
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }

      this.loadPractice = false
    },
    toStartPractice() {
      this.$router.push('/practiceStart')
    }
  },
  created() {
    this.getPracticeType()
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      const res = await vm.$api.hasPractice()
      if (res.status === 1) {
        vm.setPracticeInfo(res.data)
        vm.tip = res.msg
        vm.dialogShow = true
      }
    })
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
