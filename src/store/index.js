import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    avatarUrl: 'http://localhost:8080/nan.png'
  },
  mutations: {
    // 设置用户头像路径
    setAvatarUrl (state, url) {
      state.avatarUrl = url
    },
    // 添加播放列表
    addSongList (state, params) {
      // params 要播放的歌曲列表
      // 排除掉已存在的歌曲
      const fparams = params.filter(ele => {
        return !state.songList.some(item => ele.songmid === item.songmid)
      })
      if (fparams.length) {
        state.songList.unshift(...fparams)
        state.currentIndex = 0
      } else {
        state.currentIndex = state.songList.findIndex(ele => ele.songmid === params[0].songmid)
      }
    },
    deleteSongList (state, index) {
      if (state.currentIndex > index) {
        state.currentIndex--
      }
      state.songList.splice(index, 1)
    },
    clearSongList (state) {
      state.currentIndex = -1
      state.songList = []
    },
    changeCurrentIndex (state, index) {
      // 修改当前正在播放那首歌
      state.currentIndex = index
    },
    nextCurrentIndex (state) {
      state.currentIndex = (state.currentIndex + 1) % state.songList.length
    },
    prevCurrentIndex (state) {
      if (state.currentIndex > 0) {
        state.currentIndex--
      } else {
        state.currentIndex = state.songList.length - 1
      }
    },
    changeLoop (state) {
      // 修改循环模式
      state.loop = (state.loop + 1) % 3
    }
  },
  getters: {
    currentSong (state) {
      // 当前正在播放的那首歌
      return state.songList[state.currentIndex] || null
    }
  },
  actions: {
  },
  modules: {
  }
})
