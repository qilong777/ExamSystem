import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/Home')
const Practice = () => import('views/Practice')
const Exam = () => import('views/Exam')
const Common = () => import('views/Common')
const Login = () => import('views/Login')
const Error = () => import('views/Error')
const Message = () => import('views/Message')
const Profile = () => import('views/Profile')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Common,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'practice',
        component: Practice
      },
      {
        path: 'exam',
        component: Exam
      },
      {
        path: 'error',
        component: Error
      },
      {
        path: 'message',
        component: Message
      },
      {
        path: 'profile',
        component: Profile
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
