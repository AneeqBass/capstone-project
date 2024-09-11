<template>
    <div class="container pb-3">
        <div class="supplements">
            <h1 class="mb-2 text-start">/Supplements</h1>

            <!-- Filter by Category -->
            <div class="mb-3">
                <label for="categoryFilter" class="form-label">Filter by Category:</label>
                <select v-model="selectedCategory" class="form-select" id="categoryFilter">
                    <option value="">All</option>
                    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                </select>
            </div>

            <!-- Sort by Options -->
            <div class="mb-3">
                <label for="sortOptions" class="form-label">Sort by:</label>
                <select v-model="sortOption" class="form-select" id="sortOptions">
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </select>
            </div>

            <div class="row justify-content-center" v-if="filteredSupplements.length">
                <Card data-aos="fade-up" v-for="supplement in sortedSupplements" :key="supplement.id">
                    <template #cardHeader>
                        <img :src="supplement.imgUrl" loading="lazy"
                            class="small-img img-fluid rounded mx-auto d-block card-img-top" :alt="supplement.name">
                    </template>
                    <template #cardBody>
                        <h5 class="card-title">{{ supplement.name }}</h5>
                        <h5 class="card-title">{{ supplement.category }}</h5>
                        <p class="lead"><span class="text-success">Quantity</span>: {{ supplement.quantity }}</p>
                        <p class="lead"><span class="text-success">Price</span>: R{{ supplement.price }}</p>
                        <router-link :to="{ name: 'supplementDetail', params: { id: supplement.id } }"><i
                                class="fas bi-arrow-right-circle-fill fa-10x"></i></router-link>
                    </template>
                </Card>
            </div>
            <div v-else>
                <Spinner />
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/SpinnerComp.vue'
import Card from '@/components/CardComp.vue'

export default {
    state: {
        supplements: []
    },

    data() {
        return {
            selectedCategory: '', 
            sortOption: 'name', 
        };
    },
    computed: {
        categories() {
            if (!this.$store.state.supplements || !this.$store.state.supplements.length) {
                return []; 
            }
            const categories = this.$store.state.supplements.map(supplement => supplement.category);
            return [...new Set(categories)];
        },
        filteredSupplements() {
            if (!this.selectedCategory) {
                return this.supplements();
            }
            return this.supplements().filter(supplement => supplement.category === this.selectedCategory);
        },
        sortedSupplements() {
            return [...this.filteredSupplements].sort((a, b) => {
                if (this.sortOption === 'name') {
                    return a.name.localeCompare(b.name);
                } else if (this.sortOption === 'price') {
                    return a.price - b.price;
                }
                return 0;
            });
        },
    },


    methods: {
        mounted() {
            this.getSupplements();
        },
        getSupplements() {
            this.$store.dispatch('fetchSupplements');
        },
        supplements() {
            return this.$store.state.supplements || [];
        },
    },
    components: {
        Spinner,
        Card,
    },
    mounted() {
        this.getSupplements();
    },
};
</script>


<style scoped>
* {
    line-height: 1.5;
    font-size: 16px;
    letter-spacing: 0.05em;
}

.supplements {
    margin-top: 120px;
    width: 100%;
}

h1 {
    font-size: 2rem;
}

.card-img-top {
    width: 10rem;
}

i {
    font-size: 2rem;
    color: #e21861;
}
</style>