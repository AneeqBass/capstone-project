<template>
    <div class="container">
        <form id="addEquipmentForm" @submit.prevent="addEquipment">
            <div class="mb-3 text-center">
                <img class="prodImg" :src="equipment.imgUrl || placeholderImg" alt="Equipment Image" />
            </div>
            <div class="mb-3">
                <label for="addEquipmentName" class="form-label">Name</label>
                <input v-model="equipment.name" type="text" class="form-control text-center" id="addEquipmentName"
                    required>
            </div>
            <div class="mb-3">
                <label for="addEquipmentPrice" class="form-label">Price</label>
                <input v-model="equipment.price" type="number" class="form-control text-center" id="addEquipmentPrice" 
                    required :class="{'is-invalid': !validPrice}" />
                <div v-if="!validPrice" class="invalid-feedback">Please enter a valid price.</div>
            </div>
            <div class="mb-3">
                <label for="addEquipmentQuantity" class="form-label">Quantity</label>
                <input v-model="equipment.quantity" type="number" class="form-control text-center" 
                    id="addEquipmentQuantity" required :class="{'is-invalid': !validQuantity}" />
                <div v-if="!validQuantity" class="invalid-feedback">Please enter a valid quantity.</div>
            </div>
            <div class="mb-3">
                <label for="addEquipmentQuantityDueMaintenance" class="form-label">Quantity Due Maintenance</label>
                <input v-model="equipment.quantityDueMaintenance" type="number" class="form-control text-center" 
                    id="addEquipmentQuantityDueMaintenance" required :class="{'is-invalid': !validQuantityDueMaintenance}" />
                <div v-if="!validQuantityDueMaintenance" class="invalid-feedback">Please enter a valid maintenance quantity.</div>
            </div>
            <div class="mb-3">
                <label for="addEquipmentImage" class="form-label">Image URL</label>
                <input v-model="equipment.imgUrl" type="url" class="form-control text-center" id="addEquipmentImage">
            </div>
            <div class="pb-3">
                <button type="submit" class="btn btn-primary" :disabled="!formIsValid">Save changes</button>
            </div>
        </form>

        <!-- Back button -->
        <div class="mb-3">
            <button @click="goBack" class="btn btn-secondary">Back</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            equipment: {
                name: '',
                price: 0,
                quantity: 0,
                quantityDueMaintenance: 0,
                imgUrl: null,
                createdUserId: 1,
            },
            placeholderImg: 'https://aneeqbass.github.io/fitquip_images/repairIcon.png',
        };
    },
    methods: {
        addEquipment() {
            if (this.formIsValid) {
                this.$store.dispatch('addEquipment', this.equipment)
                    .then(() => {
                        this.$router.push('/admin');
                    })
                    .catch(err => {
                        console.error("Failed to add equipment:", err);
                    });
            }
        },
        goBack() {
            this.$router.go(-1);  // Navigate back to the previous page
        },
    },
    computed: {
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
        },
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

.form-control.is-invalid {
    border-color: #dc3545;
}

.invalid-feedback {
    color: #dc3545;
}
</style>
