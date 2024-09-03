<template>
    <div class="container">
      <h5>Users</h5>
      <input v-model="searchQuery" placeholder="Search Users..." class="form-control mb-3"/>
      <div class="table-responsive" v-if="filteredUsers.length">
        <table class="table table-products">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col" class="d-none d-sm-table-cell">Surname</th>
              <th scope="col" class="d-none d-md-table-cell">Age</th>
              <th scope="col" class="d-none d-md-table-cell">Gender</th>
              <th scope="col" class="d-none d-lg-table-cell">Role</th>
              <th scope="col" class="d-none d-lg-table-cell">Email</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.userID">
              <td>{{ user.userID }}</td>
              <td>{{ user.firstName }}</td>
              <td class="d-none d-sm-table-cell">{{ user.lastName }}</td>
              <td class="d-none d-md-table-cell">{{ user.userAge }}</td>
              <td class="d-none d-md-table-cell">{{ user.gender }}</td>
              <td class="d-none d-lg-table-cell">{{ user.userRole }}</td>
              <td class="d-none d-lg-table-cell">{{ user.emailAdd }}</td>
              <td>
                <router-link :to="{ name: 'userEdit', params: { id: user.userID } }">
                  <button class="btn btn-sm"><i class="bi bi-pencil-square"></i></button>
                </router-link>
              </td>
              <td>
                <button class="btn btn-sm" @click="deleteUser(user.userID)"><i class="bi bi-trash-fill"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <Spinner v-if="loading" />
        <p v-else>No users found.</p>
      </div>
      <div class="d-flex justify-content-center align-items-center mb-4">
        <p class="my-auto">Add User</p>
        <router-link :to="{ name: 'userAdd' }">
          <i class="bi bi-plus-square-fill mx-2"></i>
        </router-link>
      </div>
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
      users() {
        return this.$store.state.users || [];  
      },
      filteredUsers() {
        return this.users.filter(user =>
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      fetchUsers() {
        this.loading = true;
        this.$store.dispatch('fetchUsers')
          .then(() => {
            this.loading = false;
          })
          .catch(err => {
            this.error = 'Failed to fetch users.';
            console.error(err);
          });
      },
      deleteUser(userID) {
        if (confirm('Are you sure you want to delete this user?')) {
          this.$store.dispatch('deleteUser', userID)
            .then(() => {
              this.fetchUsers();  // Refresh the user list after deletion
            })
            .catch(err => {
              console.error('Failed to delete user:', err);
            });
        }
      }
    },
    components: {
      Spinner,
    },
    mounted() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 100%;
  }
  
  .table-products th, 
  .table-products td {
    white-space: nowrap;  /* Prevent text from wrapping */
    vertical-align: middle;
  }
  
  @media (max-width: 575px) {
    .table-products th, .table-products td {
      font-size: 0.8rem;  /* Smaller font size for mobile */
    }
  }
  
  .btn-sm {
    font-size: 0.8rem;  /* Smaller button size */
  }
  
  i {
    font-size: 2rem;
    color: #e21861;
  }
  </style>