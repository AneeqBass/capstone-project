<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-transparent position-fixed w-100 sticky-top d-flex justify-content-evenly">
      <div class="container-fluid ">
        <router-link to="/" class="nav-link">
          <img src="https://aneeqbass.github.io/fitquip_images/fitbitlogotransparentemblem.png" class="logo"
            loading="lazy" alt="Logo" />
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/stocks" class="nav-link">Stock</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/report" class="nav-link">Report</router-link>
            </li>
          </ul>

          <!-- Profile Section -->
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="profileDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img
                  :src="currentUser.imgUrl || 'https://codjoelmayer.github.io/projectImages/images/profile-Image.png'"
                  alt="Profile" class="rounded-circle profile-img me-2" />
                <span>{{ currentUser.name || 'Guest' }}</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <div v-if="currentUser.name != 'Guest'">
                  <li>
                    <router-link to="/profile" class="dropdown-item">Profile</router-link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                </div>
                <li>
                  <a @click="handleLogout" class="dropdown-item">{{ currentUser.name != "Guest" ? 'Logout' : 'Login'
                    }}</a>
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
      currentUser: {},
    };
  },
  created() {
    this.getUserFromCookies();
  },
  methods: {
    getUserFromCookies() {
      const { cookies } = useCookies();
      const authToken = cookies.get('authToken')
      const currentUser = cookies.get("user"); // Retrieve the currentUser from the cookies
      if (currentUser && authToken) {
        this.currentUser = currentUser; // Set the currentUser data in the component state
      } else {
        this.currentUser = { name: "Guest" }; // Default to guest if no currentUser data is found
      }
    },
    handleLogout() {
      const { cookies } = useCookies();
      cookies.remove("authToken");
      cookies.remove("user");
      this.$store.dispatch("logout");
      this.currentUser = { name: "Guest" }; // Reset currentUser to Guest after logout
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: transparent !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add subtle shadow */
}

.navbar .nav-link {
  color: #333333; /* Changed to dark text for contrast on white */
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
  -webkit-filter: drop-shadow(1px 1px 0 black) drop-shadow(1px 1px 0 black);
  filter: drop-shadow(1px 1px 0 black) drop-shadow(1px 1px 0 black);
}

.navbar-toggler-icon {
  background-color: white; /* Changed to dark for visibility */
}

.profile-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.dropdown-menu {
  background-color: #ffffff; /* Changed to white */
  color: #333333; /* Ensure text is readable */
}

.dropdown-item {
  color: #333333;
}

.dropdown-item:hover {
  background-color: #e21861;
  color: white;
}

</style>
