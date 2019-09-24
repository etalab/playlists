<template>
  <div>
    <header>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="/">playlists</b-navbar-brand>

            <b-navbar-nav class="ml-auto">
                <a href="/login" v-if="!user.loggedIn">Sign in</a>

                <b-nav-item-dropdown right v-if="user.loggedIn">
                  <!-- Using 'button-content' slot -->
                  <template v-slot:button-content>
                      {{ user.data.first_name }}
                  </template>
                  <b-dropdown-item :href="user.data.page">Profile</b-dropdown-item>
                  <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>

    </header>

    <slot/>

  </div>
</template>

<script>
export default {
    data(){
        return {
            user: this.$store.state.user
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('logout')
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
