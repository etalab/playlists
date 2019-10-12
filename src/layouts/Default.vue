<template>
  <div>
    <nprogress-container />
    <header>
      <b-navbar
        toggleable="lg"
        type="dark"
        variant="dark"
      >
        <b-container>
          <b-navbar-brand to="/">
            playlists
          </b-navbar-brand>

          <client-only>
            <nav-user />
          </client-only>
        </b-container>
      </b-navbar>
    </header>

    <div class="mb-4">
      <slot />
    </div>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import NavUser from '~/components/NavUser.vue'

export default {
  components: {
    NprogressContainer,
    NavUser
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
