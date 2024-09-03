<template>
    <div class="container pb-4">
      <form id="editUserForm" v-if="user" @submit.prevent="updateUser">
        <div class="mb-3">
          <img class="prodImg" :src=user.userProfile alt="">
        </div>
        <div class="mb-3">
          <label for="editUserFirstName" class="form-label">First Name</label>
          <input v-model="user.firstName" type="text" class="form-control text-center" id="editUserName" required>
        </div>
        <div class="mb-3">
          <label for="editUserLastName" class="form-label">Last Name</label>
          <input v-model="user.lastName" type="text" class="form-control text-center" id="editUserLastName" required>
        </div>
        <div class="mb-3">
          <label for="editUserAge" class="form-label">Age</label>
          <input v-model="user.userAge" type="number" class="form-control text-center" id="editUserAge" required>
        </div>
        <div class="mb-3">
          <label for="editUserGender" class="form-label">Gender</label>
          <input v-model="user.gender" type="text" class="form-control text-center" id="editUserGender" required>
        </div>
        <div class="mb-3">
          <label for="editUserRole" class="form-label">Role</label>
          <input v-model="user.userRole" type="text" step="0.01" class="form-control text-center" id="editUserRole"
            required>
        </div>
        <div class="mb-3">
          <label for="editUserEmailAdd" class="form-label">Email Address</label>
          <input v-model="user.emailAdd" type="email" step="0.01" class="form-control text-center" id="editUserEmailAdd"
            required>
        </div>
        <div class="mb-3">
          <label for="editUserPass" class="form-label">User Password</label>
          <input v-model="user.userPass" type="text" step="0.01" class="form-control text-center" id="editUserPass"
            required>
        </div>
        <div class="mb-3">
          <label for="editUserProfile" class="form-label">Profile Pic</label>
          <input v-model="user.userProfile" type="url" step="0.01" class="form-control text-center" id="editUserProfile"
            required>
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