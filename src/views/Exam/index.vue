<template>
  <div class="exam">
    <el-card class="exam-card">
      <h2>在线考试</h2>
      <div class="clearfix exam-wrapper">
        <div class="left">
          <div class="time-wrapper">
            <el-progress
              class="time"
              type="circle"
              :percentage="ratio"
              :show-text="false"></el-progress>
            <span class="item-text">{{remainTime}}</span>
          </div>
          <el-select :disabled="started" @change="changeExam" class="select" v-model="examId" placeholder="请选择">
            <el-option
              v-for="item in examList"
              :key="item.examId"
              :label="item.subjectName"
              :value="item.examId">
            </el-option>
          </el-select>
          <el-button :disabled="started" class="btn" type="success" @click="start">开始考试</el-button>
        </div>
        <div class="right">
          <div class="practice-wrapper" v-if="started">
            <p class="title">
              {{nowIndex+1}}. {{question}}
              <input v-if="type === 3" v-model="answer1"/>
            </p>
            <el-radio-group class="options-wrapper" v-if="type === 1" v-model="answer1">
              <p class="options" v-for="(item,index) in options" :key="index">
                <el-radio v-model="answer1" :label="String.fromCharCode(65+index)">{{String.fromCharCode(65+index)+ '. ' + item}}</el-radio>
              </p>
            </el-radio-group>
            <el-checkbox-group class="options-wrapper" v-else-if="type === 2" v-model="answer2">
              <p class="options" v-for="(item,index) in options" :key="index">
                <el-checkbox  :label="String.fromCharCode(65+index)">{{String.fromCharCode(65+index)+ '. ' + item}}</el-checkbox>
              </p>
            </el-checkbox-group>
            <div class="options-wrapper" v-else></div>

            <p class="btn-wrapper clearfix">
              <el-button type="primary" @click="next" :disabled="nowIndex>=examInfo.length-1">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
              <el-button icon="el-icon-arrow-left" type="primary" @click="forward" :disabled="nowIndex===0">上一题</el-button>
            </p>
            <div class="page-list clearfix">
              <li :class="{'now-page':index == nowIndex}" v-for="(item, index) in examInfo" :key="index" @click="go(index)">
                {{index+1}}
                <i v-show="isAnswered(index)" class="icon el-icon-circle-check"></i>
              </li>
            </div>
            <div class="clearfix">
              <el-button v-show="started" class="submit-btn" type="success" @click="toSubmit" >提交试卷</el-button>
            </div>
          </div>
          <div class="result" v-else>
            {{result}}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Exam',
  data () {
    return {
      allTimeStamp: 1,
      remainTimeStamp: 0,
      examList: [],
      examId: '',
      timer: null,
      started: false,
      examInfo: [],
      nowIndex: 0,
      answer1: '',
      answer2: [],
      answers: [],
      result: ''
    }
  },
  computed: {
    remainTime() {
      let leftTime = this.remainTimeStamp
      let hours = ('0' + parseInt((leftTime / 1000 / 60 / 60 % 24), 10)).slice(-2) // 计算剩余的小时
      let minutes = ('0' + parseInt((leftTime / 1000 / 60 % 60), 10)).slice(-2)// 计算剩余的分钟
      let seconds = ('0' + parseInt((leftTime / 1000 % 60), 10)).slice(-2)// 计算剩余的秒数
      return hours + ':' + minutes + ':' + seconds
    },
    ratio() {
      return this.remainTimeStamp / this.allTimeStamp * 100
    },
    options() {
      if (this.type !== 3 && this.examInfo[this.nowIndex]) {
        let options = this.examInfo[this.nowIndex].options
        return options.split('$$')
      } else {
        return ''
      }
    },
    question() {
      if (this.examInfo[this.nowIndex]) {
        if (this.type === 3) {
          return this.examInfo[this.nowIndex].question.replace('$$', '')
        }
        return this.examInfo[this.nowIndex].question
      } else {
        return ''
      }
    },
    type() {
      if (this.examInfo[this.nowIndex]) {
        return this.examInfo[this.nowIndex].type
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions(['setUserInfo']),
    async getAllExam() {
      const res = await this.$api.getAllExam()
      if (res.status === 1) {
        this.examList = res.data.examList
      }
    },
    changeExam(id) {
      for (let i = 0; i < this.examList.length; i++) {
        const ele = this.examList[i]
        if (ele.examId === id) {
          this.remainTimeStamp = ele.time * 60 * 1000
          this.allTimeStamp = this.remainTimeStamp
        }
      }
    },
    async start() {
      this.clearTimer()
      const res = await this.$api.getExamById(this.examId)

      if (res.status === 1) {
        this.$message.success('考试开始')
        this.examInfo = res.data.examInfo
        this.started = true
        this.timer = setInterval(() => {
          this.remainTimeStamp -= 1000
          if (this.remainTimeStamp <= 0) {
            this.submitExam()
            this.clearTimer()
          }
        }, 1000)
      } else {
        this.$message.error(res.msg)
      }
    },
    next() {
      this.go(this.nowIndex + 1)
    },
    forward() {
      this.go(this.nowIndex - 1)
    },
    go(index) {
      this.answers[this.nowIndex] = this.type === 2 ? this.answer2 : this.answer1
      this.nowIndex = index
      if (this.type === 2) {
        this.answer2 = this.answers[index] || []
      } else {
        this.answer1 = this.answers[index] || ''
      }
    },
    isAnswered(index) {
      if (this.finished) { return true }
      if (!this.answers[index] || this.answers[index].length === 0) {
        return false
      } else {
        return true
      }
    },
    async submitExam() {
      this.go(this.nowIndex)
      const res = await this.$api.getExamResult({ answers: this.answers })
      if (res.status === 1) {
        this.result = res.data.result
        this.examId = ''
        this.started = false
        this.allTimeStamp = 1
        this.remainTimeStamp = 0
        this.examInfo = []
        this.nowIndex = 0
        this.answer1 = ''
        this.answer2 = []
        this.answers = []
        this.$message.success('试卷提交成功')
        this.getAllExam()
        this.clearTimer()
        this.setUserInfo()
      } else {
        this.$message.error(res.msg)
        this.$router.push('/exam')
      }
    },
    toSubmit() {
      this.$confirm('确定提交试卷吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submitExam()
      }).catch(() => {

      })
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  },
  created() {
    this.getAllExam()
  },
  beforeDestroy() {
    if (this.started) {
      this.submitExam()
    } else {
      this.clearTimer()
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.started) {
      this.$confirm('确定要离开吗？试卷会自动上传', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next()
      }).catch(() => {

      })
    } else {
      next()
    }
  }

}
</script>

<style lang='scss' scoped>
.exam{
  .exam-card{
    width: 900px;
    margin: 0 auto;
  }
  h2{
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    padding-bottom: 20px;
    border-bottom: 1px solid #000;
  }
  .exam-wrapper{
    height: 500px;
  }
  .left{
    float: left;
    height: 100%;
    width: 150px;
    border-right: 1px solid #000;
    padding-top: 20px;
    .time-wrapper{
      position: relative;
      .time{
        margin-left: 13px;
      }
      .item-text{
        position: absolute;
        top: 53px;
        left: 36px;
        margin: auto;
        font-size: 20px;

      }
    }
    .select{
      margin-top: 20px;
      margin-right: 10px;
    }
    .btn{
      margin-top: 20px;
      margin-left: 20px;
    }

  }
  .right{
    float: left;
    width: 700px;
    .practice-wrapper{
      padding: 50px;
      .title{
        font-size: 18px;
        margin-bottom: 15px;
        input{
          font-size: 18px;
          border-bottom: 1px solid #000;
          width: 100px;
          text-align: center;
        }
      }
      .options-wrapper{
        min-height: 200px;
        width: 100%;
      }
      .options{
        margin: 10px 0;
        font-size: 16px;
        label{
          display: inline-block;
          width: 100%;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          &:hover{
            color: rgb(41, 110, 179);
            border-color: rgb(41, 110, 179);
          }
        }
      }
      .finish-wrapper{
        font-size: 16px;
      }
      .correct{
        color: #67C23A;
      }
      .error{
        color: #f40;
      }
      .btn-wrapper{
        button{
          float: right;
          margin: 0 15px;
        }
      }
      .page-list{
        li{
          position: relative;
          cursor: pointer;
          &:first-child{
            border-left: 1px solid #000;
          }
          float: left;
          width: 35px;
          height: 35px;
          line-height: 35px;
          font-size: 16px;
          text-align: center;
          border: 1px solid #000;
          border-left: 0 none;
          margin-top: 15px;
          &.now-page,&:hover{
            background-color: #409EFF;
            color: #fff;
            .icon{
              color: #fff;
            }
          }
          .icon{
            position: absolute;
            top: 0px;
            right: 0px;
            // color: #67C23A;
          }
        }
      }
      .submit-btn{
        float: right;
      }
    }
    .result{
      font-size: 20px;
      text-align: center;
      font-weight: bold;
      margin-top: 10px;
    }
  }
}
</style>
