import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'

import api from 'api'
import cookie from 'assets/js/cookie'
import md5 from 'md5'
import echarts from 'echarts'

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$cookie = cookie
Vue.prototype.$md5 = md5
Vue.prototype.$echarts = echarts

router.beforeEach(async(to, from, next) => {
  if (to.path === '/login') {
    if (cookie.getItem('userInfo')) {
      const res = await api.autoLogin()
      if (res.status === 1) {
        next('/')
        Vue.prototype.$message({
          message: res.msg,
          type: 'success'
        })
      } else {
        cookie.removeItem('userInfo')
        Vue.prototype.$message({
          message: res.msg,
          type: 'warning'
        })
        next()
      }
    } else {
      next()
    }
    return
  }
  const loading = Vue.prototype.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  const res = await api.isLogin()
  loading.close()
  if (res.status === 1) {
    next()
  } else {
    Vue.prototype.$message({
      message: res.msg,
      type: 'error'
    })
    next('/login')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
