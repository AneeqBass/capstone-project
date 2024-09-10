<template>
    <div class="container">
        <form id="editSupplementForm" v-if="supplement" @submit.prevent="updateSupplement">
            <div class="mb-3 text-center">
                <img class="prodImg" :src="supplement.imgUrl" alt="Supplement Image" />
            </div>
            <div class="mb-3">
                <label for="editSupplementName" class="form-label">Name</label>
                <input v-model="supplement.name" type="text" class="form-control text-center" id="editSupplementName"
                    required />
            </div>
            <div class="mb-3">
                <label for="editSupplementDescription" class="form-label">Description</label>
                <input v-model="supplement.description" type="text" class="form-control text-center" id="editSupplementDescription"
                    required />
            </div>
            <div class="mb-3">
                <label for="editSupplementCategory" class="form-label">Category</label>
                <input v-model="supplement.category" type="text" class="form-control text-center" id="editSupplementCategory"
                    required />
            </div>
            <div class="mb-3">
                <label for="editSupplementPrice" class="form-label">Price</label>
                <input v-model="supplement.price" type="number" step="0.01" class="form-control text-center"
                    id="editSupplementPrice" required :class="{'is-invalid': !validPrice}" />
                <div v-if="!validPrice" class="invalid-feedback">
                    Please enter a valid price.
                </div>
            </div>
            <div class="mb-3">
                <label for="editSupplementQuantity" class="form-label">Quantity</label>
                <input v-model="supplement.quantity" type="number" class="form-control text-center"
                    id="editSupplementQuantity" required :class="{'is-invalid': !validQuantity}" />
                <div v-if="!validQuantity" class="invalid-feedback">
                    Please enter a valid quantity.
                </div>
            </div>
            <div class="mb-3">
                <label for="editSupplementImage" class="form-label">Image URL</label>
                <input v-model="supplement.imgUrl" type="url" class="form-control text-center"
                    id="editSupplementImage" />
            </div>
            <div class="pb-3">
                <button type="submit" class="btn btn-primary" :disabled="!formIsValid">Save changes</button>
            </div>
        </form>
        
        <div v-else>
            <Spinner />
        </div>

        <!-- Back button -->
        <div class="mb-3" v-if="supplement">
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
        fetchSupplement() {
            this.$store.dispatch("fetchSupplement", this.$route.params.id);
        },
        updateSupplement() {
            if (this.formIsValid) {
                this.$store
                    .dispatch("updateSupplement", this.supplement)
                    .then(() => {
                        this.$router.push("/admin");
                    })
                    .catch((err) => {
                        console.error("Failed to update supplement:", err);
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
        supplement() {
            return this.$store.state.supplement;
        },
        validPrice() {
            return this.supplement.price > 0;
        },
        validQuantity() {
            return this.supplement.quantity >= 0;
        },
        formIsValid() {
            return this.supplement.name && this.supplement.description && this.supplement.category && this.validPrice && this.validQuantity;
        }
    },
    components: {
        Spinner,
    },
    mounted() {
        this.fetchSupplement();
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
