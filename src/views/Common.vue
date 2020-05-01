<template>
  <div class="wrapper">
    <TopMenu></TopMenu>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TopMenu from 'components/TopMenu'
export default {
  name: 'Common',
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    ...mapActions(['setUserInfo'])
  },
  components: {
    TopMenu
  },
  created() {
    this.setUserInfo()
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
  padding-bottom: 50px;
}
</style>
