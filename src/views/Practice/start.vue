<template>
  <div class="practice">
    <el-card class="practice-box">
      <h2>{{finished?'练习已结束，请查看解析':'练习进行中...'}}</h2>
      <hr>
      <div class="practice-wrapper">
        <p class="title">
          {{nowIndex+1}}. {{question}}
          <input v-if="type === 3" v-model="answer1" :disabled="finished"/>
        </p>
        <el-radio-group :disabled="finished" class="options-wrapper" v-if="type === 1" v-model="answer1">
          <p class="options" v-for="(item,index) in options" :key="index">
            <el-radio v-model="answer1" :label="String.fromCharCode(65+index)">{{String.fromCharCode(65+index)+ '. ' + item}}</el-radio>
          </p>
        </el-radio-group>
        <el-checkbox-group :disabled="finished" class="options-wrapper" v-else-if="type === 2" v-model="answer2">
          <p class="options" v-for="(item,index) in options" :key="index">
            <el-checkbox  :label="String.fromCharCode(65+index)">{{String.fromCharCode(65+index)+ '. ' + item}}</el-checkbox>
          </p>
        </el-checkbox-group>
        <div class="options-wrapper" v-else></div>
        <div class="finish-wrapper" v-if="finished">
          <p class="correct-answer">正确答案：{{correctAnswer}}</p>
          <p class="your-answer">你的答案：{{yourAnswer}}</p>
          <p :class="{'correct':isCorrect,'error':!isCorrect}">{{isCorrect? '回答正确' : '回答错误'}}</p>
          <p class="analysis">{{analysis}}</p>
        </div>
        <p class="btn-wrapper clearfix">
          <el-button type="primary" @click="next" :disabled="nowIndex>=practiceInfo.length-1">下一题<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          <el-button icon="el-icon-arrow-left" type="primary" @click="forward" :disabled="nowIndex===0">上一题</el-button>
        </p>
        <div class="page-list clearfix">
          <li :class="{'now-page':index == nowIndex}" v-for="(item, index) in practiceInfo" :key="index" @click="go(index)">
            {{index+1}}
            <i v-show="isAnswered(index)" :class="['icon',getIcon(item,index)]"></i>
          </li>
        </div>

      </div>
      <el-button v-show="!finished" class="submit-btn" type="success" @click="dialogShow=true" >提交练习</el-button>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogShow"
      width="30%"
      center>
      <span>确认提交练习吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="submitPracitce">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'PracticeStart',
  data () {
    return {
      nowIndex: 0,
      answer1: '',
      answer2: [],
      answers: [],
      correctAnswers: [],
      analysises: [],
      dialogShow: false,
      finished: false,
      pageIcons: []
    }
  },
  computed: {
    ...mapState(['practiceInfo']),
    options() {
      if (this.type !== 3 && this.practiceInfo[this.nowIndex]) {
        let options = this.practiceInfo[this.nowIndex].options
        return options.split('$$')
      } else {
        return ''
      }
    },
    question() {
      if (this.practiceInfo[this.nowIndex]) {
        if (this.type === 3) {
          return this.practiceInfo[this.nowIndex].question.replace('$$', '')
        }
        return this.practiceInfo[this.nowIndex].question
      } else {
        return ''
      }
    },
    type() {
      if (this.practiceInfo[this.nowIndex]) {
        return this.practiceInfo[this.nowIndex].type
      } else {
        return ''
      }
    },
    correctAnswer() {
      return this.correctAnswers[this.nowIndex] || ''
    },
    yourAnswer() {
      if (this.type === 2) {
        if (this.answers[this.nowIndex] && this.answers[this.nowIndex].length > 0) {
          let answer = [...this.answers[this.nowIndex]]
          return answer.sort().join('')
        } else {
          return '空'
        }
      }
      return this.answers[this.nowIndex] || '空'
    },
    isCorrect() {
      return this.correctAnswer === this.yourAnswer
    },
    analysis() {
      return this.analysises[this.nowIndex] || ''
    }

  },
  methods: {
    ...mapActions(['setUserInfo']),
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
    async submitPracitce() {
      this.go(this.nowIndex)
      const res = await this.$api.getPracticeResult({ answers: this.answers })
      if (res.status === 1) {
        let data = res.data
        this.correctAnswers = data.map(ele => ele.answer)
        this.analysises = data.map(ele => ele.analysis)

        this.dialogShow = false
        this.finished = true
        this.setUserInfo()
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
        this.$router.push('/practice')
      }
    },
    getIcon(item, index) {
      // finished ? (correctAnswers[index] === answers[index] ? 'el-icon-circle-check correct' : 'el-icon-circle-close error') : 'el-icon-circle-check correct'
      if (this.finished) {
        let answer
        if (item.type === 2) {
          answer = this.answers[index] || []
          answer = [...answer].sort().join('')
        } else {
          answer = this.answers[index] || ''
        }

        return this.correctAnswers[index] === answer ? 'el-icon-circle-check correct' : 'el-icon-circle-close error'
      } else {
        return 'el-icon-circle-check correct'
      }
    }
  },
  created() {

  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      const res = await vm.$api.hasPractice()
      if (res.status !== 1 || vm.practiceInfo.length === 0) {
        vm.$message({
          message: '请选择题目类型',
          type: 'error'
        })
        vm.$router.push('/practice')
      }
    })
  }
}
</script>

<style lang='scss' scoped>
.practice{
  .practice-box{
    position: relative;
    width: 900px;
    margin: 0 auto;
    h2{
      text-align: center;
      font-size: 18px;
    }
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
    }
    .submit-btn{
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
}
</style>
