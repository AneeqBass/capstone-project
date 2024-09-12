<template>
    <div class="container">
        <form id="editStockForm" v-if="stock" @submit.prevent="updateStock">
            <div class="mb-3 text-center">
                <img class="prodImg" :src="stock.imgUrl" alt="Stock Image" />
            </div>
            <div class="mb-3">
                <label for="editStockName" class="form-label">Name</label>
                <input v-model="stock.name" type="text" class="form-control text-center" id="editStockName"
                    required />
            </div>
            <div class="mb-3">
                <label for="editStockDescription" class="form-label">Description</label>
                <input v-model="stock.description" type="text" class="form-control text-center" id="editStockDescription"
                    required />
            </div>
            <div class="mb-3">
                <label for="editStockCategory" class="form-label">Category</label>
                <input v-model="stock.category" type="text" class="form-control text-center" id="editStockCategory"
                    required />
            </div>
            <div class="mb-3">
                <label for="editStockPrice" class="form-label">Price</label>
                <input v-model="stock.price" type="number" step="0.01" class="form-control text-center"
                    id="editStockPrice" required :class="{'is-invalid': !validPrice}" />
                <div v-if="!validPrice" class="invalid-feedback">
                    Please enter a valid price.
                </div>
            </div>
            <div class="mb-3">
                <label for="editStockQuantity" class="form-label">Quantity</label>
                <input v-model="stock.quantity" type="number" class="form-control text-center"
                    id="editStockQuantity" required :class="{'is-invalid': !validQuantity}" />
                <div v-if="!validQuantity" class="invalid-feedback">
                    Please enter a valid quantity.
                </div>
            </div>
            <div class="mb-3">
                <label for="editStockImage" class="form-label">Image URL</label>
                <input v-model="stock.imgUrl" type="url" class="form-control text-center"
                    id="editStockImage" />
            </div>
            <div class="pb-3">
                <button type="submit" class="btn btn-primary" :disabled="!formIsValid">Save changes</button>
            </div>
        </form>
        
        <div v-else>
            <Spinner />
        </div>

        <!-- Back button -->
        <div class="mb-3" v-if="stock">
            <button @click="goBack" class="btn btn-secondary">Back</button>
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
        fetchStock() {
            this.$store.dispatch("fetchStock", this.$route.params.id);
        },
        updateStock() {
            if (this.formIsValid) {
                this.$store
                    .dispatch("updateStock", this.stock)
                    .then(() => {
                        this.$router.push("/admin");
                    })
                    .catch((err) => {
                        console.error("Failed to update stock:", err);
                    });
            } else {
                console.error("Form is not valid");
            }
        },
        goBack() {
            this.$router.go(-1);  // Go back to the previous page
        }
    },
    computed: {
        stock() {
            return this.$store.state.stock;
        },
        validPrice() {
            return this.stock.price > 0;
        },
        validQuantity() {
            return this.stock.quantity >= 0;
        },
        formIsValid() {
            return this.stock.name && this.stock.description && this.stock.category && this.validPrice && this.validQuantity;
        }
    },
    components: {
        Spinner,
    },
    mounted() {
        this.fetchStock();
    }
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
