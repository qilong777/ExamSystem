import Vue from 'vue'
import Vuex from 'vuex'
import api from 'api'
import { baseUrl } from '@/baseConst'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    practiceInfo: []
  },
  mutations: {
    // 设置用户信息
    setUserInfo (state, userInfo) {
      userInfo.headImg = baseUrl + userInfo.headImg
      userInfo = Object.assign({}, state.userInfo, userInfo)
      state.userInfo = userInfo
    },
    setHeadImg(state, headImg) {
      state.userInfo = Object.assign({}, state.userInfo, { headImg: baseUrl + headImg })
    },
    setMsg(state, msg) {
      state.userInfo = Object.assign({}, state.userInfo, { msg })
    },
    // 设置练习题目
    setPracticeInfo (state, practiceInfo) {
      state.practiceInfo = practiceInfo
    }

  },
  getters: {

  },
  actions: {
    setUserInfo({ commit }) {
      api.getUserInfo().then(res => {
        if (res.status === 1) {
          commit('setUserInfo', res.data)
        }
      })
    }
  },
  modules: {
  }
})
