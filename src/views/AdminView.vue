<template>
  <div class="container admin">
    <h1 class="mb-2 text-start">/Admin</h1>
    <AdminEquipment />
    <AdminSupplement />
    <AdminUsers />
  </div>
</template>

<script>
import AdminEquipment from '@/components/AdminEquipment.vue';
import AdminSupplement from '@/components/AdminSupplement.vue';
import AdminUsers from '@/components/AdminUsers.vue';

export default {
  components: {
    AdminEquipment,
    AdminUsers,
    AdminSupplement
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