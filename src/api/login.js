import { request } from '@/network'
import md5 from 'md5'

// 账号登录接口
const login = ({ id, password, verify }) => {
  const url = '/api/login/login'
  return request({
    method: 'post',
    url,
    data: {
      id,
      password: md5(password),
      verify
    }
  })
}

// 邮箱登录接口
const emailLogin = (data) => {
  const url = '/api/login/emailLogin'
  return request({
    method: 'post',
    url,
    data
  })
}

// 发送邮箱验证码
const sendCode = (email) => {
  const url = `/api/login/sendCode?email=${email}`
  return request({ url })
}

// 修改密码
const changePassword = ({ email, code, password }) => {
  const url = '/api/login/changePassword'
  return request({
    method: 'post',
    url,
    data: {
      email,
      code,
      password: md5(password)
    }
  })
}

// 判断用户是否登录
const isLogin = () => {
  const url = `/api/login/isLogined`
  return request({ url })
}

// 自动登录
const autoLogin = () => {
  const url = `/api/login/autoLogin`
  return request({ url })
}

// 退出登录
const logOut = () => {
  const url = `/api/login/logout`
  return request({ url })
}

export default {
  login,
  emailLogin,
  sendCode,
  changePassword,
  isLogin,
  autoLogin,
  logOut
}
