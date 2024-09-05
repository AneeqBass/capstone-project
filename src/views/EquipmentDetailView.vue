<template>
    <div class="container">
        <div class="singleEquipment">
            <div class="row justify-content-center" v-if="equipment">
                <div>
                    {{ equipment.imgUrl }}
                    <img :src="equipment.imgUrl" loading="lazy" class="img-fluid prodImg" :alt="equipment.name">
                </div>
                <div>
                    <h5 class="card-title">{{ equipment.name }}</h5>
                    <h5 class="card-title">{{ equipment.category }}</h5>
                    <p class="">{{ equipment.description }}</p>
                    <p class="lead"><span class="text-success">Quantity</span>: {{ equipment.quantity }}</p>
                    <p class="lead"><span class="text-success">Price</span>: R{{ equipment.price }}</p>
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
        fetchEquipments() {
            this.$store.dispatch('fetchEquipments')
        },
        equipments() {
            return this.$store.state.equipments;
        },
        fetchEquipment() {
            this.$store.dispatch('fetchEquipment', this.$route.params.id)
        },


    },
    computed: {
        equipment() {
            return this.$store.state.equipment;
        }
    },
    components: {
        Spinner,
    },
    mounted() {
        this.fetchEquipment()
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