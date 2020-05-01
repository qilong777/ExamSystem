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
        component: Home,
        meta: { title: '首页' }
      },
      {
        path: 'practice',
        component: Practice,
        meta: { title: '个人练习' }
      },
      {
        path: 'exam',
        component: Exam,
        meta: { title: '在线考试' }
      },
      {
        path: 'error',
        component: Error,
        meta: { title: '我的错题' }
      },
      {
        path: 'message',
        component: Message,
        meta: { title: '我的消息' }
      },
      {
        path: 'profile',
        component: Profile,
        meta: { title: '个人信息' }
      }

    ]
  },
  {
    path: '/login',
    component: Login,
    meta: { title: '请您先登录' }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
