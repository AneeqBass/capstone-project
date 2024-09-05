<template>
    <div class="container">
        <form id="editEquipmentForm" v-if="equipment" @submit.prevent="updateEquipment">
            <div class="mb-3">
                <img class="prodImg" :src="equipment.imgUrl" alt="" />
            </div>
            <div class="mb-3">
                <label for="editEquipmentName" class="form-label">Name</label>
                <input v-model="equipment.name" type="text" class="form-control text-center" id="editEquipmentName"
                    required />
            </div>
            <div class="mb-3">
                <label for="editEquipmentPrice" class="form-label">Price</label>
                <input v-model="equipment.price" type="number" step="0.01" class="form-control text-center"
                    id="editEquipmentPrice" required />
            </div>
            <div class="mb-3">
                <label for="editEquipmentQuantity" class="form-label">Quantity</label>
                <input v-model="equipment.quantity" type="number" class="form-control text-center"
                    id="editEquipmentQuantity" required />
            </div>
            <div class="mb-3">
                <label for="editEquipmentQuantityDueMaintenance" class="form-label">Quantity Due Maintenance</label>
                <input v-model="equipment.quantityDueMaintenance" type="number" class="form-control text-center"
                    id="editEquipmentQuantityDueMaintenance" required />
            </div>
            <div class="mb-3">
                <label for="editEquipmentImage" class="form-label">Image URL</label>
                <input v-model="equipment.imgUrl" type="url" class="form-control text-center"
                    id="editEquipmentImage" />
            </div>
            <div class="pb-3">
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
        </form>
        <div v-else>
            <Spinner />
        </div>
    </div>
</template>

<script>
import Spinner from "@/components/SpinnerComp.vue";

export default {
    data() {
        return {};
    },
    methods: {
        fetchEquipment() {
            this.$store.dispatch("fetchEquipment", this.$route.params.id);
        },
        updateEquipment() {
            this.$store
                .dispatch("updateEquipment", this.equipment)
                .then(() => {
                    this.$router.push("/admin");
                })
                .catch((err) => {
                    console.error("Failed to update equipment:", err);
                });
        },
    },
    computed: {
        equipment() {
            return this.$store.state.equipment;
        },
    },
    components: {
        Spinner,
    },
    mounted() {
        this.fetchEquipment();
    },
};
</script>

<style scoped>
img {
    width: 25rem;
}

.prodImg {
    border: none;
    -webkit-filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
    filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
}
</style>