<template>
    <div>
        <div v-for="group in groups" :key="group.id">
            <div class="mb-4">

              <div class="d-flex">
                  <h3 class="text-muted text-sm flex-grow-1">
                    {{ group.title }}
                  </h3>
                  <b-button class="float-right" :href="'/playlist/'+group.id+'/new'">ajouter une playlist</b-button>
              </div>

              <div class="lead">
                {{ group.description }}
              </div>

              <small><a :href="group.page">voir le dossier sur data.gouv.fr</a></small>

            </div>

            <PlaylistsList :playlists="group.resources" :group="group.id" />

        </div>
    </div>
</template>

<script>
import { debounce } from "debounce"

import Api from '~/services/Api'
import PlaylistsList from "~/components/PlaylistsList.vue"

const $api = new Api()

export default {
    components: {
        PlaylistsList
    },
    data(){
        return {
            groups: []
        }
    },
    computed: {},
    watched:{
        groups: function(){
            console.log("changed", this.groups)
        }
    },
    mounted: function(){
        this.$store.watch(
          (state, getters) => getters["folders/cache"],
          (newValue, oldValue) => {
            this.groups = this.$store.state.folders.cache
          }
        )

        this.$store.dispatch('folders/fetchMe')
    }
}
</script>
