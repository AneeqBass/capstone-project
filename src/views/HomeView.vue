<template>
    <div class="home">
      <div class="container text-white">
        <form
          action="https://formspree.io/f/mgvwwenn"
          class="row g-3 mb-5"
          method="POST"
          target="_blank"
        >
          <div class="col-md-6 order-md-1 m-auto">
            <h1 class="text-start">/TechFit</h1>
            <h6 class="text-start">Wear the Future, Own Your Potential.</h6>
            <div class="row gx-5">
              <div class="col">
                <router-link to="/about"
                  ><button type="button" class="btn btn-lg w-100 mb-2">
                    About
                  </button></router-link
                >
              </div>
              <div class="col">
                <router-link to="/products"
                  ><button type="button" class="btn btn-lg w-100">
                    Products
                  </button></router-link
                >
              </div>
            </div>
          </div>
          <div class="col-md-6 order-md-2">
            <img
              src="https://aneeqbass.github.io/node-eomp-images/apple_watch_6.png"
              class="img-thumbnail prodImg bg-transparent"
              alt=""
            />
          </div>
        </form>
        <h1 class="text-start">/Products</h1>
        <div v-if="products">
          <div
            data-aos="fade-left"
            class="accordion accordion-flush"
            id="accordionExample"
          >
            <div
              class="accordion-item bg-transparent with-blur-backdrop border-2 accMarg "
            >
              <div
                id="collapseOne"
                class="accordion-collapse collapse show "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div class="card-group card-group-scroll m-auto">
                    <div
                      v-for="product in products()"
                      id="cardBlockWidth"
                      class="card bg-transparent with-blur-backdrop border border-0"
                      :key="product.prodID"
                    >
                      <div class="container-fluid">
                        <img
                          id="imgSize"
                          :src="product.prodURL"
                          class="img-fluid"
                          alt="image"
                        />
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">{{ product.prodName }}</h5>
                        <h5 class="card-title">{{ product.category }}</h5>
                        <p class="lead">
                          <span class="text-success">Amount</span>:
                          R{{ product.amount }}
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
      getProducts() {
        this.$store.dispatch("fetchProducts");
      },
      products() {
        return this.$store.state.products;
      },
    },
    components: {
      Spinner,
    },
    mounted() {
      this.getProducts();
    },
  };
  </script>
  
  <style scoped>
  .home {
    margin-top: 120px;
    width: 100%;
  }
  
  #imgSize {
    width: 150px;
    -webkit-filter: drop-shadow(2px 2px 0 #e21861)
      drop-shadow(-2px -2px 0 #e21861);
    filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
  }
  .prodImg {
    width: 30rem;
    border: none;
    -webkit-filter: drop-shadow(2px 2px 0 #e21861)
      drop-shadow(-2px -2px 0 #e21861);
    filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
  }
  
  button {
    background-color: transparent;
    color: white;
    border: 2px solid black;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out,
      border-color 0.3s ease-in-out;
  }
  
  button:hover {
    background-color: #e21861;
    color: white;
    border-color: #e21861;
  }
  
  .card-body {
    color: white;
  }
  
  @media screen and (max-width: 768px){
    .home{
      margin-top: 140px;
    }
  }
  </style>