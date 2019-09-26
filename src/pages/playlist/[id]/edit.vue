<template>
    <Layout>
        <b-jumbotron fluid>
            <template v-slot:header contenteditable="true">
                <div contenteditable="true">Lorem ipsum titre</div>
            </template>

            <template v-slot:lead>
                <div contenteditable="true">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
            </template>
        </b-jumbotron>

        <b-container>
            <b-row>
                <b-col
                    v-for="dataset in datasets"
                    :key="dataset"
                    class="mb-4"
                    cols="12" md="4"
                >
                    <DatasetCard :url="dataset" />

                    <div class="text-center text-muted small">
                        <a @click="remove(dataset)">retirer</a>
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <b-container class="mt-4">
            <h3>Ajouter un jeu de données</h3>

            <b-form-group
                  id="fieldset-1"
                  description="Indiquez un slug, un identifiant ou une recherche"
                  label-for="input-1"
            >
                <b-form-input id="recherche" v-model="query" trim></b-form-input>
            </b-form-group>

            <div class="text-center" v-if="search_loading">
                <b-spinner></b-spinner>
            </div>

            <b-row>
                <b-col
                    v-for="url in datasets_search_unique" :key="url"
                    v-show="!(datasets.includes(url))"
                    class="mb-4"
                    cols="12" md="4"
                >
                    <DatasetCard :url="url" />

                    <div class="text-center text-muted small">
                        <a @click="add(url)">ajouter</a>
                    </div>
                </b-col>
            </b-row>


            <b-row>
                <b-col
                    v-for="url in datasets_search" :key="url"
                    v-show="!(datasets.includes(url))"
                    class="mb-4"
                    cols="12" md="4"
                >
                    <DatasetCard :url="url" />

                    <div class="text-center text-muted small">
                        <a @click="add(url)">ajouter</a>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </Layout>
</template>

<script>
import DatasetCard from '~/components/DatasetCard.vue'

export default {
    components: {
        DatasetCard
    },
    data() {
        return {
            id: null,
            datasets: [
                "https://www.data.gouv.fr/fr/datasets/donnees-temps-reel-de-mesure-des-concentrations-de-polluants-atmospheriques-reglementes-1/"
            ],
            query: '',
            search_loading: false,
            datasets_search_unique: [],
            datasets_search: []
        }
    },
    watch: {
        query: function(val){
            this.datasets_search_unique = []
            this.datasets_search = []
            this.search_loading = true

            const base = "https://www.data.gouv.fr/api/1"
            const dataset_url = `${base}/datasets/${val}/`
            const search_url = `${base}/datasets/`

            this.$http.get(dataset_url)
                .then( response => {
                    this.datasets_search_unique = [ response.data.page ]
                })
                .finally( ()=>
                    this.$http.get(search_url, { q: val })
                        .then( response => {
                            this.datasets_search= []
                            const pages = response.data.data.map( o => o['page'])
                            this.datasets_search = this.datasets_search.concat(pages)
                        })
                        .finally( () => this.search_loading = false )
                )
        }
    },
    methods: {
        remove(dataset){
            this.datasets = this.datasets.filter((v,i,a) => v != dataset)
        },
        add(dataset){
            this.datasets.push(dataset)
        }
    },
    async mounted() {
        const { id } = this.$route.params
        this.id = id
    }
}
</script>
