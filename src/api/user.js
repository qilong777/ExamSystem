import { request } from '@/network'
// import md5 from 'md5'

// 账号登录接口
const getUserInfo = () => {
  const url = '/api/user/userInfo'
  return request({
    method: 'get',
    url
  })
}

// 获取该学生对应的所有练习类型
const getPractice = () => {
  const url = '/api/user/practice'
  return request({
    method: 'get',
    url
  })
}

export default {
  getUserInfo,
  getPractice
}
