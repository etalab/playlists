<template>
  <Layout>
    <b-container class="mt-3">
      <h1>Créer un nouveau dossier</h1>

      <b-form @submit="create">
        <b-form-group
          id="input-group-1"
          label="Titre"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.title"
            type="text"
            required
            placeholder="Titre de votre dossier"
          />
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Description"
          label-for="input-2"
        >
          <b-form-textarea
            id="input-2"
            v-model="form.description"
            size="lg"
            required
            placeholder="Description de votre dossier"
          />
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
        >
          Submit
        </b-button>
      </b-form>
    </b-container>
  </Layout>
</template>

<script>
import Api from '~/services/Api'

const $api = new Api()

export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        private: true,
        extras: {
          playlist: true
        }
      }
    }
  },
  methods: {
    create (event) {
      event.preventDefault()
      $api.post('datasets', this.form).then((res) => {
        this.$router.push('/')
      })
    }
  }
}
</script>
