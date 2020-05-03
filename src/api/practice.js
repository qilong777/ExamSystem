import { request } from '@/network'

// 获取该学生对应的所有练习类型
const getPracticeType = () => {
  const url = '/api/practice/practiceType'
  return request({
    method: 'get',
    url
  })
}

// 根据选择的题目类型获取对应的练习题目
const getPracticeByIds = (data) => {
  const url = '/api/practice/practiceInfo'
  return request({
    method: 'post',
    url,
    data
  })
}

// 根据选择的题目类型获取对应的练习题目
const hasPractice = () => {
  const url = '/api/practice/hasPractice'
  return request({
    method: 'get',
    url
  })
}

// 获取练习结果
const getPracticeResult = (data) => {
  const url = '/api/practice/practiceResult'
  return request({
    method: 'post',
    url,
    data
  })
}

// 获取错题
const getErrorPractice = ({ page, pageSize }) => {
  const url = `/api/practice/errorPractice/${page}/${pageSize}`
  return request({
    method: 'get',
    url
  })
}

// 获取错题
const removeError = (id) => {
  const url = `/api/practice/errorPractice/${id}`
  return request({
    method: 'delete',
    url
  })
}

export default {
  getPracticeType,
  getPracticeByIds,
  hasPractice,
  getPracticeResult,
  getErrorPractice,
  removeError
}
