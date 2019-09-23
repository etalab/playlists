<template>
  <div>
    <header>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="/">playlists</b-navbar-brand>

            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                  <!-- Using 'button-content' slot -->
                  <template v-slot:button-content>
                    <em>User</em>
                  </template>
                  <b-dropdown-item href="#">Profile</b-dropdown-item>
                  <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>

    </header>

    <slot/>

  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
</style>
