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
  getPractice
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
  getPractice
}
