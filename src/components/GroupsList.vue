<template>
    <div>
        <div v-for="group in groups">
            <h3 class="text-muted text-sm">
                {{ group.title }}
            </h3>

            <PlaylistsList :playlists="group.resources" :group="group.id" />

            <b-button class="float-right" :href="'/playlist/'+group.id+'/new'">ajouter une playlist</b-button>
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
    mounted: function(){
        let playlists_stores = []

        $api.get('me/datasets').then((res)=>{
            for (let k in res.data) {
                const dataset = res.data[k]
                if ("playlist" in dataset.extras){
                    playlists_stores.push(dataset)
                }
            }

            if (playlists_stores.length ==0){
                const info = {
                    title: "Mes playlists",
                    description: "mes belles playlists",
                    private: true,
                    extras: {
                        playlist: true
                    }
                }

                $api.post('datasets', info)
            }
        })
        this.groups = playlists_stores
        this.$store.dispatch("groups", playlists_stores)
    }
}
</script>
