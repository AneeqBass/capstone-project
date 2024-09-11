<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-transparent position-fixed w-100 sticky-top">
      <div class="container-fluid m-auto">
        <router-link to="/" class="nav-link">
          <img src="https://aneeqbass.github.io/fitquip_images/fitbitlogotransparentemblem.png" class="logo"
            loading="lazy" alt="Logo" />
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav m-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/equipment" class="nav-link">Equipment</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/supplements" class="nav-link">Supplements</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin" class="nav-link">Admin</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link">Contact</router-link>
            </li>
          </ul>

          <!-- Profile Section -->
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="profileDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img :src="user.imgUrl || 'https://codjoelmayer.github.io/projectImages/images/profile-Image.png'"
                  alt="Profile" class="rounded-circle profile-img me-2" />
                <span>{{ user.name|| 'Guest' }}</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li>
                  <router-link to="/profile" class="dropdown-item">Profile</router-link>
                </li>
                <li>
                  <router-link to="/settings" class="dropdown-item">Settings</router-link>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a @click="handleLogout" class="dropdown-item">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  name: "NavBarComp",
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.getUserFromCookies();
  },
  methods: {
    getUserFromCookies() {
      const { cookies } = useCookies();
      const user = cookies.get("user"); // Retrieve the user from the cookies
      if (user) {
        this.user = user; // Set the user data in the component state
      } else {
        this.user = { name: "Guest" }; // Default to guest if no user data is found
      }
    },
    handleLogout() {
      const { cookies } = useCookies();
      cookies.remove("authToken");
      cookies.remove("user");
      this.$store.dispatch("logout");
      this.user = { name: "Guest" }; // Reset user to Guest after logout
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: transparent !important;
  backdrop-filter: blur(10px);
}

.navbar .nav-link {
  color: white;
  transition: color 0.3s ease-in-out;
}

.navbar .nav-link:hover {
  color: #e21861;
}

.router-link-active {
  color: #e21861 !important;
}

.logo {
  width: auto;
  height: 100px;
  padding-left: 10px;
  padding-top: 10px;
}

.navbar-toggler-icon {
  background-color: white;
}

.profile-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.dropdown-menu {
  background-color: rgba(255, 255, 255, 0.9);
}

.dropdown-item {
  color: #333;
}

.dropdown-item:hover {
  background-color: #e21861;
  color: white;
}
</style>
