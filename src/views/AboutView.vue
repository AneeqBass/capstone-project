<template>
  <div id="about">
    <h1>About Us</h1>
    <div data-aos="fade-left" class="flex-parent about-hero align-content-center">
      <div class="flex-item">
        <img src="https://aneeqbass.github.io/fitquip_images/edgar-chaparro.jpg"
          class="about-img1" alt="about-img">
      </div>
      <div class="align-content-center flex-item">
        <p class="about-landing-text">FitQuip is a state-of-the-art inventory management system designed specifically
          for the fitness industry. Whether you’re managing a gym, a supplement store, or a fitness equipment supplier,
          FitQuip offers a comprehensive solution to streamline your inventory processes
        </p>
      </div>
    </div>

    <div class="about-more">
      <div class="about-more-text">
        <p data-aos="fade-up">
          Our platform provides real-time tracking of fitness equipment and supplements, helping you maintain optimal
          stock levels and reduce the risk of overstocking or stockouts. With user-friendly features for managing
          orders, sales, and inventory updates, FitQuip empowers you to focus on what matters most—serving your
          customers and growing your business
        </p>
      </div>
    </div>

    <div data-aos="fade-right" class="about-last flex-parent">
      <div class="flex-item first-box">
        <p>Experience seamless integration with your existing workflows and enjoy enhanced efficiency with FitQuip’s
          intuitive interface and robust functionality. Elevate your inventory management and keep your fitness business
          running smoothly with FitQuip</p>
      </div>
      <div class="flex-item">
        <img src="https://aneeqbass.github.io/fitquip_images/alexander-jawfox.jpg" alt="about-image">
      </div>
    </div>
  </div>




</template>

<style scoped>
#about {
  margin-top: 120px;
  background-color: #ffffff; /* Added white background */
}

.about-img1 {
  width: 17rem;
  margin: 2rem;
}

.about-landing-text {
  width: 85%;
  margin: auto;
  color: #000000; /* Updated text color to black for better contrast on white */
}

.about-last {
  padding: 2rem;
  background-color: #ffffff; /* Added white background */
}

.first-box {
  align-content: center;

  & p {
    width: 80%;
    margin: auto;
    color: #000000; /* Updated text color to black for better contrast on white */
  }
}

.about-more-text {
  position: relative;
  backdrop-filter: blur(7px);
  height: 100%;
  align-content: center;
  color: #000000; /* Updated text color to black for better contrast on white */
  -webkit-text-stroke: .5px #ffffff; /* Updated text stroke to white */
  letter-spacing: 1px;

  & p {
    width: 80%;
    margin: auto;
    font-size: 1.1rem;
  }
}

img[alt="about-image"] {
  width: 18rem;
}

.flex-parent {
  display: flex;
}

.flex-item {
  width: 50%;
}

.about-more {
  background-image: url("https://aneeqbass.github.io/fitquip_images/victor-freitas.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 100vh;
  background-color: #ffffff; /* Added white background to ensure consistency */
}

@media screen and (max-width: 760px) {
  #carouselExampleCrossfade {
    display: none;
  }

  .flex-parent {
    display: flex;
    flex-direction: column;
  }

  .flex-item {
    width: 100%;
  }

  .about-landing-text {
    margin-bottom: 2rem;
    font-size: 1.2rem;
  }

  .about-last :first-child {
    margin-bottom: 2rem;
  }
}

@media screen and (min-width: 761px) {
  .about-more-text {
    font-size: 2rem;
  }
}

</style>