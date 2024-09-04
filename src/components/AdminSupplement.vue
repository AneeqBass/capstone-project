<template>
    <div class="container">
      <h5>Supplements</h5>
      <input v-model="searchQuery" placeholder="Search Supplements..." class="form-control mb-3" />
      <div class="table-responsive" v-if="filteredSupplements.length">
        <table class="table table-supplements">
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
            <tr v-for="supplement in filteredSupplements" :key="supplement.id">
              <td>{{ supplement.id }}</td>
              <td>{{ supplement.name }}</td>
              <td class="d-none d-sm-table-cell">{{ supplement.category }}</td>
              <td class="d-none d-md-table-cell">{{ supplement.quantity }}</td>
              <td class="d-none d-md-table-cell">R{{ supplement.price }}</td>
              <td>
                <!-- <router-link :to="{ name: 'supplementEdit', params: { id: supplement.id } }">
                  <button class="btn btn-sm"><i class="bi bi-pencil-square"></i></button>
                </router-link> -->
              </td>
              <td>
                <button class="btn btn-sm" @click="deleteSupplement(supplement.id)"><i
                    class="bi bi-trash-fill"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <Spinner v-if="loading" />
        <p v-else>No supplements found.</p>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <p class="my-auto">Add Supplement</p>
        <!-- <router-link :to="{ name: 'supplementAdd' }">
          <i class="bi-plus-square-fill mx-2"></i>
        </router-link> -->
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
      supplements() {
        return this.$store.state.supplements || [];  
      },
      filteredSupplements() {
        return this.supplements.filter(supplement =>
          supplement.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      fetchSupplements() {
        this.loading = true;
        this.$store.dispatch('fetchSupplements')
          .then(() => {
            this.loading = false;
          })
          .catch(err => {
            this.error = 'Failed to fetch supplements.';
            console.error(err);
          });
      },
      deleteSupplement(id) {
        if (confirm('Are you sure you want to delete this supplement?')) {
          this.$store.dispatch('deleteSupplement', id)
            .then(() => {
              this.fetchSupplements();
            })
            .catch(err => {
              console.error('Failed to delete supplement:', err);
            });
        }
      }
    },
    components: {
      Spinner,
    },
    mounted() {
      this.fetchSupplements();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 100%;
  }
  
  .table-supplements th,
  .table-supplements td {
    white-space: nowrap;
    vertical-align: middle;
  }
  
  @media (max-width: 575px) {
  
    .table-supplements th,
    .table-supplements td {
      font-size: 0.8rem;
    }
  }
  
  i {
    font-size: 2rem;
    color: #e21861;
  }
  </style>