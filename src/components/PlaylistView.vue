<template>
  <div>
    <b-jumbotron
      fluid
      bg-variant="transparent"
    >
      <template v-slot:header>
        <div>{{ title }}</div>
      </template>

      <template v-slot:lead>
        <div class="text-secondary">
          {{ description }}
        </div>
      </template>
    </b-jumbotron>

    <b-container>
      <b-row>
        <b-col
          v-for="d in datasets"
          :key="d"
          class="dataset mb-4"
          cols="12"
          md="4"
        >
          <DatasetCard :url="d" />
        </b-col>
      </b-row>
    </b-container>

    <b-container class="mt-5">
      <b-row>
        <b-col
          class="mr-auto"
          cols="auto"
        >
          <button-share
            :text="'🎧 📊 ' + title"
            :target="'https://playlists.etalab.studio'+url"
            via="datagouvfr"
          />
          <span class="text-muted ml-2">dernière modification : {{ resource.last_modified | moment("DD/MM/YYYY hh:mm") }}</span>
        </b-col>
        <b-col
          cols="auto"
          v-if="isMine"
        >
          <b-link
            :to="'./edit'"
            append
          >
            éditer
          </b-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import DatasetCard from '~/components/DatasetCard.vue'
import ButtonShare from '~/components/ButtonShare.vue'

import Api from '~/services/Api'

const $api = new Api()

export default {
  components: {
    DatasetCard,
    ButtonShare
  },
  props: {
    editable: Boolean
  },
  data () {
    return {
      dataset: null,
      resource: {},
      id: null,
      title: null,
      description: null,
      user: null,
      datasets: [],
      query: '',
      search_loading: false,
      datasets_search: []
    }
  },
  computed: {
    isMine () {
      return this.user === this.currentUser
    },
    currentUser () {
      return this.$store.state.auth.user.data.id
    },
    url () {
      return `/playlist/${this.dataset}/${this.id}`
    }
  },
  mounted () {
    const { dataset, id } = this.$route.params
    this.dataset = dataset
    this.id = id

    $api.get(`datasets/${this.dataset}`).then((res) => {
      this.user = res.data.owner.id
    })

    $api.get(`datasets/${this.dataset}/resources/${this.id}`).then((res) => {
      this.title = res.data.title
      this.description = res.data.description
      this.resource = res.data

      this.$http.get(res.data.url).then((res) => {
        if (res.data) this.datasets = res.data.split('\n')
      })
    })
  }
}
</script>
