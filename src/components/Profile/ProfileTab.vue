<template>
<div class='profile-tab'>
  <h2>个人信息</h2>
  <hr>
  <div class="headImg-wrapper">
    <el-upload
      class="avatar-uploader"
      action="/api/user/uploadUserHead"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="headImg" :src="headImg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
  <div class="btn-list clearfix">
    <el-button :loading="saving" @click="editInfo" type="success">{{isEdit?'保存':'编辑'}}</el-button>
    <el-button @click="cancelEdit" v-show="isEdit" type="info">取消</el-button>
  </div>
  <div class="info">
    <p>
      <span>学号：</span>{{userInfo.id}}
    </p>
    <p>
      <span>姓名：</span>{{userInfo.name}}
    </p>
    <p>
      <span>性别：</span>{{userInfo.sex}}
    </p>
    <p>
      <span>学院：</span>{{userInfo.academyName}}
    </p>
    <p>
      <span>专业：</span>{{userInfo.professionName}}
    </p>
    <p>
      <span>班级：</span>{{userInfo.className}}
    </p>
    <p>
      <span>邮箱：</span>{{userInfo.email}}
    </p>
  </div>
  <p class="msg clearfix">
      <span>个性签名：</span>
      <el-input
        type="textarea"
        placeholder="无"
        v-model="msg"
        maxlength="200"
        show-word-limit
        resize="none"
        :readonly="!isEdit"
      >
      </el-input>
    </p>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ProfileTab',
  data() {
    return {
      isEdit: false,
      msg: '',
      saving: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    headImg() {
      return this.userInfo.headImg + '#' + Date.now()
    }
  },
  methods: {
    ...mapMutations(['setHeadImg', 'setMsg']),
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPng = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPng) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPng) && isLt2M
    },
    uploadSuccess(res) {
      if (res.status === 1) {
        this.setHeadImg(res.data.headImg)
        this.$message({
          message: '头像更新成功',
          type: 'success'
        })
      } else {
        this.$message.error('头像上传失败')
      }
    },
    async editInfo() {
      if (this.isEdit) {
        this.saving = true
        const res = await this.$api.changeUserMsg(this.msg)

        if (res.status === 1) {
          this.setMsg(res.data.msg)
          this.$message({
            message: res.msg,
            type: 'success'
          })
        } else {
          this.$message.error(res.msg)
        }
        this.msg = this.userInfo.msg
        this.saving = false
        this.isEdit = false
      } else {
        this.isEdit = true
      }
    },
    cancelEdit() {
      this.msg = this.userInfo.msg
      this.isEdit = false
    }
  },
  created() {
    this.msg = this.userInfo.msg
  }
}
</script>

<style lang='scss' scoped>
.profile-tab{
  h2{
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  .headImg-wrapper{
    .avatar-uploader{
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      margin: 0 auto;
      border-radius: 50%;
      border: 1px solid #ccc;
    }
  }
  .btn-list{
    button{
      float: right;
      margin-right: 10px;
    }
  }
  .info{
    width: 300px;
    margin: 0 auto;
    font-size: 16px;
    p{
      margin: 10px 0;
    }
    span{
      display: inline-block;
      width: 100px;
      text-align: right;
    }
  }
  .msg{
    width: 300px;
    margin: 20px auto;
    span{
      font-size: 16px;
      width: 100px;
      text-align: right;
      float: left;
    }
    .el-textarea{
      float: left;
      width: 200px;
      textarea{
        height: 200px;
      }
    }
  }

}
</style>
