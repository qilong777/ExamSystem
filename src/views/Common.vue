<template>
  <div class="wrapper">
    <TopMenu></TopMenu>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TopMenu from 'components/TopMenu'
export default {
  name: 'Common',
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['avatarUrl'])
  },
  methods: {
    ...mapMutations(['setAvatarUrl'])
  },
  components: {
    TopMenu
  },
  created() {
    this.setAvatarUrl('http://localhost:8080/nan.png')
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
