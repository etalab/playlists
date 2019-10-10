import Vuex from 'vuex'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import axios from 'axios'
import VueAxios from 'vue-axios'
import NProgress from 'vue-nprogress'

import store from './store'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient, appOptions }) {
  Vue.component('Layout', DefaultLayout)

  library.add(faArrowsAlt)
  Vue.component('font-awesome-icon', FontAwesomeIcon)

  Vue.use(VueAxios, axios)

  Vue.use(BootstrapVue)
  Vue.use(NProgress)

  Vue.use(Vuex)

  if (isClient) {
    const nprogress = new NProgress()
    appOptions.nprogress = nprogress

    appOptions.store = store
    appOptions.store.subscribe((mutation, state) => {
      localStorage.setItem('store', JSON.stringify(state))
    })
    appOptions.beforeCreate = function () {
      this.$store.commit('initialiseStore')
    }
  }
}
