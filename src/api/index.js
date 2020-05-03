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
  changeUserMsg
} = userApi

const {
  getPracticeType,
  getPracticeByIds,
  hasPractice,
  getPracticeResult,
  getErrorPractice,
  removeError
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
  changeUserMsg
}
