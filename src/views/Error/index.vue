<template>
  <div class="error">
    <el-card class="error-box">
      <h2>我的错题</h2>
      <hr>
      <div class="title">
        <span>题目</span>
        <span>科目</span>
        <span>操作</span>
      </div>

      <ul v-show="errorList.length>0" class="error-list" v-loading="loading">
        <li v-for="(item,index) in errorList" :key="item.id">
          <p>{{item.question}}</p>
          <p>{{item.name}}</p>
          <p>
            <el-button type="success" size="medium" @click="showDetail(index)">查看详情</el-button>
            <el-popconfirm
              icon="el-icon-info"
              iconColor="red"
              title="确定要删除吗？"
              @onConfirm="removeError(item.id)"
            >
              <el-button slot="reference" type="danger" size="medium">删除</el-button>
            </el-popconfirm>

          </p>
        </li>
      </ul>
      <div class="page-list-wrapper">
        <el-pagination v-show="errorList.length>0" class="page-list"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="changePage">
        </el-pagination>
      </div>

      <p class="no-error" v-show="errorList.length===0">
        您还未有错题，真棒！
      </p>
    </el-card>
    <el-dialog
      title="我的错题"
      :visible.sync="dialogShow"
      width="60%"
      center>
      <div class="practice-wrapper">
        <p class="title">
          问题：{{nowError.question}}
        </p>
        <p class="options" v-for="(item,index) in nowError.options" :key="index">
          {{String.fromCharCode(65+index)+ '. ' +  item}}
        </p>
        <div class="finish-wrapper">
          <p class="correct-answer">正确答案：{{nowError.answer}}</p>
          <p class="your-answer">你的答案：{{nowError.yourAnswer === ''? '空':nowError.yourAnswer}}</p>
          <p :class="{'correct':isCorrect,'error':!isCorrect}">{{isCorrect? '回答正确' : '回答错误'}}</p>
          <p class="analysis">解析：{{nowError.analysis}}</p>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :loading="removing" type="danger" @click="removeError(nowError.id)">删 除</el-button>
        <el-button type="primary" @click="dialogShow = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data () {
    return {
      errorList: [],
      total: 0,
      pageSize: 5,
      loading: false,
      dialogShow: false,
      nowPage: 1,
      removing: false,
      nowError: {}
    }
  },
  computed: {
    isCorrect() {
      return this.nowError.answer === this.nowError.yourAnswer
    }
  },
  methods: {
    async getErrorPractice(data) {
      this.loading = true
      const res = await this.$api.getErrorPractice(data)

      if (res.status === 1) {
        this.errorList = res.data.errorList
        this.total = res.data.total
      }
      this.loading = false
    },
    changePage(page) {
      this.nowPage = page
      this.getErrorPractice({ page, pageSize: this.pageSize })
    },
    showDetail(index) {
      this.nowError = this.errorList[index]
      this.dialogShow = true
    },
    async removeError(id) {
      this.removing = true
      const res = await this.$api.removeError(id)
      if (res.status === 1) {
        this.getErrorPractice({ page: this.nowPage, pageSize: this.pageSize })
        this.$message({
          message: res.msg,
          type: 'success'
        })
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.removing = false
      this.dialogShow = false
    }
  },
  created() {
    this.getErrorPractice({ page: this.nowPage, pageSize: this.pageSize })
  }
}
</script>

<style lang='scss'>
.error{
  .error-box{
    width: 900px;
    margin: 0 auto;
    h2{
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .title{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      font-size: 18px;
      span{
        flex-grow: 1;
        text-align: center;
      }
    }
    .error-list{
      display: flex;
      flex-direction: column;
      align-items: stretch;
      height: 400px;
      li{
        padding: 10px 0;
        border-bottom: 1px dashed #000;
        p{
          float: left;
          line-height: 30px;
          font-size: 16px;
          width: 33.3%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          button{
            margin-right: 10px;
          }
        }
      }
    }
    .page-list-wrapper{
      display: flex;
      justify-content: center;
      align-content: center;
      height: 60px;
    }
    .no-error{
      text-align: center;
      margin: 10px 0;
      font-size: 20px;
    }
  }
  .practice-wrapper{
    padding: 20px 50px;
    .title{
      font-size: 18px;
      margin-bottom: 15px;
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
      p{
        margin-bottom: 5px;
      }
    }
    .correct{
      color: #67C23A;
    }
    .error{
      color: #f40;
    }
  }
}
</style>
