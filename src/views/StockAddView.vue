<template>
    <div class="container">
        <form id="addStockForm" @submit.prevent="addStock">
            <div class="mb-3 text-center">
                <img class="prodImg" :src="stock.imgUrl || placeholderImg" alt="Stock Image" />
            </div>
            <div class="mb-3">
                <label for="addStockName" class="form-label">Name</label>
                <input v-model="stock.name" type="text" class="form-control text-center" id="addStockName" required>
            </div>
            <div class="mb-3">
                <label for="addStockDescription" class="form-label">Description</label>
                <input v-model="stock.description" type="text" class="form-control text-center" id="addStockDescription"
                    required />
            </div>
            <div class="mb-3">
                <label for="addStockCategory" class="form-label">Category</label>
                <input v-model="stock.category" type="text" class="form-control text-center" id="addStockCategory"
                    required>
            </div>
            <div class="mb-3">
                <label for="addStockPrice" class="form-label">Price</label>
                <input v-model="stock.price" type="number" step="0.01" class="form-control text-center"
                    id="addStockPrice" required :class="{ 'is-invalid': !validPrice }" />
                <div v-if="!validPrice" class="invalid-feedback">
                    Please enter a valid price.
                </div>
            </div>
            <div class="mb-3">
                <label for="addStockQuantity" class="form-label">Quantity</label>
                <input v-model="stock.quantity" type="number" step="0.01" class="form-control text-center"
                    id="addStockQuantity" required :class="{ 'is-invalid': !validQuantity }" />
                <div v-if="!validQuantity" class="invalid-feedback">
                    Please enter a valid quantity.
                </div>
            </div>
            <div class="mb-3">
                <label for="addStockImage" class="form-label">Image URL</label>
                <input v-model="stock.imgUrl" type="url" class="form-control text-center" id="addStockImage">
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
import { useCookies } from "vue3-cookies";

export default {
    data() {
        return {
            stock: {
                name: '',
                description: '',
                category: '',
                price: 0,
                quantity: 0,
                imgUrl: null,
                createdUserId: null
            },
            currentUser: {},
            placeholderImg: 'https://aneeqbass.github.io/fitquip_images/repairIcon.png',
        };
    },

    created() {
        this.getUserFromCookies();
    },
    methods: {
        getUserFromCookies() {
            const { cookies } = useCookies();
            const authToken = cookies.get("authToken"); // Retrieve the currentUser from the cookies
            const currentUser = cookies.get("user"); // Retrieve the currentUser from the cookies
            if (currentUser && authToken) {
                this.currentUser = currentUser; // Set the currentUser data in the component state
            } else {
                this.currentUser = { name: "Guest" }; // Default to guest if no currentUser data is found
            }
        },
        addStock() {
            if (this.currentUser) {
                this.stock.createdUserId = this.currentUser.id
            }
            if (this.formIsValid) {
                this.$store.dispatch('addStock', this.stock)
                    .then(() => {
                        this.$router.push('/admin');
                    })
                    .catch(err => {
                        console.error("Failed to add stock:", err);
                    });
            }
        },
        goBack() {
            this.$router.go(-1);  // Navigate back to the previous page
        }
    },
    computed: {
        validPrice() {
            return this.stock.price > 0;
        },
        validQuantity() {
            return this.stock.quantity >= 0;
        },
        formIsValid() {
            return this.stock.name && this.stock.description && this.stock.category && this.validPrice && this.validQuantity;
        }
    }
}
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
