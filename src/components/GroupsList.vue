<template>
  <div>
    <groups-list-item
      v-for="group in groups"
      :key="group.id"
      :group="group"
    />
  </div>
</template>

<script>
import GroupsListItem from '~/components/GroupsListItem'

export default {
  components: {
    GroupsListItem
  },
  data () {
    return {}
  },
  computed: {
    groups: function () {
      return this.$store.state.folders.cache
    }
  },
  mounted: function () {
    this.$store.dispatch('folders/fetchMe')
  }
}
</script>
