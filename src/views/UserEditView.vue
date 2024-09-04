<template>
  <div class="container pb-4">
    <form id="editUserForm" v-if="user" @submit.prevent="updateUser">
      <div class="mb-3">
        <img class="imgUrl" :src=user.imgUrl alt="">
      </div>
      <div class="mb-3">
        <label for="editUserName" class="form-label">Name</label>
        <input v-model="user.name" type="text" class="form-control text-center" id="editUserName" required>
      </div>
      <div class="mb-3">
        <label for="editUserSurname" class="form-label">Surname</label>
        <input v-model="user.surname" type="text" class="form-control text-center" id="editUserSurname" required>
      </div>
      <div class="mb-3">
        <label for="editUserGender" class="form-label">Gender</label>
        <input v-model="user.gender" type="text" class="form-control text-center" id="editUserGender" required>
      </div>
      <div class="mb-3">
        <label for="editUserEmail" class="form-label">Email Address</label>
        <input v-model="user.email" type="email" step="0.01" class="form-control text-center" id="editUserEmail"
          required>
      </div>
      <div class="mb-3">
        <label for="editUserPassword" class="form-label">User Password</label>
        <input v-model="user.password" type="text" step="0.01" class="form-control text-center" id="editUserPassword"
          required>
      </div>
      <div class="mb-3">
        <label for="editUserProfile" class="form-label">Profile Pic</label>
        <input v-model="user.imgUrl" type="url" step="0.01" class="form-control text-center" id="editUserProfile"
          required>
      </div>
      <div class="mb-3">
        <label for="editUserRole" class="form-label">User Role</label>
        <input v-model="user.role" type="text" step="0.01" class="form-control text-center" id="editUserRole" required>
      </div>
      <div class="pb-3">
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
    </form>
    <div v-else>
      <Spinner />
    </div>

  </div>
</template>

<script>
import Spinner from '@/components/SpinnerComp.vue'

export default {
  methods: {
    fetchUser() {
      this.$store.dispatch('fetchUser', this.$route.params.id)
    },
    updateUser() {
      this.$store.dispatch('updateUser', this.user)
        .then(() => {
          this.$router.push('/admin');
        })
        .catch(err => {
          console.error("Failed to update user:", err);
        });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  components: {
    Spinner
  },
  mounted() {
    this.fetchUser();
  }
}
</script>

<style>
img {
  width: 15rem;
}
</style>