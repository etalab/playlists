<template>
    <div><a :href="'/playlist/'+id">/playlist/{{id}}</a></div>
</template>

<script>
const shortid = require('shortid')

export default {
    data(){ return {
        id: shortid.generate()
    }},
    mounted: function(){
        this.$router.push({
            path: `/playlist/${this.id}/edit`
        })
    }
}
</script>
