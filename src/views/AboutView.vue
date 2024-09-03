<template>
    <div id="about">
      <h1>About Us</h1>
      <div data-aos="fade-left" class="flex-parent about-hero align-content-center">
        <div class="flex-item">
          <img src="https://aneeqbass.github.io/node-eomp-images/uriel-soberanes-MxVkWPiJALs-unsplash.jpg"
            class="about-img1" alt="about-img">
        </div>
        <div class="align-content-center flex-item">
          <p class="about-landing-text">At TechFit, we're passionate about revolutionizing the way people manage and
            enhance their health. Our
            mission is to empower individuals to live healthier, more active lives through innovative wearable technology.
          </p>
        </div>
      </div>
  
      <div  class="about-more">
        <div class="about-more-text">
          <p data-aos="fade-up">
            Our team of experts is dedicated to creating high-quality, reliable devices that not only meet but exceed
            industry standards. We believe in the power of data-driven health management and are committed to providing
            tools that make it easier for you to take control of your health.
          </p>
        </div>
      </div>
  
      <div data-aos="fade-right" class="about-last flex-parent">
        <div class="flex-item first-box">
          <p>Your well-being is our top priority. We’re here to support you on your journey to better health, every step
            of the way.</p>
        </div>
        <div class="flex-item">
          <img src="https://aneeqbass.github.io/node-eomp-images/taan-huyn-rGd_XtozlMU-unsplash.jpg" alt="about-image">
        </div>
      </div>
    </div>
  
  
  
  
  </template>
  
  <style scoped>
  #about {
    margin-top: 120px;
  }
  
  .about-img1 {
    width: 17rem;
    margin: 2rem;
  }
  
  .about-landing-text {
    width: 85%;
    margin: auto;
  
  }
  
  .about-last {
    padding: 2rem;
  }
  
  .first-box {
    align-content: center;
  
    & p {
      width: 80%;
      margin: auto;
    }
  }
  
  .about-more-text {
    position: relative;
    backdrop-filter: blur(7px);
    height: 100%;
    align-content: center;
    color: #fff;
    -webkit-text-stroke: .5px #000;
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
  
  .flex-parent{
    display: flex;
  }
  
  .flex-item{
      width: 50%;
    }
  
  .about-more {
    background-image: url("https://aneeqbass.github.io/node-eomp-images/james-jeremy-beckers-MN-YaI_n95w-unsplash.jpg");
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    height: 100vh;
  }
  
  @media screen and (max-width: 760px) {
    #carouselExampleCrossfade {
      display: none;
    }
  
    .flex-parent {
      display: flex;
      flex-direction: column;
    }
  
    .flex-item{
      width: 100%;
    }
  
    .about-landing-text {
      margin-bottom: 2rem;
      font-size: 1.2rem;
    }
    .about-last :first-child{
    margin-bottom: 2rem;
  }
  }
  
  @media screen and (min-width: 761px) {
    .about-more-text {
      font-size: 2rem;
    }
  }
  </style>