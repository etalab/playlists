<template>
  <Layout>
    <client-only>
      <b-container class="pt-3">
        <GroupsList />
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
