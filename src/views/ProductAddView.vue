<template>
    <div class="container">
      <form id="addProductForm" @submit.prevent="addProduct">
        <div class="mb-3">
          <label for="addProductName" class="form-label">Product Name</label>
          <input v-model="product.prodName" type="text" class="form-control text-center" id="addProductName" required>
        </div>
        <div class="mb-3">
          <label for="editProductDescription" class="form-label">Product Description</label>
          <input v-model="product.description" type="text" class="form-control text-center" id="editProductDescription"
            required />
        </div>
        <div class="mb-3">
          <label for="addProductCategory" class="form-label">Category</label>
          <input v-model="product.category" type="text" class="form-control text-center" id="addProductCategory" required>
        </div>
        <div class="mb-3">
          <label for="addProductImage" class="form-label">Image URL</label>
          <input v-model="product.prodURL" type="url" class="form-control text-center" id="addProductImage" required>
        </div>
        <div class="mb-3">
          <label for="addProductQuantity" class="form-label">Quantity</label>
          <input v-model="product.quantity" type="number" step="0.01" class="form-control text-center"
            id="addProductQuantity" required>
        </div>
        <div class="mb-3">
          <label for="addProductPrice" class="form-label">Price</label>
          <input v-model="product.amount" type="number" step="0.01" class="form-control text-center" id="addProductPrice"
            required>
        </div>
        <div class="pb-3">
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          prodName: '',
          category: '',
          prodURL: '',
          quantity: 0,
          amount: 0
        }
      };
    },
    methods: {
      addProduct() {
        this.$store.dispatch('addProduct', this.product)
          .then(() => {
            this.$router.push('/admin');
          })
          .catch(err => {
            console.error("Failed to add product:", err);
          });
      },
    },
  }
  </script>
  
  <style scoped></style>