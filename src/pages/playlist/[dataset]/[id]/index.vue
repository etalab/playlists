<template>
    <Layout>
        <div class="container mt-3" v-if="editable">
          <b-link :to="url">&#8592; sortir de l'édition</b-link>
        </div>
        <b-jumbotron
            fluid
            bg-variant="transparent"
        >
            <template v-slot:header >
                <div :contenteditable="editable" @input="onHeader">{{ title }}</div>
            </template>

            <template v-slot:lead>
                <div
                    class="text-secondary"
                    :contenteditable="editable"
                    @input="onLead"
                >
                    {{ description }}
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
                    <DatasetCard :url="dataset" :inactive="editable" @click.native="remove(dataset)" />

                    <div class="text-center text-muted small" v-if="editable">
                        <a :href="dataset">voir</a>
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <b-container class="mt-4" v-if="isMine && editable">
            <h3>Ajouter un jeu de données</h3>

            <b-form-group
                  id="fieldset-1"
                  description="Indiquez un slug, un identifiant ou une recherche"
                  label-for="input-1"
            >
                <b-form-input id="recherche" v-model="query" trim @input="debouncheGetSearch"></b-form-input>
            </b-form-group>

            <div class="text-center" v-if="search_loading">
                <b-spinner></b-spinner>
            </div>

            <b-row>
                <b-col
                    v-for="url in datasets_search" :key="url"
                    v-show="!(datasets.includes(url))"
                    class="mb-4"
                    cols="12" md="4"
                >
                    <DatasetCard :url="url" :inactive="true" @click.native="add(url)" />

                    <div class="text-center text-muted small">
                        <a :href="url">voir</a>
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <b-container class="mt-5">
            <b-row>
              <b-col class="mr-auto" cols="auto">
                <b-button :href="resource.url">télécharger la playlist</b-button>
                <span class="text-muted ml-2">dernière modification : {{ resource.last_modified }}</span>
              </b-col>
              <b-col cols="auto" v-if="isMine">
                <b-link v-if="!editable" :to="url+'/edit'">éditer</b-link>
                <b-link v-else class="text-danger" v-b-modal.confirm-delete>supprimer</b-link>

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
    </Layout>
</template>

<script>
import { debounce } from 'debounce'
import qs from 'qs'

import DatasetCard from '~/components/DatasetCard.vue'
import Api from '~/services/Api'

const $api = new Api

export default {
    components: {
        DatasetCard
    },
    props: {
        editable: Boolean
    },
    data() {
        return {
            dataset: null,
            resource: {},
            id: null,
            title: null,
            user: null,
            currentUser: null,
            description: null,
            datasets: [],
            query: '',
            search_loading: false,
            datasets_search: []
        }
    },
    computed: {
        isMine: function(){
            return this.user == this.currentUser
        },
        // currentUser(){
        //     return this.$store.state.user.data.id
        // },
        url: function(){
            return `/playlist/${this.dataset}/${this.id}`
        }
    },
    watch: {
        datasets: function(val){
            this.updateList()
        }
    },
    methods: {
        remove(dataset){
            this.datasets = this.datasets.filter((v,i,a) => v != dataset)
        },
        add(dataset){
            this.datasets.push(dataset)
        },
        deletePlaylist(){
            $api.delete(`datasets/${this.dataset}/resources/${this.id}`)
                .then((res)=>{
                    this.$router.push({
                        path: "/"
                    })
                })
        },
        getSearch(query){
            this.datasets_search = []
            this.search_loading = true

            const base = "https://www.data.gouv.fr/api/1"
            const dataset_url = `${base}/datasets/${query}/`
            const search_url = `${base}/datasets/`

            this.$http.get(dataset_url)
                .then( response => {
                    this.datasets_search = [ response.data.page ]
                })
                .finally( ()=> {
                    this.$http.get(`${search_url}?${qs.stringify({ q: query })}`)
                        .then( response => {
                            const pages = response.data.data.map( o => o['page'])
                            this.datasets_search = this.datasets_search.concat(pages)

                        })
                        .finally( () => this.search_loading = false )
                    }
                )
        },
        debouncheGetSearch: debounce(function(e){
            this.getSearch(e)
        }, 500),
        updateMeta(field, content){
            let payload = {}
            payload[field] = content

            $api.put(`datasets/${this.dataset}/resources/${this.id}`, payload)
        },
        onHeader(e){
            this.updateMeta("title", e.target.innerText)
        },
        onLead(e){
            this.updateMeta("description", e.target.innerText)
        },
        updateList(){
            let bodyFormData = new FormData();
            bodyFormData.append('file', new Blob(
                [ this.datasets.join("\n") ],
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
            ).then(res=>{
                this.updateMeta("title", this.title)
                this.updateMeta("extras", { "datasets": this.datasets.length })
            })
        }
    },
    mounted() {
        const { dataset, id } = this.$route.params
        this.dataset = dataset
        this.id = id

        this.currentUser = this.$store.state.user.data.id

        $api.get(`datasets/${this.dataset}`).then((res)=>{
            this.user = res.data.owner.id
        })

        $api.get(`datasets/${this.dataset}/resources/${this.id}`).then((res)=>{
            this.title = res.data.title
            this.description = res.data.description
            this.resource = res.data

            this.$http.get(res.data.url).then((res)=>{
                if(res.data) this.datasets = res.data.split("\n")
            })
        })
    }
}
</script>
