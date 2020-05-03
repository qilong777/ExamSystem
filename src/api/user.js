import { request } from '@/network'

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

export default {
  getUserInfo,
  uploadUserHead,
  changeUserMsg
}
