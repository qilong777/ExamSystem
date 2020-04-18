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
</style>
