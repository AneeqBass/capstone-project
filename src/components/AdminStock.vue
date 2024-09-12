<template>
    <div class="container">
      <h5>Stocks</h5>
      <input v-model="searchQuery" placeholder="Search Stocks..." class="form-control mb-3" />
      <div class="table-responsive" v-if="filteredStocks.length">
        <table class="table table-stocks">
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
            <tr v-for="stock in filteredStocks" :key="stock.id">
              <td>{{ stock.id }}</td>
              <td>{{ stock.name }}</td>
              <td class="d-none d-sm-table-cell">{{ stock.category }}</td>
              <td class="d-none d-md-table-cell">{{ stock.quantity }}</td>
              <td class="d-none d-md-table-cell">R{{ stock.price }}</td>
              <td>
                <router-link :to="{ name: 'stockEdit', params: { id: stock.id } }">
                  <button class="btn btn-sm"><i class="bi bi-pencil-square"></i></button>
                </router-link>
              </td>
              <td>
                <button class="btn btn-sm" @click="deleteStock(stock.id)"><i
                    class="bi bi-trash-fill"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <Spinner v-if="loading" />
        <p v-else>No stocks found.</p>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <p class="my-auto">Add Stock</p>
        <router-link :to="{ name: 'stockAdd' }">
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
      stocks() {
        return this.$store.state.stocks || [];  
      },
      filteredStocks() {
        return this.stocks.filter(stock =>
          stock.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      fetchStocks() {
        this.loading = true;
        this.$store.dispatch('fetchStocks')
          .then(() => {
            this.loading = false;
          })
          .catch(err => {
            this.error = 'Failed to fetch stocks.';
            console.error(err);
          });
      },
      deleteStock(id) {
        if (confirm('Are you sure you want to delete this stock?')) {
          this.$store.dispatch('deleteStock', id)
            .then(() => {
              this.fetchStocks();
            })
            .catch(err => {
              console.error('Failed to delete stock:', err);
            });
        }
      }
    },
    components: {
      Spinner,
    },
    mounted() {
      this.fetchStocks();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 100%;
  }
  
  .table-stocks th,
  .table-stocks td {
    white-space: nowrap;
    vertical-align: middle;
  }
  
  @media (max-width: 575px) {
  
    .table-stocks th,
    .table-stocks td {
      font-size: 0.8rem;
    }
  }
  
  i {
    font-size: 2rem;
    color: #e21861;
  }
  </style>