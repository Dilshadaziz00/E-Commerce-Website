<template>
  <div>
    <footer class="footer ">
      <div class="container-fluid">
        <div class="row ">

          <!-- 1st -->
          <div class="col-12 col-md-4">
            <div class="text-start">
              <img src="https://thecasports.com/assets/images/24-bit.png" alt="Logo"
                class="img-fluid w-md page_speed_707773726" style=" width: 80px">
            </div>
            <div class="text-start mt-3">
              <p style="line-height: 42px;
                   letter-spacing: 0.03em;">Initially a cricket bat manufacturing company and now a dominant international cricket
                brand with footprints in all cricket playing countries and beyond. Manufacturers and sellers of their
                own brand CA Pro which is 60 years old brand that offers a comprehensive range of cricket gears,
                sportswear, and sports shoes through conventional retail and e-commerce facilities in Pakistan and the
                rest of the world.</p>
            </div>
            <div class="social-icons text-start d-flex gap-4 mt-5">
              <b-icon icon="facebook" @click="navigateTo('facebook')" class="social-icon" aria-hidden="true"></b-icon>
              <b-icon icon="linkedin" @click="navigateTo('linkedin')" class="social-icon" aria-hidden="true"></b-icon>
              <b-icon icon="youtube" @click="navigateTo('youtube')" class="social-icon" aria-hidden="true"></b-icon>
              <b-icon icon="twitter" @click="navigateTo('twitter')" class="social-icon" aria-hidden="true"></b-icon>
            </div>
          </div>
          <!-- 2nd -->
          <div class="col-12 col-md-4 d-flex align-items-md-start justify-content-md-center">
            <div class="text-start mt-md-0 my-3">
              <h2>Why We Choose</h2>
            <ul class="list-unstyled ">
              <li  ><a href="#">RETURNS & EXCHANGE</a></li>
              <li ><a href="#">SHIPPING & HANDLING</a></li>
              <li ><a href="#">Terms and Conditions</a></li>
              <li ><a href="#">Privacy Policy</a></li>
              <li ><a href="#">Size Charts</a></li>
              <li ><a href="#">About Us</a></li>
              <li ><a href="#">Terms and Conditions</a></li>
              <li ><a href="#">Bat Warranty</a></li>
            </ul>
          </div>
          </div>
          

          <!-- 3rd -->
          <div class="col-12 col-md-4 d-flex align-items-md-start justify-content-md-center">
            <div class="text-start mt-md-0 my-3">
           
              <h2 class="">About CA PRO</h2>
            <ul class="list-unstyled">
              <li ><a href="#">Contact</a></li>
              <li><a href="#">Customer Care</a></li>
              <li><a href="#">Media</a></li>
              <li><a href="#">Blogs</a></li>
              <li><a href="#">About us</a></li>
            </ul>
          </div>
          </div>
         
        </div>
      </div>

    </footer>
    <div class="p-2 bg-light"> <p class="text-center text-muted my-2"> 2024 CA Pro ( PVT.LTD ). All rights reserved. Created by: Dilshad Aziz</p></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    navigateTo(page) {
      // Implement navigation logic (e.g., using Vue Router)
      console.log(`Navigating to ${page}`);
      // this.$router.push({ name: page });
    },
    sendMessage() {
      if (this.email) {
        console.log(`Sending message to: ${this.email}`);
        // Implement your send message logic here
        this.email = ''; // Clear input after sending
      } else {
        alert('Please enter a valid email address.');
      }
    },
  },
};
</script>

<style scoped>
li a{
  list-style: none;
  text-decoration: none;

  color: #fff;
 
}
li{
  padding-top: 13px !important;
}
li a:hover{
  color: #ff4c3b;
}
.footer {
  background-color: #000;
  color: white;
  padding: 50px 30px 20px 30px;
  text-align: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-title {
  margin-bottom: 10px;
}

.footer-links {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

.footer-links li {
  margin: 0 15px;
  cursor: pointer;
}

.footer-links li:hover {
  text-decoration: underline;
}

.email-subscription {
  margin: 20px 0;
}

.email-input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
}

.send-button {
  padding: 10px 15px;
  background-color: white;
  color: #0b9b8a;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #d4d4d4;
}

.social-icons {
  margin-top: 15px;
  font-size: 30px;
}

.social-icon {
  margin: 0 10px;
  color: white;
  cursor: pointer;
}

.social-icon:hover {
  opacity: 0.8;
  color: #ff4c3b;
}
</style>