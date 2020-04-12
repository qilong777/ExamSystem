import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import {
  Tabbar, TabbarItem,
  Icon,
  NavBar
} from 'vant'

Vue
  .use(Tabbar).use(TabbarItem)
  .use(Icon)
  .use(NavBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
