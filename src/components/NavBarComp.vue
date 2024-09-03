<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-transparent position-fixed w-100 sticky-top">
      <div class="container-fluid m-auto">
        <router-link to="/" class="nav-link">
          <img src="https://aneeqbass.github.io/node-eomp-images/techfitLogoBgTransparent.png" class="logo"
            loading="lazy" alt="" />
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
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarComp",
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
  /* Hover color */
}

.router-link-active {
  color: #e21861 !important;
  /* Active link color */
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
</style>