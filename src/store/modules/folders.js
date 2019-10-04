import Api from '~/services/Api.js'

const $api = new Api()

const module = {
    namespaced: true,
    state(){
        return {
            cache: []
        }
    },
    getters: {
      cache: state => state.cache
    },
    mutations: {
        setFolders(state, data){
            state.cache = data
        }
    },
    actions: {
        fetchMe: async function({ commit }){
            let folders = []

            const res = await $api.get('me/datasets')

            for (let k in res.data) {
                const dataset = res.data[k]
                if ("playlist" in dataset.extras){
                    folders.push(dataset)
                }
            }

            if (folders.length == 0){
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

            commit("setFolders", folders)
        }
    }
}

export default module
