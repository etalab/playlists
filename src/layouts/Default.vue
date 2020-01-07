<template>
  <div>
    <nprogress-container />
    <div
      class="d-flex flex-column"
      style="min-height: 100vh"
    >
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

      <div class="mb-4 flex-grow-1">
        <slot />
      </div>

      <TheFooter
        parent="https://etalab.studio"
        bugs="https://github.com/etalab/playlists/issues/new"
      />
    </div>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import NavUser from '~/components/NavUser.vue'
import TheFooter from '~/components/TheFooter.vue'

export default {
  components: {
    NprogressContainer,
    NavUser,
    TheFooter
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
