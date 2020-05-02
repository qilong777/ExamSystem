<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      list: {

      }
    }
  }
}

</script>

<style lang="scss">
@import url('assets/css/base.css');
html,body,#app{
  height: 100%;
}
.el-popconfirm{
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  .el-popconfirm__main{
    margin-bottom: 10px;
  }
}
</style>
