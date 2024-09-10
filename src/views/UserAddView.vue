<template>
  <div class="container">
    <form id="addUserForm" @submit.prevent="register">
      <div class="mb-3 text-center">
        <img class="imgUrl" v-if="user.imgUrl" :src="user.imgUrl" alt="Profile Picture" style="width: 150px; height: 150px; border-radius: 50%;">
      </div>
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
        <select v-model="user.gender" class="form-control text-center" id="addUserGender" required>
          <option disabled value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="addUserEmail" class="form-label">Email Address</label>
        <input v-model="user.email" type="email" class="form-control text-center" id="addUserEmail" :class="{'is-invalid': !validEmail}" required>
        <div v-if="!validEmail" class="invalid-feedback">
          Please enter a valid email.
        </div>
      </div>
      <div class="mb-3">
        <label for="addUserPassword" class="form-label">User Password</label>
        <input v-model="user.password" type="password" class="form-control text-center" id="addUserPassword" :class="{'is-invalid': !validPassword}" required>
        <div v-if="!validPassword" class="invalid-feedback">
          Password must be at least 6 characters long.
        </div>
      </div>
      <div class="mb-3">
        <label for="addUserProfile" class="form-label">Profile Pic URL</label>
        <input v-model="user.imgUrl" type="url" class="form-control text-center" id="addUserProfile">
      </div>
      <div class="pb-3">
        <button type="submit" class="btn btn-primary" :disabled="!formIsValid">Save changes</button>
      </div>
      <div v-if="feedbackMessage" class="alert alert-info mt-3">
        {{ feedbackMessage }}
      </div>
    </form>

    <!-- Back button -->
    <div class="mb-3">
      <button @click="goBack" class="btn btn-secondary">Back</button>
    </div>
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
      },
      feedbackMessage: '' // To show success or error messages
    };
  },
  computed: {
    validEmail() {
      const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      return emailPattern.test(this.user.email);
    },
    validPassword() {
      return this.user.password.length >= 6;
    },
    formIsValid() {
      return this.user.name && this.user.surname && this.user.gender && this.validEmail && this.validPassword;
    }
  },
  methods: {
    register() {
      if (this.formIsValid) {
        this.$store.dispatch('register', this.user)
          .then(() => {
            this.feedbackMessage = "User registered successfully!";
            this.$router.push('/admin');
          })
          .catch(err => {
            this.feedbackMessage = "Failed to add user: " + err;
          });
      } else {
        this.feedbackMessage = "Please fill out the form correctly.";
      }
    },
    goBack() {
      this.$router.go(-1);  // Go back to the previous route
    }
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
</style>
