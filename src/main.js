import Vuex from 'vuex'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

import store from './store'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient, appOptions }) {
  // Set default layout as a global component

  Vue.use(BootstrapVue)
  Vue.use(VueAxios, axios)
  Vue.use(Vuex)

  appOptions.store = store

  appOptions.store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
  })

  appOptions.beforeCreate = function(){
      this.$store.commit('initialiseStore')
  }

  Vue.component('Layout', DefaultLayout)
}
