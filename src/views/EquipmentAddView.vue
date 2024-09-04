<template>
    <div class="container">
        <form id="addEquipmentForm" @submit.prevent="addEquipment">
            <div class="mb-3">
                <label for="addEquipmentName" class="form-label">Name</label>
                <input v-model="equipment.name" type="text" class="form-control text-center" id="addEquipmentName"
                    required>
            </div>
            <div class="mb-3">
                <label for="editEquipmentPrice" class="form-label">Price</label>
                <input v-model="equipment.price" type="number" class="form-control text-center"
                    id="editEquipmentPrice" required />
            </div>
            <div class="mb-3">
                <label for="addEquipmentQuantity" class="form-label">Quantity</label>
                <input v-model="equipment.quantity" type="number" class="form-control text-center" id="addEquipmentQuantity"
                    required>
            </div>
            <div class="mb-3">
                <label for="addEquipmentQuantityDueMaintenance" class="form-label">Quantity Due Maintenance</label>
                <input v-model="equipment.quantityDueMaintenance" type="number" step="0.01" class="form-control text-center"
                    id="addEquipmentQuantityDueMaintenance" required>
            </div>
            <div class="mb-3">
                <label for="addEquipmentImage" class="form-label">Image URL</label>
                <input v-model="equipment.imgUrl" type="url" class="form-control text-center" id="addEquipmentImage">
            </div>
            <div class="pb-3">
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
        </form>
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
                imgUrl: '',
                createdUserId: 1
            }
        };
    },
    methods: {
        addEquipment() {
            this.$store.dispatch('addEquipment', this.equipment)
                .then(() => {
                    this.$router.push('/admin');
                })
                .catch(err => {
                    console.error("Failed to add equipment:", err);
                });
        },
    },
}
</script>

<style scoped></style>