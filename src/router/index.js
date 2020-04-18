import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('views/Home')
const Common = () => import('views/Common')
const Login = () => import('views/Login')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Common,
    children: [
      {
        path: '/home',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
