<template>
  <b-col class="text-center">
    <b-button
      v-if="$store.state.user.loggedIn"
      to="/folder/new"
    >
      Ajouter un nouveau dossier
    </b-button>
  </b-col>
</template>
