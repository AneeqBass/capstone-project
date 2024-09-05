<template>
  <div class="container">
    <form id="addUserForm" @submit.prevent="register">
      <div class="mb-3">
        <label for="addUserName" class="form-label">Name</label>
        <input v-model="user.name" type="text" class="form-control text-center" id="addUserName" required>
      </div>
      <div class="mb-3">
        <label for="addUserSurname" class="form-label">Surname</label>
        <input v-model="user.surname" type="text" class="form-control text-center" id="addUserSurname" required>
      </div>
      <div class="mb-3">
        <label for="addUserGender" class="form-label">Gender</label>
        <input v-model="user.gender" type="text" class="form-control text-center" id="addUserGender" required>
      </div>
      <div class="mb-3">
        <label for="addUserEmail" class="form-label">Email Address</label>
        <input v-model="user.email" type="email" class="form-control text-center" id="addUserEmail" required>
      </div>
      <div class="mb-3">
        <label for="addUserPassword" class="form-label">User Password</label>
        <input v-model="user.password" type="password" class="form-control text-center" id="addUserPassword" required>
      </div>
      <div class="mb-3">
        <label for="addUserProfile" class="form-label">Profile Pic</label>
        <input v-model="user.imgUrl" type="url" class="form-control text-center" id="addUserProfile">
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
        name: '',
        surname: '',
        gender: '',
        email: '',
        password: '',
        imgUrl: null
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