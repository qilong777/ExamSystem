import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('views/Home')
const Discuss = () => import('views/Discuss')
const Message = () => import('views/Message')
const Profile = () => import('views/Profile')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/discuss',
    component: Discuss
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/profile',
    component: Profile
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
