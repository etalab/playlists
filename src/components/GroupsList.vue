<template>
  <div>
    <groups-list-item
      v-for="group in groups"
      :key="group.id"
      :group="group"
      class="mt-5"
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
    return {
      polling: null
    }
  },
  computed: {
    groups () {
      return this.$store.state.folders.cache
    }
  },
  mounted () {
    this.$store.dispatch('folders/fetchMe')

    this.polling = setInterval(() => {
      // this.$store.dispatch('folders/fetchMe')
    }, 3000)

    this.$store.watch(
      (state) => state.auth.user.loggedIn,
      () => { if (!this.$store.state.auth.user.loggedIn) clearInterval(this.polling) }
    )
  },
  beforeDestroy () {
    clearInterval(this.polling)
  }
}
</script>
