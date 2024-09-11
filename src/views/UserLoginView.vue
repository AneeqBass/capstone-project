<template>
  <div class="login-page vh-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card login-container">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">{{ user ? 'Welcome' : 'Login' }}</h3>
              <form v-if="!user" @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input v-model="email" type="text" class="form-control" id="email" placeholder="Enter email" required />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter password" required />
                </div>
                <button type="submit" class="btn btn-primary w-100 mb-3">Login</button>
                <router-link to="/register" class="btn btn-link w-100 mb-3">Register</router-link>
              </form>
              <button v-if="user" @click="handleLogout" class="btn btn-danger w-100 mb-3">Logout</button>
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
      email: '',
      password: '',
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;  // Accessing the getter directly
    },
  },
  methods: {
    async handleLogin() {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
      } catch (error) {
        console.error('Login failed:', error.response || error.message);  // Log more detailed error
        alert('Login failed. Please try again.');
      }
    },
    async handleLogout() {
      try {
        await this.$store.dispatch('logout');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  padding-top: 5rem;
  /* Adjusted for navbar height */
}

.login-container {
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

.form-label {
  font-size: 14px;
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

.invalid-feedback {
  color: #fc3699;
}
</style>
