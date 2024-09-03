<template>
    <div class="container pb-3">
        <div class="equipments">
            <h1 class="mb-2 text-start">/Equipments</h1>

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

            <div class="row justify-content-center" v-if="filteredEquipments.length">
                <Card data-aos="fade-up" v-for="equipment in sortedEquipments" :key="equipment.id">
                    <template #cardHeader>
                        <img :src="equipment.imgUrl" loading="lazy"
                            class="small-img img-fluid rounded mx-auto d-block card-img-top" :alt="equipment.name">
                    </template>
                    <template #cardBody>
                        <h5 class="card-title">{{ equipment.name }}</h5>
                        <h5 class="card-title">{{ equipment.category }}</h5>
                        <p class="lead"><span class="text-success">Quantity</span>: {{ equipment.quantity }}</p>
                        <p class="lead"><span class="text-success">Price</span>: R{{ equipment.price }}</p>
                        <!-- <router-link :to="{ name: 'equipmentDetail', params: { id: equipment.id } }"><i
                                class="fas bi-arrow-right-circle-fill fa-10x"></i></router-link> -->
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
        equipments: []
    },

    data() {
        return {
            selectedCategory: '', 
            sortOption: 'name', 
        };
    },
    computed: {
        categories() {
            if (!this.$store.state.equipments || !this.$store.state.equipments.length) {
                return []; 
            }
            const categories = this.$store.state.equipments.map(equipment => equipment.category);
            return [...new Set(categories)];
        },
        filteredEquipments() {
            if (!this.selectedCategory) {
                return this.equipments();
            }
            return this.equipments().filter(equipment => equipment.category === this.selectedCategory);
        },
        sortedEquipments() {
            return [...this.filteredEquipments].sort((a, b) => {
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
            this.getEquipments();
        },
        getEquipments() {
            this.$store.dispatch('fetchEquipments');
        },
        equipments() {
            return this.$store.state.equipments || [];
        },
    },
    components: {
        Spinner,
        Card,
    },
    mounted() {
        this.getEquipments();
    },
};
</script>


<style scoped>
* {
    line-height: 1.5;
    font-size: 16px;
    letter-spacing: 0.05em;
}

.equipments {
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