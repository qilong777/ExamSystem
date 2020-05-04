import { request } from '@/network'
import md5 from 'md5'
// 账号登录接口
const getUserInfo = () => {
  const url = '/api/user/userInfo'
  return request({
    method: 'get',
    url
  })
}

// 上传头像
const uploadUserHead = () => {
  const url = '/api/user/uploadUserHead'
  return request({
    method: 'post',
    url
  })
}

// 修改个性签名
const changeUserMsg = (msg) => {
  const url = '/api/user/msg'
  return request({
    method: 'put',
    url,
    data: {
      msg
    }
  })
}

const changePwd = (pwd) => {
  const url = '/api/user/pwd'
  return request({
    method: 'put',
    url,
    data: {
      pwd: md5(pwd)
    }
  })
}
const bindEmail = (data) => {
  const url = '/api/user/bindEmail'
  return request({
    method: 'post',
    url,
    data
  })
}

// 发送邮箱验证码
const sendBindCode = (email) => {
  const url = `/api/user/sendCode?email=${email}`
  return request({ url })
}

const readMessage = (id) => {
  const url = `/api/user/message/${id}`
  return request({
    method: 'put',
    url
  })
}

const removeMessage = (id) => {
  const url = `/api/user/message/${id}`
  return request({
    method: 'delete',
    url
  })
}

export default {
  getUserInfo,
  uploadUserHead,
  changeUserMsg,
  changePwd,
  bindEmail,
  sendBindCode,
  readMessage,
  removeMessage
}
