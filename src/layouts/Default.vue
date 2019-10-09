<template>
  <div>
    <nprogress-container></nprogress-container>
    <header>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-container>
              <b-navbar-brand to="/">playlists</b-navbar-brand>

              <b-navbar-nav class="ml-auto">
                  <b-navbar-nav v-if="user && !user.loggedIn">
                     <b-nav-item href="/login">Se connecter</b-nav-item>
                 </b-navbar-nav>

                  <b-nav-item-dropdown right v-if="user && user.loggedIn">
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        {{ user.data.first_name }}
                    </template>
                    <b-dropdown-item :href="user.data.page">Profile</b-dropdown-item>
                    <b-dropdown-item @click="logout">Se déconnecter</b-dropdown-item>
                  </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-container>
        </b-navbar>

    </header>

    <div class="mb-4">
        <slot/>
    </div>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

export default {
  components: {
    NprogressContainer
  },
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  mounted () {
    this.user = this.$store.state.user
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
</style>
