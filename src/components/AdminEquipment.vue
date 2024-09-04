<template>
    <div class="container">
      <h5>Equipments</h5>
      <input v-model="searchQuery" placeholder="Search Equipments..." class="form-control mb-3" />
      <div class="table-responsive" v-if="filteredEquipments.length">
        <table class="table table-equipments">
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
            <tr v-for="equipment in filteredEquipments" :key="equipment.id">
              <td>{{ equipment.id }}</td>
              <td>{{ equipment.name }}</td>
              <td class="d-none d-sm-table-cell">{{ equipment.category }}</td>
              <td class="d-none d-md-table-cell">{{ equipment.quantity }}</td>
              <td class="d-none d-md-table-cell">R{{ equipment.price }}</td>
              <td>
                <!-- <router-link :to="{ name: 'equipmentEdit', params: { id: equipment.id } }">
                  <button class="btn btn-sm"><i class="bi bi-pencil-square"></i></button>
                </router-link> -->
              </td>
              <td>
                <button class="btn btn-sm" @click="deleteEquipment(equipment.id)"><i
                    class="bi bi-trash-fill"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <Spinner v-if="loading" />
        <p v-else>No equipments found.</p>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <p class="my-auto">Add Equipment</p>
        <!-- <router-link :to="{ name: 'equipmentAdd' }">
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
      equipments() {
        return this.$store.state.equipments || [];  
      },
      filteredEquipments() {
        return this.equipments.filter(equipment =>
          equipment.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      fetchEquipments() {
        this.loading = true;
        this.$store.dispatch('fetchEquipments')
          .then(() => {
            this.loading = false;
          })
          .catch(err => {
            this.error = 'Failed to fetch equipments.';
            console.error(err);
          });
      },
      deleteEquipment(id) {
        if (confirm('Are you sure you want to delete this equipment?')) {
          this.$store.dispatch('deleteEquipment', id)
            .then(() => {
              this.fetchEquipments();
            })
            .catch(err => {
              console.error('Failed to delete equipment:', err);
            });
        }
      }
    },
    components: {
      Spinner,
    },
    mounted() {
      this.fetchEquipments();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 100%;
  }
  
  .table-equipments th,
  .table-equipments td {
    white-space: nowrap;
    vertical-align: middle;
  }
  
  @media (max-width: 575px) {
  
    .table-equipments th,
    .table-equipments td {
      font-size: 0.8rem;
    }
  }
  
  i {
    font-size: 2rem;
    color: #e21861;
  }
  </style>