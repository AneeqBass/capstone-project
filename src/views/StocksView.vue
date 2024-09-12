<template>
    <div class="container pb-3">
        <div class="stocks">
            <h1 class="mb-2 text-start">/Stocks</h1>

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

            <div class="row justify-content-center" v-if="filteredStocks.length">
                <Card data-aos="fade-up" v-for="stock in sortedStocks" :key="stock.id">
                    <template #cardHeader>
                        <img :src="stock.imgUrl" loading="lazy"
                            class="small-img img-fluid rounded mx-auto d-block card-img-top" :alt="stock.name">
                    </template>
                    <template #cardBody>
                        <h5 class="card-title">{{ stock.name }}</h5>
                        <h5 class="card-title">{{ stock.category }}</h5>
                        <p class="lead"><span class="text-success">Quantity</span>: {{ stock.quantity }}</p>
                        <p class="lead"><span class="text-success">Price</span>: R{{ stock.price }}</p>
                        <router-link :to="{ name: 'stockDetail', params: { id: stock.id } }"><i
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
        stocks: []
    },

    data() {
        return {
            selectedCategory: '', 
            sortOption: 'name', 
        };
    },
    computed: {
        categories() {
            if (!this.$store.state.stocks || !this.$store.state.stocks.length) {
                return []; 
            }
            const categories = this.$store.state.stocks.map(stock => stock.category);
            return [...new Set(categories)];
        },
        filteredStocks() {
            if (!this.selectedCategory) {
                return this.stocks();
            }
            return this.stocks().filter(stock => stock.category === this.selectedCategory);
        },
        sortedStocks() {
            return [...this.filteredStocks].sort((a, b) => {
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
            this.getStocks();
        },
        getStocks() {
            this.$store.dispatch('fetchStocks');
        },
        stocks() {
            return this.$store.state.stocks || [];
        },
    },
    components: {
        Spinner,
        Card,
    },
    mounted() {
        this.getStocks();
    },
};
</script>


<style scoped>
* {
    line-height: 1.5;
    font-size: 16px;
    letter-spacing: 0.05em;
}

.stocks {
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