<template>
    <div class="container">
        <div class="singleStock">
            <div class="row justify-content-center" v-if="stock">
                <div>
                    <img :src="stock.imgUrl" loading="lazy" class="img-fluid prodImg" :alt="stock.name">
                </div>
                <div>
                    <h5 class="card-title">{{ stock.name }}</h5>
                    <h5 class="card-title">{{ stock.category }}</h5>
                    <p class="">{{ stock.description }}</p>
                    <p class="lead"><span class="text-success">Quantity</span>: {{ stock.quantity }}</p>
                    <p class="lead"><span class="text-success">Price</span>: R{{ stock.price }}</p>
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
        fetchStocks() {
            this.$store.dispatch('fetchStocks')
        },
        stocks() {
            return this.$store.state.stocks;
        },
        fetchStock() {
            this.$store.dispatch('fetchStock', this.$route.params.id)
        },


    },
    computed: {
        stock() {
            return this.$store.state.stock;
        }
    },
    components: {
        Spinner,
    },
    mounted() {
        this.fetchStock()
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