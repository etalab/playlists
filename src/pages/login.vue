<template>
  <div>
    <h1>Login page</h1>
    <a href="/">back</a>
  </div>
</template>

<script>
import Api from '~/services/Api'

const BASE_URL = 'https://www.data.gouv.fr'

const $api = new Api()

export default {
  data () {
    return {}
  },
  mounted () {
    if (!this.token) {
      console.debug('No oauth token found ¯\\_(ツ)_/¯')

      if (!this.$store.state.auth.user.loggedIn) {
        window.location = this.tokenURL
      } else {
        console.log('Logged in', this.$store.state.auth.user)
        this.$router.push('/')
      }
    } else {
      this.$store.dispatch('auth/login', this.token)
        .then(() => {
          $api.get('me')
            .then((response) => {
              this.$store.dispatch('auth/fillUserData', response.data).then(() => {
                this.$router.push('/')
              })
            })
        })
    }
  },
  computed: {
    tokenURL () {
      const clientId = '5d8a02dd8b4c4139166c0e6c'
      const redirectURI = encodeURIComponent(process.env.GRIDSOME_OAUTH_CALLBACK)

      return `${BASE_URL}/fr/oauth/authorize?redirect_uri=${redirectURI}&response_type=token&client_id=${clientId}&scope=default&grant_type=implicit`
    },
    token () {
      return this.params.access_token
    },
    expiresIn () {
      return this.params.expires_in
    },
    params () {
      const parsedParams = {}
      this.$route.hash.split('&').map(part => part.replace(/#/, '')).forEach(param => {
        const parts = param.split('=')
        parsedParams[parts[0]] = parts[1]
      })
      return parsedParams
    }
  }
}
</script>
