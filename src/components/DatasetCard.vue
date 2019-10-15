<template>
  <div>
    <b-spinner
      variant="secondary"
      small
      v-if="!oembed.type"
    />
    <div
      class="oembed-content"
      v-if="oembed.type"
      v-html="html"
    />
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
