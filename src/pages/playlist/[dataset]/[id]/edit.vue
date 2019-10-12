<template>
  <Layout>
    <client-only>
      <playlist-edit />
    </client-only>
  </Layout>
</template>

<script>
import PlaylistEdit from '~/components/PlaylistEdit'

export default {
  components: { PlaylistEdit }
}
</script>
