<template>
<div class='home'>
  <van-nav-bar
    class="top-bar"
    title="浩考"
  />
  <main>

  </main>
</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>

<style lang='scss' scoped>
.home{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .top-bar{
    height: 44px;
    line-height: 44px;
    background-color: #222;
    .van-nav-bar__title{
      font-size: 20px;
      color: #fff;
    }
  }
  main{
    flex-grow: 1;
  }

}
</style>
