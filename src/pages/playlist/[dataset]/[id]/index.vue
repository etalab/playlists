<template>
  <Layout>
    <client-only>
      <playlist-view />
    </client-only>
  </Layout>
</template>

<script>
import PlaylistView from '~/components/PlaylistView'

export default {
  components: { PlaylistView }
}
</script>
