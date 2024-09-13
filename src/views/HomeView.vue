<template>
  <div class="home">
    <div class="container">
      <div class="row g-3 mb-5">
        <div class="col-md-6 order-md-1 m-auto">
          <h1 class="text-start">/FitQuip</h1>
          <h6 class="text-start">Streamlining Your Fitness, One Rep at a Time</h6>
          <div class="row gx-5">
            <div class="col">
              <router-link to="/stocks">
                <button type="button" class="btn btn-lg w-100 mb-2">
                  Stocks
                </button>
              </router-link>
            </div>
            <div class="col">
              <router-link to="/about">
                <button type="button" class="btn btn-lg w-100">
                  About
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 order-md-2">
          <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://aneeqbass.github.io/node-eomp-images/apple_watch_6.png"
                  class="img-thumbnail prodImg bg-transparent" alt="" />
              </div>
              <div class="carousel-item">
                <img src="https://aneeqbass.github.io/node-eomp-images/apple_watch_6.png"
                  class="img-thumbnail prodImg bg-transparent" alt="" />
              </div>
              <div class="carousel-item">
                <img src="https://aneeqbass.github.io/node-eomp-images/apple_watch_6.png"
                  class="img-thumbnail prodImg bg-transparent" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 class="text-start">/Stock</h1>
      <div v-if="stocks">
        <div data-aos="fade-left" class="accordion accordion-flush" id="accordionExample">
          <div class="accordion-item bg-transparent with-blur-backdrop border-2 accMarg ">
            <div id="collapseOne" class="accordion-collapse collapse show " data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <div class="card-group card-group-scroll m-auto">
                  <div v-for="stock in stocks()" id="cardBlockWidth"
                    class="card bg-transparent with-blur-backdrop border border-0" :key="stock.id">
                    <div class="container-fluid">
                      <img id="imgSize" :src="stock.imgUrl" class="img-fluid" alt="image" />
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">{{ stock.name }}</h5>
                      <h5 class="card-title">{{ stock.quantity }}</h5>
                      <p class="lead">
                        <span class="text-success">Price</span>:
                        R{{ stock.price }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/SpinnerComp.vue";

export default {
  methods: {
    getStocks() {
      this.$store.dispatch("fetchStocks");
    },
    stocks() {
      return this.$store.state.stocks;
    },

  },
  components: {
    Spinner,
  },
  mounted() {
    // Check if the page has already been reloaded
    if (!localStorage.getItem('reloaded')) {
      // Set flag to indicate the page has been reloaded
      localStorage.setItem('reloaded', 'true');

      // Reload the page
      window.location.reload();
    } else {
      // Remove flag after reloading
      localStorage.removeItem('reloaded');

      this.getStocks();
    }
  },
};
</script>

<style scoped>
.home {
  margin-top: 120px;
  width: 100%;
  background-color: #ffffff; /* Changed to white */
}

#imgSize {
  width: 150px;
  -webkit-filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
  filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
}

.prodImg {
  width: 30rem;
  border: none;
  -webkit-filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
  filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
}

button {
  background-color: transparent;
  color: #000000; /* Changed text color to black for better contrast on white */
  border: 2px solid #000000; /* Changed border color to black */
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out,
    border-color 0.3s ease-in-out;
}

button:hover {
  background-color: #e21861;
  color: white;
  border-color: #e21861;
}

.card-body {
  color: #000000; /* Changed text color to black for better contrast on white */
}

.accordion-item {
  background-color: #ffffff; /* Added white background */
}

.accordion-body {
  color: #000000; /* Changed text color to black for better contrast on white */
}

@media screen and (max-width: 768px) {
  .home {
    margin-top: 140px;
  }
}

</style>