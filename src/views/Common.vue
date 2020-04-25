<template>
  <div class="wrapper">
    <TopMenu></TopMenu>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import TopMenu from 'components/TopMenu'
export default {
  name: 'Common',
  data() {
    return {

    }
  },
  components: {
    TopMenu
  }
}
</script>

<style>
.wrapper{
  background: #eee;
  min-height: 100%;
}
.content{
  padding-top: 70px;
}
</style>
