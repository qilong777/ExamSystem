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
const getPracticeType = () => {
  const url = '/api/user/practiceType'
  return request({
    method: 'get',
    url
  })
}

// 根据选择的题目类型获取对应的练习题目
const getPracticeByIds = (data) => {
  const url = '/api/user/practiceInfo'
  return request({
    method: 'post',
    url,
    data
  })
}

// 根据选择的题目类型获取对应的练习题目
const hasPractice = () => {
  const url = '/api/user/hasPractice'
  return request({
    method: 'get',
    url
  })
}

// 获取练习结果
const getPracticeResult = (data) => {
  const url = '/api/user/practiceResult'
  return request({
    method: 'post',
    url,
    data
  })
}

// 获取错题
const getErrorPractice = ({ page, pageSize }) => {
  const url = `/api/user/errorPractice/${page}/${pageSize}`
  return request({
    method: 'get',
    url
  })
}

// 获取错题
const removeError = (id) => {
  const url = `/api/user/errorPractice/${id}`
  return request({
    method: 'delete',
    url
  })
}

export default {
  getUserInfo,
  getPracticeType,
  getPracticeByIds,
  hasPractice,
  getPracticeResult,
  getErrorPractice,
  removeError
}
