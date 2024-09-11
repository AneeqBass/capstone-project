<template>
  <div class="register-page ">
    <div class="container pb-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card register-container">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Register</h3>
              <form @submit.prevent="register">
                <div class="mb-3 text-center">
                  <img class="imgUrl" v-if="user.imgUrl" :src="user.imgUrl" alt="Profile Picture"
                    style="width: 150px; height: 150px; border-radius: 50%;">
                </div>
                <div class="mb-3">
                  <label for="addUserName" class="form-label">Name</label>
                  <input v-model="user.name" type="text" class="form-control" id="addUserName"
                    placeholder="Enter your name" required>
                </div>
                <div class="mb-3">
                  <label for="addUserSurname" class="form-label">Surname</label>
                  <input v-model="user.surname" type="text" class="form-control" id="addUserSurname"
                    placeholder="Enter your surname" required>
                </div>
                <div class="mb-3">
                  <label for="addUserGender" class="form-label">Gender</label>
                  <select v-model="user.gender" class="form-control" id="addUserGender" required>
                    <option disabled value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="addUserEmail" class="form-label">Email Address</label>
                  <input v-model="user.email" type="email" class="form-control" id="addUserEmail"
                    :class="{ 'is-invalid': !validEmail }" placeholder="Enter your email" required>
                  <div v-if="!validEmail" class="invalid-feedback">
                    Please enter a valid email.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="addUserPassword" class="form-label">Password</label>
                  <input v-model="user.password" type="password" class="form-control" id="addUserPassword"
                    :class="{ 'is-invalid': !validPassword }" placeholder="Enter your password" required>
                  <div v-if="!validPassword" class="invalid-feedback">
                    Password must be at least 6 characters long.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="addUserProfile" class="form-label">Profile Pic URL</label>
                  <input v-model="user.imgUrl" type="url" class="form-control" id="addUserProfile"
                    placeholder="Optional">
                </div>
                <div class="pb-3">
                  <button type="submit" class="btn btn-primary w-100" :disabled="!formIsValid">Create Account</button>
                </div>
                <div v-if="feedbackMessage" class="alert alert-info mt-3">
                  {{ feedbackMessage }}
                </div>
              </form>
              <button @click="goBack" class="btn btn-secondary w-100 mt-3">Back</button>
            </div>
          </div>
        </div>
      </div>
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
            // Automatically log in the user after successful registration
            this.$store.dispatch('login', {
              email: this.user.email,
              password: this.user.password,
            })
            .then(() => {
              this.feedbackMessage = "User registered and logged in successfully!";
              this.$router.push('/home');
            })
            .catch(err => {
              this.feedbackMessage = "Failed to log in after registration: " + err;
            });
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
.register-page {
  padding-top: 5rem;
  min-height: 100%;
}

.register-container {
  background-color: #2e2e30;
  color: white;
  margin: 0 auto;
  padding: 30px;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

h3 {
  margin-bottom: 20px;
  text-align: center;
  font-family: "911porschav3", sans-serif;
}

.form-control {
  background-color: #1f1f21;
  color: white;
  border: 1px solid #4d4d4f;
}

.form-control:focus {
  background-color: #28282a;
  border-color: #fc3699;
  box-shadow: none;
}

.btn-primary {
  background-color: #fc3699;
  border: none;
}

.btn-primary:hover {
  background-color: #df0056;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.invalid-feedback {
  color: #fc3699;
}
</style>
