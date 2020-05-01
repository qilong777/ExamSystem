import Vue from 'vue'
import Vuex from 'vuex'
import api from 'api'
import { baseUrl } from '@/baseConst'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {

    }
  },
  mutations: {
    // 设置用户头像路径
    setUserInfo (state, userInfo) {
      userInfo.headImg = baseUrl + userInfo.headImg
      userInfo = Object.assign({}, state.userInfo, userInfo)
      state.userInfo = userInfo
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
