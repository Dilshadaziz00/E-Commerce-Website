<template>
    <section class="contact-us" >
      <div class="container py-5">
        <h1 class="text-center fw-bold mb-4 text-primary">Get in Touch</h1>
        <p class="text-center text-muted mb-5">
          Have a question or want to know more about our cricket products? Drop us a message, and we'll get back to you!
        </p>
        <div class="row justify-content-center">
            
          <div class="col-lg-6 col-md-8">
            <div v-if="successMessage" class="alert alert-success mt-3 text-center">
                  {{ successMessage }}
                </div>
            <div class="card shadow-lg border-0">
              <div class="card-body p-4">
                <form @submit.prevent="handleSubmit">
                  <div class="mb-4">
                    <label for="name" class="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      v-model="formData.name"
                      :class="{ 'input-error': errors.name }"
                      class="form-control "
                      placeholder="Enter your full name"
                     
                    />
                    <p v-if="errors.name" class="error-text">Please enter your  name</p>

                  </div>
                  <div class="mb-4">
                    <label for="email" class="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      v-model="formData.email"
                       :class="{ 'input-error': errors.email }"
                      class="form-control "
                      placeholder="Enter your email address"
                     
                    />
                    <p v-if="errors.email" class="error-text">Please enter your email</p>

                  </div>
                  <div class="mb-4">
                    <label for="message" class="form-label">Message</label>
                    <textarea
                      id="message"
                      v-model="formData.message"
                      :class="{ 'input-error': errors.message }"
                      class="form-control rounded"
                      rows="5"
                      placeholder="Type your message here..."></textarea>
                <p v-if="errors.message" class="error-text">Please enter your message</p>
                  </div>
                  <div class="d-grid">
                    <button type="submit" class=" submit-btn  fw-bold">
                      Send Message
                    </button>
                  </div>
                </form>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: "",
          email: "",
          message: "",
        },
        errors: {
        name: false,
        email: false,
        message: false,
      },
        successMessage: "",
      };
    },
    methods: {
      handleSubmit() {
        // Simulate an API call
        this.errors = {
        name: false,
        email: false,
        message: false,
      };
      let valid = true;

      if (!this.formData.name) {
        this.errors.name = true;
        valid = false;
      }
      if (!this.formData.email) {
        this.errors.email = true;
        valid = false;
      }
      if (!this.formData.email || !this.validateEmail(this.formData.email)) {
        this.errors.email = true;
        valid = false;
      }
      if (!this.formData.message) {
        this.errors.message = true;
        valid = false;
      }
      if(valid){
          this.successMessage = "Thank you! Your message has been sent successfully.";
          this.formData = { name: "", email: "", message: "" }; 
        setTimeout(() => {
          this.successMessage="";
        }, 2000);
      }
      
      },
      validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    },
  };
  </script>
  
  <style scoped>
  .submit-btn{
    background-color: #000;
  color: #fff;
  padding: 10px 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  }
  .submit-btn:hover{
    
    background-color: #242323;

  }
  .input-error {
  border-color: #dc2626 !important;
}

.error-text {
  color: #dc2626;
  font-size: 14px;
  margin-top: 5px;
}
  .contact-us {
    background: linear-gradient(to bottom, #f8f9fa, #ffffff);
    min-height: 100vh;
  }
  
  .card {
    border-radius: 15px;
  }
  
  .card-body {
    background: #ffffff;
    border-radius: 15px;
  }
  
  .form-control {
    border: 1px solid #ced4da;
    padding: 12px 20px;
  }
  
  .form-control:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  
  
  .text-primary {
    color: #000 !important;
  }
  
  .alert {
    font-weight: bold;
  }
  </style>
  