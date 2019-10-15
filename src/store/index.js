import Vue from 'vue'
import Vuex from 'vuex'

import folders from '~/store/modules/folders'

Vue.use(Vuex)

const state = function () {
  return {
    user: {
      loggedIn: false,
      token: '',
      data: {}
    }
  }
}

const mutations = {
  setLoggedIn (state) {
    state.user.loggedIn = true
  },
  unsetLoggedIn (state) {
    state.user.loggedIn = false
  },
  setToken (state, token) {
    state.user.token = token
  },
  setUserData (state, data) {
    state.user.data = data
  },
  // restore store.state from localStorage
  initialiseStore (state) {
    if (localStorage.getItem('store')) {
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem('store')))
      )
    }
  }
}

const actions = {
  login ({ commit }, token) {
    commit('setLoggedIn')
    commit('setToken', token)
  },
  fillUserData ({ commit }, data) {
    commit('setUserData', data)
  },
  logout ({ commit }) {
    commit('unsetLoggedIn')
    commit('setToken', '')
    commit('setUserData', {})
    commit('folders/setFolders', [])
  }
}

export default new Vuex.Store({
  strict: true,
  modules: {
    folders
  },
  state,
  mutations,
  actions
})
