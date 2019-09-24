// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')

function defaultErrorCallback (res) {
  console.error('API error', res)
}

class Api {
  API_BASE_URL = 'https://www.data.gouv.fr'

  get (path, success, errorCallback) {
    errorCallback = errorCallback || defaultErrorCallback
    return axios.get(`${this.API_BASE_URL}/api/1/${path}/`)
    .then(success)
    .catch(errorCallback)
  }
}

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
