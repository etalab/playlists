<template>
  <Layout>
    <client-only>
      <b-container class="pt-3">
        <GroupsList />

        <div class="border-top my-4"></div>

        <b-row>
          <b-col class="text-center">
            <b-button to="/folder/new">Ajouter un nouveau dossier</b-button>
          </b-col>
        </b-row>
      </b-container>
    </client-only>
  </Layout>
</template>

<script>
import GroupsList from '~/components/GroupsList.vue'

export default {
  components: {
    GroupsList
  },
  metaInfo: {
    title: 'Home'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
