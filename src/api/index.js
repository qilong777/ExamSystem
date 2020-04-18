import { request } from '@/network'

// 账号登录接口
const login = (data) => {
  const url = '/api/user/login'
  return request({
    method: 'post',
    url,
    data
  })
}

// 邮箱登录接口
const emailLogin = (data) => {
  const url = '/api/user/emailLogin'
  return request({
    method: 'post',
    url,
    data
  })
}

// 发送邮箱验证码
const sendCode = (email) => {
  const url = `/api/user/sendCode?email=${email}`
  return request({ url })
}

// 发送邮箱验证码
const changePassword = (data) => {
  const url = '/api/user/changePassword'
  return request({
    method: 'post',
    url,
    data
  })
}

export default {
  login,
  emailLogin,
  sendCode,
  changePassword
}
