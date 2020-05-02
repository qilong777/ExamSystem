import loginApi from './login'
import userApi from './user'
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
  getPracticeType,
  getPracticeByIds,
  hasPractice,
  getPracticeResult
} = userApi

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
  getPracticeResult
}
