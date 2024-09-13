<template>
  <div class="container order-items">
    <h1 class="mb-2 text-start">OrderItems</h1>
    <input
      v-model="searchQuery"
      placeholder="Search OrderItems by Id..."
      class="form-control mb-3"
    />

    <div class="table-responsive" v-if="filteredOrderItems.length">
      <table class="table table-orderItems">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total Price</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="orderItem in filteredOrderItems" :key="orderItem.queueId">

            <td></td>
            
            <td>{{ orderItem.quantity }}</td>
            <td>{{ orderItem.price }}</td>
            <td>R{{ orderItem.priceTotal }}</td>
            <td>
              <button class="btn btn-sm" @click="deleteOrderItem(orderItem.id)">
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <Spinner v-if="loading" />
      <p v-else>No orderItems found.</p>
    </div>

    <div class="d-flex justify-content-end mt-4">
      <button @click="goBack" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left"></i> Back
      </button>
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
    orderItems() {
      return this.$store.state.orderItems || [];
    },
    stocks() {
      return this.$store.state.stocks || [];
    },
    filteredOrderItems() {
      const query = this.searchQuery.trim();
      return this.orderItems.filter((orderItem) =>
        orderItem.stockId.toString().includes(query)
      );
    },
  },
  methods: {
    fetchOrderItems() {
      this.loading = true;
      this.$store
        .dispatch("fetchOrderItems", this.$route.params.id)
        .then(() => {
          this.loading = false; 
        })
        .catch((err) => {
          this.error = "Failed to fetch orderItems.";
          console.error(err); 
        });
        
        
    },
    fetchStockFromOrderId() {
      this.loading = true; // Start loading

      let completedCount = 0; // Counter for completed fetch operations

      // Function to check if all operations are done
      const checkComplete = () => {
        completedCount++;
        if (completedCount === this.orderItems.length) {
          this.loading = false; // All operations are done, stop loading
        }
      };

      // Iterate over orderItems
      this.orderItems.forEach((orderItem) => { 
        this.$store
          .dispatch("fetchStockFromOrderId", this.$route.params.id, orderItem.stockId)
          .then(() => {
            checkComplete(); // Check if all operations are done
            console.log(this.$store.state.stocks); 
            
          })
          .catch((err) => {
            this.error = "Failed to fetch orderItems.";
            console.error(err);
            checkComplete(); // Check if all operations are done
          }); 
      });

      // If there are no order items, stop loading immediately
      if (this.orderItems.length === 0) {
        this.loading = false;
      }
    },

    // fetchOrderItem() {
    //   this.loading = true;
    //   this.$store
    //     .dispatch("fetchOrderItem", this.$route.params.id)
    //     .then(() => {
    //       this.loading = false;
    //       console.log(this.$store.state.stocks);
    //     })
    //     .catch((err) => {
    //       this.error = "Failed to fetch orderItems.";
    //       console.error(err);
    //     });
    // },
    deleteOrderItem(id) {
      if (confirm("Are you sure you want to delete this orderItem?")) {
        this.$store
          .dispatch("deleteOrderItem", id)
          .then(() => {
            this.fetchOrderItems();
          })
          .catch((err) => {
            console.error("Failed to delete orderItem:", err);
          });
      }
    },
    goBack() {
      this.$router.go(-1); // Navigates back to the previous page
    },
  },
  components: {
    Spinner,
  },
  mounted() {
    this.fetchStockFromOrderId();
    this.fetchOrderItems();
  },
};
</script>
    
<style scoped>
.order-items {
  line-height: 1.5;
  font-size: 17px;
  letter-spacing: 0.05em;
  margin-top: 120px;
}

.table-orderItems th,
.table-orderItems td {
  white-space: nowrap;
  vertical-align: middle;
}

.table-orderItems {
  margin-bottom: 1rem;
}

.table-orderItems th,
.table-orderItems td {
  white-space: nowrap;
  vertical-align: middle;
}

i {
  font-size: 2rem;
  color: #e21861;
}

.btn {
  color: #e21861;
  border: 1px solid #e21861;
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s;
}

.btn-outline-secondary {
  border-color: #e21861;
  color: #e21861;
}

.btn-outline-secondary:hover {
  background-color: #e21861;
  color: white;
}

.spinner {
  display: block;
  margin: 0 auto;
  width: 3rem;
  height: 3rem;
}

.table-responsive {
  border: 1px solid #e21861;
  border-radius: 5px;
}

.table thead th {
  background-color: #e21861;
  color: white;
  font-weight: bold;
}

.table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}
</style>
