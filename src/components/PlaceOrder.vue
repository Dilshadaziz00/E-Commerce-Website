<template>
  <div class="order-now">
    <h1 class="title">Order Your Cricket Gear Now!</h1>

    <div class="order-container">
      <!-- Left: Form Section -->
      <div class="form-section">

        <h2 class="section-title">Billing Details</h2>
        <div v-if="successMessage" class="alert alert-success mt-3 text-center mt-5">
          {{ successMessage }}
        </div>
        <form @submit.prevent="validateForm" class="text-start" :class="{ 'd-none': hideForm }">
          <div class="mb-4">
            <label for="first-name">First Name*</label>
            <input type="text" id="first-name" v-model="form.firstName" :class="{ 'input-error': errors.firstName }"
              placeholder="Enter your first name" />
            <p v-if="errors.firstName" class="error-text">Please enter your first name</p>
          </div>

          <div class="mb-4">
            <label for="last-name">Last Name*</label>
            <input type="text" id="last-name" v-model="form.lastName" :class="{ 'input-error': errors.lastName }"
              placeholder="Enter your last name" />
            <p v-if="errors.lastName" class="error-text">Please enter your last name</p>
          </div>

          <div class="mb-4">
            <label for="email">Email Address*</label>
            <input type="email" id="email" v-model="form.email" :class="{ 'input-error': errors.email }"
              placeholder="Enter your email address" />
            <p v-if="errors.email" class="error-text">Please enter a valid email</p>
          </div>

          <div class="mb-4">
            <label for="phone">Phone Number*</label>
            <input type="text" id="phone" v-model="form.phone" :class="{ 'input-error': errors.phone }"
              placeholder="Enter your phone number" />
            <p v-if="errors.phone" class="error-text">Please enter a valid phone number</p>
          </div>

          <div class="mb-4">
            <label for="address">Street Address*</label>
            <textarea id="address" v-model="form.address" :class="{ 'input-error': errors.address }"
              placeholder="Enter your street address"></textarea>
            <p v-if="errors.address" class="error-text">Please enter your street address</p>
          </div>

          <div class="mb-4">
            <label for="city">Town / City*</label>
            <input type="text" id="city" v-model="form.city" :class="{ 'input-error': errors.city }"
              placeholder="Enter your town or city" />
            <p v-if="errors.city" class="error-text">Please enter your town or city</p>
          </div>
          <div class="d-grid ">
            <button type="submit" class="btn-submit fw-bold">
              Submit
            </button>
          </div>
        </form>

      </div>

      <!-- Right: Order Summary -->
      <div class="order-summary">
        <h2 class="section-title">Your Order</h2>
        <div class="product-details" v-if="!orderMessage">
          <div>
            <div class="product-item   d-flex flex-wrap justify-content-between" v-for="item in LocalItems" :key="item.id">
              <div class="d-flex product-item">
                <div>

                  <img :src="`/${item.image}`" alt="" class="" style="width: 50px;">
                </div>
                <span class="product-name px-3 mt-3">{{ item.name }}</span>

              </div>
              <div class="mt-3">
                <span class="product-price px-5" title="Quantity">({{ item.quantity }})</span>
                <span class="product-price ">Rs {{ item.price }}</span>
              </div>
            </div>
          </div>
          <div class="order-total  text-end">
            <span>TOTAL : </span>
            <span class="total-price ms-3">Rs {{ TotalPrice }}</span>
          </div>
        </div>
        <div class="shipping-details">
          <p>Shipping: Flat Rate</p>
          <p>Payment: Cash on Delivery</p>
        </div>
        <div v-if="orderMessage" class="alert alert-success mt-3 text-center mt-5">
          {{ orderMessage }}
        </div>
        <div class="d-grid w-100">

          <button @click="changeRoute" type="submit" class=" w-100  btn-disabled"
            :class="{ 'btn-submit': formSubmitted }" :disabled="!formSubmitted">
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {

  data() {
    return {
      LocalItems: [],
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
      },
      orderMessage: "",
      successMessage: "",
      formSubmitted: false,
      hideForm: false,
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        address: false,
        city: false,

      },
    };
  },
  computed: {


    TotalPrice() {
      return this.LocalItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
  methods: {
    ...mapMutations(['setCheckoutMethod', 'setCartIcon']),
    Items() {
      let data = localStorage.getItem('item');
      this.LocalItems = data ? JSON.parse(data) : [];
      if (this.LocalItems.length <= 0) {
        setTimeout(() => {
          if (this.$route.path !== '/home') {
            this.$router.push('/home');
          }
        }, 1000);
      }
    },
    changeRoute() {
      this.orderMessage = "Thank you Your order is done."
      setTimeout(() => {
        localStorage.removeItem('item');
        this.setCartIcon([]);
        this.$router.push("/home");
      }, 2000);
    },
    validateForm() {
      this.errors = {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        address: false,
        city: false,
      };
      let valid = true;

      if (!this.form.firstName) {
        this.errors.firstName = true;
        valid = false;
      }
      if (!this.form.lastName) {
        this.errors.lastName = true;
        valid = false;
      }
      if (!this.form.email || !this.validateEmail(this.form.email)) {
        this.errors.email = true;
        valid = false;
      }
      if (!this.form.phone) {
        this.errors.phone = true;
        valid = false;
      }
      if (!this.form.address) {
        this.errors.address = true;
        valid = false;
      }
      if (!this.form.city) {
        this.errors.city = true;
        valid = false;
      }

      if (valid) {
        this.successMessage = "Thank you! Your form Submit successfully!. Please  place order now .!";
        this.form = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
        };

        this.hideForm = true;
        setTimeout(() => {
          this.formSubmitted = true;
        }, 1000);
      }
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

  },
  mounted() {
    this.Items();
    this.setCheckoutMethod(this.Items)
  }
};
</script>
<style scoped>
/* General Layout */
@media screen  and (max-width: 400px) {
 .product-item{
    display: flex ;
    flex-direction: column !important;
    justify-content: space-between;
  }
}
.order-now {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.title {
  color: #151515;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
}

.order-container {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.form-section,
.order-summary {
  width: 48%;
}

.section-title {
  color: #151515;
  margin-bottom: 15px;
  font-size: 24px;
  font-weight: bold;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #374151;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  font-size: 16px;
  color: #111827;
  transition: border 0.3s;
}

input:focus,
textarea:focus {
  border-color: #2563eb;
  outline: none;
}

.input-error {
  border-color: #dc2626;
}

.error-text {
  color: #dc2626;
  font-size: 14px;
  margin-top: 5px;
}

.btn-submit:hover {
  background-color: #242323;
}

.btn-disabled {
  background-color: #625f5f;
  color: #fff;
  padding: 10px 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: not-allowed;
}

.btn-submit {
  background-color: #000;
  color: #fff;
  padding: 10px 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;

}
.product-details {
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
}
.order-total {
  font-weight: bold;
  margin-top: 20px;
}

.shipping-details {
  margin-top: 20px;
  font-size: 14px;
  color: #6b7280;
}

@media (max-width: 768px) {
  .order-container {
    flex-direction: column;
    gap: 20px;
  }

  .form-section,
  .order-summary {
    width: 100%;
  }
}
</style>