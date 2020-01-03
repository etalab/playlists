<template>
  <div>
    <b-spinner
      variant="secondary"
      small
      v-if="!oembed.type && !error"
    />
    <div
      class="oembed-content"
      v-if="oembed.type"
      v-html="html"
    />
    <div v-if="error">
      <b-card
        header="jeu de données indisponible"
        header-text-variant="white"
        header-bg-variant="warning"
        border-variant="warning"
      >
        <b-card-text class="small text-muted">
          {{ url }}
        </b-card-text>
        </span>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: null
    },
    inactive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      oembed: Object,
      error: undefined,
      oembedApi: 'https://www.data.gouv.fr/api/1/oembed'
    }
  },
  computed: {
    html () {
      const el = document.createElement('div')
      el.innerHTML = this.oembed.html

      if (this.inactive) {
        el.firstChild.children[2].removeAttribute('href')
      } else {
        el.firstChild.children[2].setAttribute('target', '_blank')
        el.firstChild.children[2].setAttribute('rel', 'noopener noreferrer')
      }

      return el.innerHTML
    }
  },
  async created () {
    this.getOembed(this.url)
  },
  methods: {
    async getOembed (url) {
      this.error = undefined
      this.oembed = {}
      if (!url) return
      try {
        const oembedUrl = `${this.oembedApi}?url=${encodeURIComponent(url)}`
        const response = await fetch(oembedUrl)

        if (response.ok) {
          this.oembed = await response.json()
        } else {
          this.error = response.statusText
        }
      } catch (error) {
        console.error('not found:', this.url)
        this.error = error
      }
    }
  },
  watch: {
    url (value) {
      this.getOembed(value)
    }
  }
}
</script>
