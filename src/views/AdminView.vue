<template>
    <div class="container admin">
      <AdminProducts />
      <AdminUsers />
    </div>
  </template>
  
  <script>
  import AdminProducts from '@/components/AdminProducts.vue';
  import AdminUsers from '@/components/AdminUsers.vue';
  
  export default {
  components: {
    AdminProducts,
    AdminUsers,
  },
  };
  </script>
  
  <style scoped>
  .admin {
    line-height: 1.5;
    font-size: 17px;
    letter-spacing: 0.05em;
    margin-top: 120px;
  }
  </style>