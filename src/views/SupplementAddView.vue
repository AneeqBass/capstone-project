<template>
    <div class="container">
        <form id="addSupplementForm" @submit.prevent="addSupplement">
            <div class="mb-3">
                <label for="addSupplementName" class="form-label">Name</label>
                <input v-model="supplement.prodName" type="text" class="form-control text-center" id="addSupplementName"
                    required>
            </div>
            <div class="mb-3">
                <label for="editSupplementDescription" class="form-label">Description</label>
                <input v-model="supplement.description" type="text" class="form-control text-center"
                    id="editSupplementDescription" required />
            </div>
            <div class="mb-3">
                <label for="addSupplementCategory" class="form-label">Category</label>
                <input v-model="supplement.category" type="text" class="form-control text-center"
                    id="addSupplementCategory" required>
            </div>
            <div class="mb-3">
                <label for="addSupplementPrice" class="form-label">Price</label>
                <input v-model="supplement.price" type="number" step="0.01" class="form-control text-center"
                    id="addSupplementPrice" required>
            </div>
            <div class="mb-3">
                <label for="addSupplementQuantity" class="form-label">Quantity</label>
                <input v-model="supplement.quantity" type="number" step="0.01" class="form-control text-center"
                    id="addSupplementQuantity" required>
            </div>
            <div class="mb-3">
                <label for="addSupplementImage" class="form-label">Image URL</label>
                <input v-model="supplement.imgUrl" type="url" class="form-control text-center" id="addSupplementImage">
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
            supplement: {
                name: '',
                description: null,
                category: '',
                price: 0,
                quantity: 0,
                imgUrl: null,
                createdUserId: 1
            }
        };
    },
    methods: {
        addSupplement() {
            this.$store.dispatch('addSupplement', this.supplement)
                .then(() => {
                    this.$router.push('/admin');
                })
                .catch(err => {
                    console.error("Failed to add supplement:", err);
                });
        },
    },
}
</script>

<style scoped></style>