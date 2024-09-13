<template class="w-100">
  <div >
    <NavComp/>
    <router-view/>
    <FooterComp/>
  </div>
</template>
<script>
import NavComp from "@/components/NavBarComp.vue";
import FooterComp from "@/components/FooterComp.vue";
import AOS from "aos"
import "aos/dist/aos.css"

export default {
  components: {
    NavComp,
    FooterComp
  },
  mounted() {
    AOS.init();
  }
};
</script>
<style>
@font-face {
  font-family: '911porschav3';
  src: url('@/assets/fonts/911porschav3.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

img {
  background-color: transparent;
}

html {
  background-color: #ffffff; /* Changed to white */
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000; /* Changed text color to black for better contrast on white */
  background-color: #ffffff; /* Changed to white */
  width: 100%;
  font-family: '911porschav3', sans-serif;
  margin-top: 120px;
}

.with-blur-backdrop {
  background-color: rgba(0, 0, 0, 0);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  height: inherit;
}

.scrolling-wrapper {
  overflow-x: auto;
}

@media (min-width: 576px) {
  .card-group.card-group-scroll {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
}

.card-group.card-group-scroll>.card {
  flex-basis: 35%;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 7.5px;
}

::-webkit-scrollbar {
  width: 7.5px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 7.5px;
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.44, #fd7bbc), color-stop(0.72, #fc3699), color-stop(0.86, #df0056));
}

</style>