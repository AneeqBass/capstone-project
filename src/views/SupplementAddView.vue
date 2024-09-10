<template>
    <div class="container">
        <form id="addSupplementForm" @submit.prevent="addSupplement">
            <div class="mb-3 text-center">
                <img class="prodImg" :src="supplement.imgUrl || placeholderImg" alt="Supplement Image" />
            </div>
            <div class="mb-3">
                <label for="addSupplementName" class="form-label">Name</label>
                <input v-model="supplement.name" type="text" class="form-control text-center" id="addSupplementName"
                    required>
            </div>
            <div class="mb-3">
                <label for="addSupplementDescription" class="form-label">Description</label>
                <input v-model="supplement.description" type="text" class="form-control text-center"
                    id="addSupplementDescription" required />
            </div>
            <div class="mb-3">
                <label for="addSupplementCategory" class="form-label">Category</label>
                <input v-model="supplement.category" type="text" class="form-control text-center"
                    id="addSupplementCategory" required>
            </div>
            <div class="mb-3">
                <label for="addSupplementPrice" class="form-label">Price</label>
                <input v-model="supplement.price" type="number" step="0.01" class="form-control text-center"
                    id="addSupplementPrice" required :class="{'is-invalid': !validPrice}" />
                <div v-if="!validPrice" class="invalid-feedback">
                    Please enter a valid price.
                </div>
            </div>
            <div class="mb-3">
                <label for="addSupplementQuantity" class="form-label">Quantity</label>
                <input v-model="supplement.quantity" type="number" step="0.01" class="form-control text-center"
                    id="addSupplementQuantity" required :class="{'is-invalid': !validQuantity}" />
                <div v-if="!validQuantity" class="invalid-feedback">
                    Please enter a valid quantity.
                </div>
            </div>
            <div class="mb-3">
                <label for="addSupplementImage" class="form-label">Image URL</label>
                <input v-model="supplement.imgUrl" type="url" class="form-control text-center" id="addSupplementImage">
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
            supplement: {
                name: '',
                description: '',
                category: '',
                price: 0,
                quantity: 0,
                imgUrl: null,
                createdUserId: 1
            },
            placeholderImg: 'https://aneeqbass.github.io/fitquip_images/repairIcon.png', 
        };
    },
    methods: {
        addSupplement() {
            if (this.formIsValid) {
                this.$store.dispatch('addSupplement', this.supplement)
                    .then(() => {
                        this.$router.push('/admin');
                    })
                    .catch(err => {
                        console.error("Failed to add supplement:", err);
                    });
            }
        },
        goBack() {
            this.$router.go(-1);  // Navigate back to the previous page
        }
    },
    computed: {
        validPrice() {
            return this.supplement.price > 0;
        },
        validQuantity() {
            return this.supplement.quantity >= 0;
        },
        formIsValid() {
            return this.supplement.name && this.supplement.description && this.supplement.category && this.validPrice && this.validQuantity;
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
