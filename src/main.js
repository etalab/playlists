// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'


import DefaultLayout from '~/layouts/Default.vue'


export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component

  Vue.use(BootstrapVue)
  Vue.use(VueAxios, axios)

  head.script.push({
      "data-udata": "https://www.data.gouv.fr/",
      "src": "https://static.data.gouv.fr/static/oembed.js"
  })

  Vue.component('Layout', DefaultLayout)
}
