<template>
    <div class="container">
        <div class="singleProduct">
        <div class="row justify-content-center" v-if="product" >
            <div>
                {{ product.productURL }}
                <img :src="product.prodURL" loading="lazy" class="img-fluid prodImg" :alt="product.prodName">
            </div>
            <div>
                <h5 class="card-title">{{ product.prodName }}</h5>
                <h5 class="card-title">{{ product.category }}</h5>
                <p class="">{{ product.description }}</p>
                <p class="lead"><span class="text-success">Quantity</span>: {{ product.quantity }}</p>
                <p class="lead"><span class="text-success">Amount</span>: R{{ product.amount }}</p>
            </div>
        </div>
        <div v-else> 
            <Spinner/>
        </div>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/SpinnerComp.vue'

export default {
    methods:{
        fetchProducts(){
            this.$store.dispatch('fetchProducts')
        },
        products() {
          return this.$store.state.products;
        },
        fetchProduct(){
            this.$store.dispatch('fetchProduct', this.$route.params.id )
        },
        
        
    },
    computed:{
        product(){
            return this.$store.state.product;
        }
    },
components: {
    Spinner,
  },
  mounted() {
    this.fetchProduct()
  }
}
</script>

<style scoped>
img{
    width: 20rem;
}
.prodImg {
  border: none;
  -webkit-filter: drop-shadow(2px 2px 0 #e21861)
    drop-shadow(-2px -2px 0 #e21861);
  filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
}
</style>