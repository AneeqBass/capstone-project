<template>
    <div class="container">
      <form id="addUserForm" @submit.prevent="register">
        <div class="mb-3">
          <label for="addUserFirstName" class="form-label">First Name</label>
          <input v-model="user.firstName" type="text" class="form-control text-center" id="addUserFirstName" required>
        </div>
        <div class="mb-3">
          <label for="addUserLastName" class="form-label">Last Name</label>
          <input v-model="user.lastName" type="text" class="form-control text-center" id="addUserLastName" required>
        </div>
        <div class="mb-3">
          <label for="addUserAge" class="form-label">Age</label>
          <input v-model="user.userAge" type="number" class="form-control text-center" id="addUserAge" required>
        </div>
        <div class="mb-3">
          <label for="editUserGender" class="form-label">Gender</label>
          <input v-model="user.gender" type="text" class="form-control text-center" id="editUserGender" required>
        </div>
        <div class="mb-3">
          <label for="addUserRole" class="form-label">Role</label>
          <input v-model="user.userRole" type="text" class="form-control text-center" id="addUserRole" required>
        </div>
        <div class="mb-3">
          <label for="addUserEmailAdd" class="form-label">Email Address</label>
          <input v-model="user.emailAdd" type="email" class="form-control text-center" id="addUserEmailAdd" required>
        </div>
        <div class="mb-3">
          <label for="addUserPass" class="form-label">User Password</label>
          <input v-model="user.userPass" type="password" class="form-control text-center" id="addUserPass" required>
        </div>
        <div class="mb-3">
          <label for="addUserProfile" class="form-label">Profile Pic</label>
          <input v-model="user.userProfile" type="url" class="form-control text-center" id="addUserProfile">
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
        user: {
          firstName: '',
          lastName: '',
          userAge: null,
          userRole: '',
          emailAdd: '',
          userPass: '',
          userProfile: ''
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch('register', this.user)
          .then(() => {
            this.$router.push('/admin');
          })
          .catch(err => {
            console.error("Failed to add user:", err);
          });
      },
    }
  }
  </script>
  
  <style></style>