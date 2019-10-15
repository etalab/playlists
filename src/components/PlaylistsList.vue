<template>
  <div>
    <b-card-group columns>
      <b-card
        v-for="playlist in playlists"
        :key="playlist.id"
        :title="playlist.title"
        :sub-title="playlistCount(playlist.extras.datasets)+' jeux de données'"
        class="mb-2"
      >
        <b-card-text>
          {{ playlist.description }}
        </b-card-text>
        <b-link
          :to="playlistUrl(playlist)"
          class="card-link"
        >
          Voir la playlist
        </b-link>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: String,
      default: null,
      required: true
    },
    playlists: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    playlistUrl (playlist) {
      return `/playlist/${this.group}/${playlist.id}`
    },
    playlistCount (val) {
      return val || 0
    }
  }
}
</script>
