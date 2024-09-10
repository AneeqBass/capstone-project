<template>
  <div class="vh-100">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin" class="needs-validation" novalidate>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" v-model="email" id="email" class="form-control" required />
          <div class="invalid-feedback">Please enter a valid email.</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" id="password" class="form-control" required />
          <div class="invalid-feedback">Please enter your password.</div>
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      this.$store.dispatch("login", { email: this.email, password: this.password });
    },
  },
};
</script>

<style scoped>
.login-page {
  padding-top: 3rem; /* Adjust this value to match the height of your fixed navbar */
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

h2 {
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
