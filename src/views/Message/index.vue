<template>
  <div class="message">
    <el-card class="message-box">
      <h2>我的消息</h2>
      <hr>
      <div class="title">
        <span>内容</span>
        <span>操作</span>
      </div>

      <ul v-show="message.length>0" class="message-list">
        <li class="clearfix" v-for="(item,index) in message" :key="item.id">
          <p class="msg-content">{{item.content}}</p>
          <p>
            <el-button :loading="reading" v-if="item.isRead===0" type="success" size="mini" @click="read(item.id,index)">标为已读</el-button>
            <el-popconfirm
              icon="el-icon-info"
              iconColor="red"
              title="确定要删除吗？"
              @onConfirm="remove(item.id,index)"
            >
              <el-button :loading="removing" slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>

          </p>
        </li>
      </ul>

      <p class="no-message" v-show="message.length===0">
        暂时没有新消息
      </p>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Message',
  data () {
    return {
      reading: false,
      removing: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    message() {
      if (this.userInfo.message) {
        return this.userInfo.message
      }
      return []
    }
  },
  methods: {
    ...mapMutations(['setMessage']),
    async read(id, index) {
      this.reading = true
      const res = await this.$api.readMessage(id)
      if (res.status === 1) {
        this.$message.success(res.msg)
        let message = [...this.message]
        message[index].isRead = 1
        this.setMessage(message)
      } else {
        this.$message.error(res.msg)
      }
      this.reading = false
    },

    async remove(id, index) {
      this.removing = true
      const res = await this.$api.removeMessage(id)
      if (res.status === 1) {
        this.$message.success(res.msg)
        let message = [...this.message]
        message.splice(index, 1)
        this.setMessage(message)
      } else {
        this.$message.error(res.msg)
      }
      this.removing = false
    }
  },
  created() {

  }
}
</script>

<style lang='scss'>
.message{
  .message-box{
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
    .message-list{
      li{
        width: 100%;
        padding: 10px 0;
        margin: 10px;
        border-bottom: 1px dashed #000;
        p{
          float: left;
          font-size: 16px;
          button{
            margin-right: 10px;
          }
          &.msg-content{
            width: 70%;
            padding: 0;
          }
        }
      }
    }
    .no-message{
      font-size: 18px;
      text-align: center;
    }
  }

}
</style>
