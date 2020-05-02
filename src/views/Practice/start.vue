<template>
  <div class="practice">
    <el-card class="practice-box">
      <h2>请选择题目类型</h2>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Practice',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['practiceInfo'])
  },
  methods: {

  },
  created() {

  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      const res = await vm.$api.hasPractice()
      if (res.status !== 1) {
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

  }
}
</style>
