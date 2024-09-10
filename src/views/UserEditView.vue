<template>
  <div class="container pb-4">
    <form id="editUserForm" v-if="user" @submit.prevent="updateUser">
      <div class="mb-3 text-center">
        <img class="imgUrl" :src="user.imgUrl" alt="Profile Picture" style="width: 150px; height: 150px; border-radius: 50%;">
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
        <select v-model="user.gender" class="form-control text-center" id="editUserGender" required>
          <option disabled value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="editUserEmail" class="form-label">Email Address</label>
        <input v-model="user.email" type="email" class="form-control text-center" id="editUserEmail" :class="{'is-invalid': !validEmail}" required>
        <div v-if="!validEmail" class="invalid-feedback">
          Please enter a valid email.
        </div>
      </div>
      <div class="mb-3">
        <label for="editUserPassword" class="form-label">User Password</label>
        <input v-model="user.password" type="password" class="form-control text-center" id="editUserPassword" :class="{'is-invalid': !validPassword}" required>
        <div v-if="!validPassword" class="invalid-feedback">
          Password must be at least 6 characters long.
        </div>
      </div>
      <div class="mb-3">
        <label for="editUserProfile" class="form-label">Profile Pic URL</label>
        <input v-model="user.imgUrl" type="url" class="form-control text-center" id="editUserProfile">
      </div>
      <div class="mb-3">
        <label for="editUserRole" class="form-label">User Role</label>
        <input v-model="user.role" type="text" class="form-control text-center" id="editUserRole" :class="{'is-invalid': !validRole}" required>
        <div v-if="!validRole" class="invalid-feedback">
          Please enter a valid role.
        </div>
      </div>
      <div class="pb-3">
        <button type="submit" class="btn btn-primary" :disabled="!formIsValid">Save changes</button>
      </div>
    </form>

    <div v-else>
      <Spinner />
    </div>

    <!-- Back button -->
    <div class="mb-3" v-if="user">
      <button @click="goBack" class="btn btn-secondary">Back</button>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/SpinnerComp.vue'

export default {
  methods: {
    fetchUser() {
      this.$store.dispatch('fetchUser', this.$route.params.id);
    },
    updateUser() {
      if (this.formIsValid) {
        this.$store.dispatch('updateUser', this.user)
          .then(() => {
            this.$router.push('/admin');
          })
          .catch(err => {
            console.error("Failed to update user:", err);
          });
      } else {
        console.error("Form is not valid");
      }
    },
    goBack() {
      this.$router.go(-1);  // Go back to the previous route
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    validEmail() {
      const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      return emailPattern.test(this.user.email);
    },
    validPassword() {
      return this.user.password.length >= 6;
    },
    validRole() {
      return this.user.role.length > 0;
    },
    formIsValid() {
      return this.user.name && this.user.surname && this.user.gender && this.validEmail && this.validPassword && this.validRole;
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

<style scoped>
.container {
  margin: 0 auto;
}

.imgUrl {
  object-fit: cover;
}

.form-control.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
}

img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>
