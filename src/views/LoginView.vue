<!-- src/views/LoginPage.vue -->
<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="text" v-model="email" id="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      // Add your login logic here
      if (this.username && this.password) {
        alert(`Username: ${this.username}\nPassword: ${this.password}`);
      } else {
        alert("Please fill in both fields.");
      }
    },
  },
};
</script>
  
  <style scoped>
.login-container {
  background-color: #2e2e30;
  color: white;
  margin: 100px auto;
  padding: 20px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

h2 {
  margin-bottom: 20px;
  text-align: center;
  font-family: "911porschav3", sans-serif;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #fc3699;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #df0056;
}
</style>
  