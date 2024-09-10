<template>
    <div class="container">
        <form id="editEquipmentForm" v-if="equipment" @submit.prevent="updateEquipment">
            <div class="mb-3 text-center">
                <img class="prodImg" :src="equipment.imgUrl || placeholderImg" alt="Equipment Image" />
            </div>
            <div class="mb-3">
                <label for="editEquipmentName" class="form-label">Name</label>
                <input v-model="equipment.name" type="text" class="form-control text-center" id="editEquipmentName" required>
            </div>
            <div class="mb-3">
                <label for="editEquipmentPrice" class="form-label">Price</label>
                <input v-model="equipment.price" type="number" step="0.01" class="form-control text-center"
                    id="editEquipmentPrice" required :class="{'is-invalid': !validPrice}" />
                <div v-if="!validPrice" class="invalid-feedback">Please enter a valid price.</div>
            </div>
            <div class="mb-3">
                <label for="editEquipmentQuantity" class="form-label">Quantity</label>
                <input v-model="equipment.quantity" type="number" class="form-control text-center"
                    id="editEquipmentQuantity" required :class="{'is-invalid': !validQuantity}" />
                <div v-if="!validQuantity" class="invalid-feedback">Please enter a valid quantity.</div>
            </div>
            <div class="mb-3">
                <label for="editEquipmentQuantityDueMaintenance" class="form-label">Quantity Due Maintenance</label>
                <input v-model="equipment.quantityDueMaintenance" type="number" class="form-control text-center"
                    id="editEquipmentQuantityDueMaintenance" required :class="{'is-invalid': !validQuantityDueMaintenance}" />
                <div v-if="!validQuantityDueMaintenance" class="invalid-feedback">Please enter a valid maintenance quantity.</div>
            </div>
            <div class="mb-3">
                <label for="editEquipmentImage" class="form-label">Image URL</label>
                <input v-model="equipment.imgUrl" type="url" class="form-control text-center" id="editEquipmentImage">
            </div>
            <div class="pb-3">
                <button type="submit" class="btn btn-primary" :disabled="!formIsValid">Save changes</button>
            </div>
        </form>

        <div v-else>
            <Spinner />
        </div>

        <!-- Back button -->
        <div class="mb-3">
            <button @click="goBack" class="btn btn-secondary">Back</button>
        </div>
    </div>
</template>

<script>
import Spinner from "@/components/SpinnerComp.vue";

export default {
    data() {
        return {
            placeholderImg: 'https://via.placeholder.com/250', // Fallback image if no imgUrl is provided
        };
    },
    methods: {
        fetchEquipment() {
            this.$store.dispatch("fetchEquipment", this.$route.params.id);
        },
        updateEquipment() {
            if (this.formIsValid) {
                this.$store
                    .dispatch("updateEquipment", this.equipment)
                    .then(() => {
                        this.$router.push("/admin");
                    })
                    .catch((err) => {
                        console.error("Failed to update equipment:", err);
                    });
            }
        },
        goBack() {
            this.$router.go(-1);  // Navigate back to the previous page
        }
    },
    computed: {
        equipment() {
            return this.$store.state.equipment;
        },
        validPrice() {
            return this.equipment.price > 0;
        },
        validQuantity() {
            return this.equipment.quantity >= 0;
        },
        validQuantityDueMaintenance() {
            return this.equipment.quantityDueMaintenance >= 0;
        },
        formIsValid() {
            return this.equipment.name && this.validPrice && this.validQuantity && this.validQuantityDueMaintenance;
        }
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
.container {
    margin: 0 auto;
}

img {
    width: 25rem;
}

.prodImg {
    border: none;
    -webkit-filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
    filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
}

.form-control.is-invalid {
    border-color: #dc3545;
}

.invalid-feedback {
    color: #dc3545;
}
</style>
