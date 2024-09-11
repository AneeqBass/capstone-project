<template>
  <div class="container">
    <h5>Users</h5>
    <input v-model="searchQuery" placeholder="Search Users..." class="form-control mb-3" />
    <div class="table-responsive" v-if="filteredUsers.length">
      <table class="table table-users">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col" class="d-none d-sm-table-cell">Surname</th>
            <th scope="col" class="d-none d-md-table-cell">Gender</th>
            <th scope="col" class="d-none d-lg-table-cell">Email</th>
            <th scope="col" class="d-none d-lg-table-cell">Role</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td class="d-none d-sm-table-cell">{{ user.surname }}</td>
            <td class="d-none d-md-table-cell">{{ user.gender }}</td>
            <td class="d-none d-lg-table-cell">{{ user.email }}</td>
            <td class="d-none d-lg-table-cell">{{ user.role }}</td>
            <td>
              <router-link :to="{ name: 'userEdit', params: { id: user.id } }">
                  <button class="btn btn-sm"><i class="bi bi-pencil-square"></i></button>
                </router-link>
            </td>
            <td>
              <button class="btn btn-sm" @click="deleteUser(user.id)"><i class="bi bi-trash-fill"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <Spinner v-if="loading" />
      <p v-else>No users found.</p>
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
        `${user.name} ${user.surname}`.toLowerCase().includes(this.searchQuery.toLowerCase())
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
    deleteUser(id) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.$store.dispatch('deleteUser', id)
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

.table-users th,
.table-users td {
  white-space: nowrap;
  /* Prevent text from wrapping */
  vertical-align: middle;
}

@media (max-width: 575px) {

  .table-users th,
  .table-users td {
    font-size: 0.8rem;
    /* Smaller font size for mobile */
  }
}

.btn-sm {
  font-size: 0.8rem;
  /* Smaller button size */
}

i {
  font-size: 2rem;
  color: #e21861;
}
</style>