import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      user: {
        loggedIn: false,
        token: '',
        data: {}
      }
    },
    mutations: {
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
      },
      setPlaylistsGroups(state, data){
          state.groups = data
      }
    },
    actions: {
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
      },
      groups({ commit }, data){
        commit('setPlaylistsGroups', data)
      },
      playlistSave({ commit }, dataset, id, content){

      }
    }
  })
