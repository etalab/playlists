<template>
  <Layout>
    <client-only>
      <b-container class="pt-3">
        <GroupsList />

        <div class="border-top my-4"></div>

        <b-row>
          <client-only>
            <groups-list-new />
          </client-only>
        </b-row>
      </b-container>
    </client-only>
  </Layout>
</template>

<script>
import GroupsList from '~/components/GroupsList.vue'
import GroupsListNew from '~/components/GroupsListNew.vue'

export default {
  components: {
    GroupsList,
    GroupsListNew
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
