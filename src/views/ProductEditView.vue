<template>
    <div class="container">
        <form id="editProductForm" v-if="product" @submit.prevent="updateProduct">
            <div class="mb-3">
                <img class="prodImg" :src="product.prodURL" alt="" />
            </div>
            <div class="mb-3">
                <label for="editProductName" class="form-label">Product Name</label>
                <input v-model="product.prodName" type="text" class="form-control text-center" id="editProductName"
                    required />
            </div>
            <div class="mb-3">
                <label for="editProductDescription" class="form-label">Product Description</label>
                <input v-model="product.description" type="text" class="form-control text-center" id="editProductDescription"
                    required />
            </div>
            <div class="mb-3">
                <label for="editProductCategory" class="form-label">Category</label>
                <input v-model="product.category" type="text" class="form-control text-center" id="editProductCategory"
                    required />
            </div>
            <div class="mb-3">
                <label for="editProductImage" class="form-label">Image URL</label>
                <input v-model="product.prodURL" type="url" class="form-control text-center" id="editProductImage"
                    required />
            </div>
            <div class="mb-3">
                <label for="editProductQuantity" class="form-label">Quantity</label>
                <input v-model="product.quantity" type="number" step="0.01" class="form-control text-center"
                    id="editProductQuantity" required />
            </div>
            <div class="mb-3">
                <label for="editProductPrice" class="form-label">Price</label>
                <input v-model="product.amount" type="number" step="0.01" class="form-control text-center"
                    id="editProductPrice" required />
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
        fetchProduct() {
            this.$store.dispatch("fetchProduct", this.$route.params.id);
        },
        updateProduct() {
            this.$store
                .dispatch("updateProduct", this.product)
                .then(() => {
                    this.$router.push("/admin");
                })
                .catch((err) => {
                    console.error("Failed to update product:", err);
                });
        },
    },
    computed: {
        product() {
            return this.$store.state.product;
        },
    },
    components: {
        Spinner,
    },
    mounted() {
        this.fetchProduct();
    },
};
</script>

<style scoped>
img {
    width: 25rem;
}
.prodImg {
  border: none;
  -webkit-filter: drop-shadow(2px 2px 0 #e21861)
    drop-shadow(-2px -2px 0 #e21861);
  filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
}
</style>