<template>
    <Layout>
        <b-jumbotron fluid>
            <template v-slot:header>Lorem ipsum titre</template>

            <template v-slot:lead>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <div>
                    <a :href="'/playlist/'+id+'/edit'">éditer</a>
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
        }
    },
    async mounted() {
        const { id } = this.$route.params

        this.id = id
    }
}
</script>
