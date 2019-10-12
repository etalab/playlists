<template>
  <b-navbar-nav class="ml-auto">
    <b-navbar-nav v-if="user && !user.loggedIn">
      <b-nav-item href="/login">
        Se connecter
      </b-nav-item>
    </b-navbar-nav>

    <b-nav-item-dropdown
      right
      v-if="user && user.loggedIn"
    >
      <!-- Using 'button-content' slot -->
      <template v-slot:button-content>
        {{ user.data.first_name }}
      </template>
      <b-dropdown-item :href="user.data.page">
        Profile
      </b-dropdown-item>
      <b-dropdown-item @click="logout">
        Se déconnecter
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </b-navbar-nav>
</template>

<script>
export default {
  computed: {
    user(){
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>
