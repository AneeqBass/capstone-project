<template>
  <footer class=" bg-dark text-white" data-aos="fade-up">
    <div class="">
      <div class="row row-cols-auto container text-center justify-content-evenly mx-auto">
        <div class="col">
          <br>
          <h4>Navigation</h4>
          <div class="router-link">
            <router-link class="link-offset-2 link-underline link-underline-opacity-0" to="/"
              active-class="active-link">
              <li>HOME</li>
            </router-link>
            <router-link class="link-offset-2 link-underline link-underline-opacity-0" to="/about"
              active-class="active-link">
              <li>ABOUT</li>
            </router-link>
            <router-link class="link-offset-2 link-underline link-underline-opacity-0" to="/stocks"
              active-class="active-link">
              <li>STOCKS</li>
            </router-link>
            <router-link class="link-offset-2 link-underline link-underline-opacity-0" to="/admin"
              active-class="active-link">
              <li>ADMIN</li>
            </router-link>
          </div>
        </div>
        <div class="col">
          <br>
          <h4>Contact Us</h4>
          <li>Phone: 021 345 6789</li>
          <li>Email: FitQuip@gmail.com</li>
          <li>Location: Cape Town</li>
          <div class="d-flex justify-content-evenly p-2">
            <li><i class="bi bi-facebook"></i></li>
            <li><i class="bi bi-linkedin fa-6x"></i></li>
            <li><i class="bi bi-twitter"></i></li>
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center">
      <div class="row align-items-start">
        <div class="col pt-3">
          <h6><span>&copy;</span>Copyright | FitQuip | All rights reserved</h6>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComp"
}
</script>

<style scoped>
footer {
  padding: 10px;
  text-align: center;
  border-color: transparent;
  position: absolute;
  width: 100%;
}

li {
  -webkit-text-fill-color: white;
  list-style: none;
}

.active-link {
  color: rgb(246, 0, 180, 0.66);
}

#pageSelected:hover {
  background-color: rgb(246, 0, 180, 0.90);
}

li:hover {
  background-color: rgb(246, 0, 180, 0.90);
}

#contactLink {
  height: 20px;
}
</style>