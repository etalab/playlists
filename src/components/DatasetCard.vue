<template>
    <div>
        <b-spinner
            variant="secondary"
            small
            v-if="!oembed.type"
        ></b-spinner>
        <div class="oembed-content" v-if="oembed.type" v-html="oembed.html"></div>
    </div>
</template>

<script>
export default {
    props: ['url'],
    data(){
        return {
            oembed: Object,
            error: undefined,
            oembedApi: 'https://www.data.gouv.fr/api/1/oembed'
        }
    },
    async created() {
        console.log(this.url)
        this.getOembed(this.url)
    },
    methods: {
      async getOembed(url) {
        this.error = undefined
        this.oembed = {}
        if (!url) return;
        try {
          const oembedUrl = `${this.oembedApi}?url=${encodeURIComponent(url)}`
          const response = await fetch(oembedUrl)
          console.log(response)

          if (response.ok) {
            this.oembed = await response.json()
          } else {
            this.error = response.statusText
          }
        } catch(error) {
          this.error = error
        }
      }
    },
    watch: {
      url(value) {
        this.getOembed(value)
      }
    }
}
</script>
