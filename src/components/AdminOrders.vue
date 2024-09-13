<template>
  <div class="container">
    <h5>Orders</h5>
    <input v-model="searchQuery" placeholder="Search Orders by Id..." class="form-control mb-3" />
    <div class="table-responsive" v-if="filteredOrders.length">
      <table class="table table-orders">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">User Id</th>
            <th scope="col">Date</th>
            <th scope="col">Total</th>
            <th scope="col">View Details</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.userId }}</td>
            <td>{{ order.date }}</td>
            <td>R{{ order.priceTotal }}</td>
            <td>
              <router-link :to="{ name: 'orderDetail', params: { id: order.id } }">
                <button class="btn btn-sm">
                  <i class="bi bi-view-list"></i>
                </button>
              </router-link>
            </td>
            <td>
              <router-link :to="{ name: 'orderEdit', params: { id: order.id } }">
                <button class="btn btn-sm">
                  <i class="bi bi-pencil-square"></i>
                </button>
              </router-link>
            </td>
            <td>
              <button class="btn btn-sm" @click="deleteOrder(order.id)">
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <Spinner v-if="loading" />
      <p v-else>No orders found.</p>
    </div>
    <hr />
  </div>
</template>

<script>
import Spinner from "@/components/SpinnerComp.vue";

export default {
  data() {
    return {
      searchQuery: "",
      loading: false,
      error: null,
    };
  },
  computed: {
    orders() {
      return this.$store.state.orders || [];
    },
    filteredOrders() {
      const query = this.searchQuery.trim();
      return this.orders.filter(order =>
        order.id.toString().includes(query)
      );
    }
  },
  methods: {
    fetchOrders() {
      this.loading = true;
      this.$store
        .dispatch("fetchOrders")
        .then(() => {
          this.loading = false;
        })
        .catch((err) => {
          this.error = "Failed to fetch orders.";
          console.error(err);
        });
    },
    deleteOrder(id) {
      if (confirm("Are you sure you want to delete this order?")) {
        this.$store
          .dispatch("deleteOrder", id)
          .then(() => {
            this.fetchOrders();
          })
          .catch((err) => {
            console.error("Failed to delete order:", err);
          });
      }
    },
  },
  components: {
    Spinner,
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}

.table-orders th,
.table-orders td {
  white-space: nowrap;
  vertical-align: middle;
}

@media (max-width: 575px) {

  .table-orders th,
  .table-orders td {
    font-size: 0.8rem;
  }
}

.d-none.d-sm-table-cell {
  display: none;
}

@media (min-width: 576px) {
  .d-none.d-sm-table-cell {
    display: table-cell;
  }
}

.d-none.d-md-table-cell {
  display: none;
}

@media (min-width: 768px) {
  .d-none.d-md-table-cell {
    display: table-cell;
  }
}

i {
  font-size: 2rem;
  color: #e21861;
}

.btn {
  color: #e21861;
}
</style>