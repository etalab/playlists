<template>
  <div>
    <div class="container mt-3">
      <b-link :to="url">
        &#8592; sortir de l'édition
      </b-link>
    </div>

    <b-container class="my-5">
      <b-form-group label="Titre">
        <b-form-input
          type="text"
          size="lg"
          v-model="title"
          @input="onHeader"
          placeholder="Le titre de la playslit"
        />
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea
          rows="4"
          max-rows="6"
          v-model="description"
          @input="onLead"
          placeholder="La description de la playlist"
        />
      </b-form-group>
    </b-container>

    <b-container>
      <div class="mb-2">
        Les jeux de données
      </div>
      <div class="mb-3 text-muted small">
        Double-cliquez sur un jeu de donnée pour le retirer de la playlist
      </div>

      <draggable
        tag="b-row"
        v-model="datasets"
        handle=".handle"
      >
        <b-col
          v-for="d in datasets"
          :key="d"
          class="dataset mb-4"
          cols="12"
          md="4"
        >
          <DatasetCard
            :url="d"
            inactive
            @dblclick.native="remove(d)"
          />

          <div class="text-center text-muted small">
            <font-awesome-icon
              icon="arrows-alt"
              class="handle mr-2 mt-1 float-right"
            />
            <a
              :href="d"
              target="_blank"
              rel="noopener noreferrer"
            >voir</a>
          </div>
        </b-col>
      </draggable>
    </b-container>

    <b-container class="mt-4">
      <h3>Ajouter un jeu de données</h3>

      <b-form-group
        id="fieldset-1"
        description="Indiquez une url, slug, un identifiant ou une requête de recherche"
        label-for="input-1"
      >
        <b-form-input
          id="recherche"
          v-model="query"
          trim
          @input="debouncheGetSearch"
        />
      </b-form-group>

      <div
        class="text-center"
        v-if="search_loading"
      >
        <b-spinner />
      </div>

      <div
        class="my-3 text-muted small"
        v-if="datasets_search.length > 0"
      >
        Double-cliquez sur un jeu de donnée pour l'ajouter de la playlist
      </div>

      <b-row>
        <b-col
          v-for="d in datasets_search"
          :key="d"
          class="mb-4"
          cols="12"
          md="4"
        >
          <DatasetCard
            :url="d"
            inactive
            :class="{inactive: datasets.includes(d)}"
            @dblclick.native="add(d)"
          />

          <div class="text-center text-muted small">
            <a
              :href="d"
              target="_blank"
              rel="noopener noreferrer"
            >voir</a>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="mt-5">
      <b-row>
        <b-col
          class="mr-auto"
          cols="auto"
        >
          <b-button :href="resource.url">
            télécharger la playlist
          </b-button>
          <span class="text-muted ml-2">
            dernière modification : {{ resource.last_modified }}
          </span>
        </b-col>
        <b-col cols="auto">
          <b-link
            class="text-danger"
            v-b-modal.confirm-delete
          >
            supprimer
          </b-link>

          <b-modal
            id="confirm-delete"
            title="Confirmer la suppression"
            @ok="deletePlaylist"
          >
            <p>Êtes-vous certain.e de vouloir supprimer cette playlist ?</p>
          </b-modal>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
.inactive {
    opacity: 0.4;
}
</style>

<script>
import { debounce } from 'debounce'
import draggable from 'vuedraggable'
import qs from 'qs'

import DatasetCard from '~/components/DatasetCard.vue'
import Api from '~/services/Api'

const $api = new Api()

export default {
  components: {
    DatasetCard,
    draggable
  },
  data () {
    return {
      dataset: null,
      resource: {},
      id: null,
      title: null,
      user: null,
      description: null,
      datasets: [],
      query: '',
      search_loading: false,
      datasets_search: []
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user.data.id
    },
    url () {
      return `/playlist/${this.dataset}/${this.id}`
    }
  },
  watch: {
    datasets (val) {
      this.updateList()
    }
  },
  methods: {
    remove (dataset) {
      this.datasets = this.datasets.filter((v, i, a) => v !== dataset)
    },
    add (dataset) {
      if (!(this.datasets.includes(dataset))) {
        this.datasets.push(dataset)
      }
    },
    deletePlaylist () {
      $api.delete(`datasets/${this.dataset}/resources/${this.id}`)
        .then((res) => {
          this.$router.push({
            path: '/'
          })
        })
    },
    getSearch (query) {
      this.datasets_search = []
      this.search_loading = true

      const base = 'https://www.data.gouv.fr/api/1'
      const datasetUrl = `${base}/datasets/${query}/`
      const searchUrl = `${base}/datasets/`

      this.$http.get(datasetUrl)
        .then(response => {
          this.datasets_search = [response.data.page]
        })
        .finally(() => {
          this.$http.get(`${searchUrl}?${qs.stringify({ q: query })}`)
            .then(response => {
              const pages = response.data.data.map(o => o.page)
              this.datasets_search = this.datasets_search.concat(pages)
            })
            .finally(() => { this.search_loading = false })
        })
    },
    getUrl (url) {
      this.datasets_search = [url]
      //      this.search_loading = true
    },
    debouncheGetSearch: debounce(function (e) {
      if (e.includes('https://')) {
        this.getUrl(e)
      } else {
        this.getSearch(e)
      }
    }, 500),
    updateMeta (field, content) {
      const payload = {}
      payload[field] = content

      this.$nprogress.start()
      $api.put(`datasets/${this.dataset}/resources/${this.id}`, payload)
        .then(() => {
          this.$nprogress.done()
        })
    },
    onHeader () {
      this.updateMeta('title', this.title)
    },
    onLead () {
      this.updateMeta('description', this.description)
    },
    updateList () {
      this.$nprogress.start()

      const bodyFormData = new FormData()
      bodyFormData.append('file', new Blob(
        [this.datasets.join('\n')],
        { type: 'text' }),
                `${this.id}.txt`
      )

      $api.post(`datasets/${this.dataset}/resources/${this.id}/upload`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(res => {
        this.updateMeta('title', this.title)
        this.updateMeta('extras', { datasets: this.datasets.length })
        this.$nprogress.done()
      })
    }
  },
  mounted () {
    const { dataset, id } = this.$route.params
    this.dataset = dataset
    this.id = id

    $api.get(`datasets/${this.dataset}`).then((res) => {
      this.user = res.data.owner.id

      if (this.user !== this.currentUser) {
        this.$router.push(`/playlist/${dataset}/${id}`)
      }
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
