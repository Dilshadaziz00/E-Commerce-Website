<template>
    <section class="about-us">
      <div class="container py-5">
        <h1 class="text-center fw-bold  mb-4">About Us</h1>
        <p>{{ apiUrl }}</p>
        <p class="text-center text-muted mb-5">
          Welcome to <strong>CA SPORT</strong>, your one-stop shop for all your cricketing needs. We are passionate about providing high-quality equipment for cricket enthusiasts of all levels.
        </p>
  
        <div class="row align-items-center">
          <!-- Image Section -->
          <div class="col-md-6">
            <img
              src="images/cawicket.jpg"
              alt="Cricket Team"
              class="img-fluid rounded shadow"
            />
          </div>
          <!-- Content Section -->
          <div class="col-md-6">
            <h2 class="fw-bold mb-3">Who We Are</h2>
            <p class="text-muted">
              Established in 2024, CA SPORT is a family-run business driven by a love for the sport. From bats and balls to protective gear, we provide everything you need to step onto the pitch with confidence.
            </p>
            <h3 class="fw-bold mt-4">Our Mission</h3>
            <p class="text-muted">
              To inspire cricket players worldwide by offering top-quality equipment and exceptional customer service, helping you achieve your best game.
            </p>
          </div>
        </div>
  
        <div class="row align-items-center mt-5">
          <!-- Content Section -->
          <div class="col-md-6 order-md-2">
            <h2 class="fw-bold mb-3">Why Choose Us?</h2>
            <ul class="list-unstyled text-muted">
              <li class="mb-2">
                <i class="bi bi-check-circle-fill text-danger"></i> Wide range of premium products
              </li>
              <li class="mb-2">
                <i class="bi bi-check-circle-fill text-danger"></i> Expert advice and guidance
              </li>
              <li class="mb-2">
                <i class="bi bi-check-circle-fill text-danger"></i> Affordable pricing for all budgets
              </li>
              <li class="mb-2">
                <i class="bi bi-check-circle-fill text-danger"></i> Fast and reliable delivery
              </li>
            </ul>
          </div>
          <!-- Image Section -->
          <div class="col-md-6 order-md-1">
            <img
              src="images/soft.jpg"
              alt="Cricket Bat"
              class="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {

     data(){
      return{
        apiUrl:process.env.VUE_APP_API_BASE_URL,
      }
     }
  };
  </script>
  
  <style scoped>
  .about-us {
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    min-height: 100vh;
  }
  
  h1,
  h2,
  h3 {
    color: #151515;
  }
  
  .img-fluid {
    max-height: 400px;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
  }
  
  .img-fluid:hover {
    transform: scale(1.05);
  }
  
  .list-unstyled i {
    margin-right: 8px;
  }
  
  .text-muted {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  .bi-check-circle-fill {
    font-size: 1.2rem;
  }
  </style>
  