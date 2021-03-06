import loginApi from './login'
import userApi from './user'
import practiceApi from './practice'
const {
  login,
  emailLogin,
  sendCode,
  changePassword,
  isLogin,
  autoLogin,
  logOut
} = loginApi

const {
  getUserInfo,
  changeUserMsg,
  changePwd,
  bindEmail,
  sendBindCode,
  readMessage,
  removeMessage
} = userApi

const {
  getPracticeType,
  getPracticeByIds,
  hasPractice,
  getPracticeResult,
  getErrorPractice,
  removeError,
  getAllExam,
  getExamById,
  getExamResult
} = practiceApi
export default {
  login,
  emailLogin,
  sendCode,
  changePassword,
  isLogin,
  autoLogin,
  logOut,
  getUserInfo,
  getPracticeType,
  getPracticeByIds,
  hasPractice,
  getPracticeResult,
  getErrorPractice,
  removeError,
  changeUserMsg,
  changePwd,
  bindEmail,
  sendBindCode,
  readMessage,
  removeMessage,
  getAllExam,
  getExamById,
  getExamResult
}
