<template>
    <div><a :href="url">{{ url }}</a></div>
</template>

<script>
import shortid from 'shortid'
import Api from '~/services/Api'

const $api = new Api

export default {
    data(){ return {
        dataset: '',
        resource: '',
        id: shortid.generate()
    }},
    computed:{
        url: function(){
            return `/playlist/${this.dataset}/${this.resource}/edit`
        }
    },
    mounted: function(){
        const { dataset } = this.$route.params
        this.dataset = dataset

        let bodyFormData = new FormData();
        bodyFormData.append('file', new Blob([''], { type: 'text' }), `${this.id}.txt`)

        // bootstrap an empty resource
        $api.post(`datasets/${dataset}/upload`,
            bodyFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(res=>{
            this.resource = res.data.id

            this.$router.push({
                path: this.url
            })
        })
    }
}
</script>
