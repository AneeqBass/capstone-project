<template>
    <div class="container">
        <div class="singleSupplement">
            <div class="row justify-content-center" v-if="supplement">
                <div>
                    {{ supplement.imgUrl }}
                    <img :src="supplement.imgUrl" loading="lazy" class="img-fluid prodImg" :alt="supplement.name">
                </div>
                <div>
                    <h5 class="card-title">{{ supplement.name }}</h5>
                    <h5 class="card-title">{{ supplement.category }}</h5>
                    <p class="">{{ supplement.description }}</p>
                    <p class="lead"><span class="text-success">Quantity</span>: {{ supplement.quantity }}</p>
                    <p class="lead"><span class="text-success">Price</span>: R{{ supplement.price }}</p>
                </div>
            </div>
            <div v-else>
                <Spinner />
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/SpinnerComp.vue'

export default {
    methods: {
        fetchSupplements() {
            this.$store.dispatch('fetchSupplements')
        },
        supplements() {
            return this.$store.state.supplements;
        },
        fetchSupplement() {
            this.$store.dispatch('fetchSupplement', this.$route.params.id)
        },


    },
    computed: {
        supplement() {
            return this.$store.state.supplement;
        }
    },
    components: {
        Spinner,
    },
    mounted() {
        this.fetchSupplement()
    }
}
</script>

<style scoped>
img {
    width: 20rem;
}

.prodImg {
    border: none;
    -webkit-filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
    filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
}
</style>