<template>
  <div>
    <div class="mb-4">
      <div class="d-flex">
        <h3 class="text-muted text-sm flex-grow-1">
          {{ group.title }}
        </h3>
        <!--
        <button-publish
          class="float-right mr-2"
          :is-private="isPrivate"
          :waiting="waiting"
          @click.native="publish"
        />
        -->
      </div>

      <div class="lead">
        {{ group.description }}
      </div>

      <small><a :href="group.page">voir le dossier sur data.gouv.fr</a></small>
    </div>

    <playlists-list
      :playlists="group.resources"
      :group="group.id"
    />

    <div class="mt-3 center">
      <b-button
        :to="'/playlist/'+group.id+'/new'"
      >
        ajouter une playlist
      </b-button>
    </div>
  </div>
</template>

<script>
import PlaylistsList from '~/components/PlaylistsList'
import ButtonPublish from '~/components/ButtonPublish'

import Api from '~/services/Api'

const $api = new Api()

export default {
  components: {
    PlaylistsList,
    ButtonPublish
  },
  props: {
    group: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data () {
    return {
      isPrivate: this.group.private
    }
  },
  computed: {
    waiting () {
      return this.isPrivate !== this.group.private
    }
  },
  methods: {
    publish () {
      this.isPrivate = !this.isPrivate

      $api.put(`datasets/${this.group.id}`, {
        private: this.isPrivate
      })
    }
  }
}
</script>
