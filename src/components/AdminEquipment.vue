<template>
    <div class="container">
      <h5>Products</h5>
      <input v-model="searchQuery" placeholder="Search Products..." class="form-control mb-3" />
      <div class="table-responsive" v-if="filteredProducts.length">
        <table class="table table-products">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col" class="d-none d-sm-table-cell">Category</th>
              <th scope="col" class="d-none d-md-table-cell">Quantity</th>
              <th scope="col" class="d-none d-md-table-cell">Price</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.prodID">
              <td>{{ product.prodID }}</td>
              <td>{{ product.prodName }}</td>
              <td class="d-none d-sm-table-cell">{{ product.category }}</td>
              <td class="d-none d-md-table-cell">{{ product.quantity }}</td>
              <td class="d-none d-md-table-cell">R{{ product.amount }}</td>
              <td>
                <router-link :to="{ name: 'productEdit', params: { id: product.prodID } }">
                  <button class="btn btn-sm"><i class="bi bi-pencil-square"></i></button>
                </router-link>
              </td>
              <td>
                <button class="btn btn-sm" @click="deleteProduct(product.prodID)"><i
                    class="bi bi-trash-fill"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <Spinner v-if="loading" />
        <p v-else>No products found.</p>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <p class="my-auto">Add Product</p>
        <router-link :to="{ name: 'productAdd' }">
          <i class="bi-plus-square-fill mx-2"></i>
        </router-link>
      </div>
  <hr>
    </div>
</template>
  
<script>
  import Spinner from '@/components/SpinnerComp.vue';
  
  export default {
    data() {
      return {
        searchQuery: '',
        loading: false,
        error: null,
      };
    },
    computed: {
      products() {
        return this.$store.state.products || [];  
      },
      filteredProducts() {
        return this.products.filter(product =>
          product.prodName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      fetchProducts() {
        this.loading = true;
        this.$store.dispatch('fetchProducts')
          .then(() => {
            this.loading = false;
          })
          .catch(err => {
            this.error = 'Failed to fetch products.';
            console.error(err);
          });
      },
      deleteProduct(productID) {
        if (confirm('Are you sure you want to delete this product?')) {
          this.$store.dispatch('deleteProduct', productID)
            .then(() => {
              this.fetchProducts();
            })
            .catch(err => {
              console.error('Failed to delete product:', err);
            });
        }
      }
    },
    components: {
      Spinner,
    },
    mounted() {
      this.fetchProducts();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 100%;
  }
  
  .table-products th,
  .table-products td {
    white-space: nowrap;
    vertical-align: middle;
  }
  
  @media (max-width: 575px) {
  
    .table-products th,
    .table-products td {
      font-size: 0.8rem;
    }
  }
  
  i {
    font-size: 2rem;
    color: #e21861;
  }
  </style>