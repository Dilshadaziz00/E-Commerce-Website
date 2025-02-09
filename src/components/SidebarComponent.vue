<template>
  <div class="">
    <div v-if="isSidebarOpen" class="modal-overlay" @click="isSidebarOpen = false"></div>

    <div class="text-center flex-wrap">
      <div @click="toggleSidebar" class="menu-button">
        <b-icon class="menu-icon" icon="list" aria-hidden="true"></b-icon>
      </div>

      <div :class="['sidebar', { 'is-open': isSidebarOpen }]">
        <div class=" bg-dark text-white py-3 d-flex justify-content-between px-3" style="width:100.1% !important">
          <span class="">CA PRO</span>
          <div @click="isSidebarOpen = false">
            <svg style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
              class="bi bi-x" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M1.646 1.646a.5.5 0 0 1 .708 0L8 7.293l5.646-5.647a.5.5 0 0 1 .708.708l-5.647 5.646 5.647 5.646a.5.5 0 0 1-.708.708L8 8.707l-5.646 5.647a.5.5 0 0 1-.708-.708l5.647-5.646-5.647-5.646a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
        <div>
          <ul class="sidebar-links">
            <li>

              <router-link to="/home" class="text-dark text-decoration-none"
                active-class="active-link">Home</router-link>

            </li>


            <li>
              <router-link to="/products" class="text-dark text-decoration-none"
                active-class="active-link">Products</router-link>

            </li>
            <li>

              <router-link to="/about" class="text-dark text-decoration-none" active-class="active-link">About
                us</router-link>
            </li>
            <li>

              <router-link to="/contact" class="text-dark text-decoration-none" active-class="active-link"> Contact
                us</router-link>

            </li>
            <li v-if="getCartIcon">
              <router-link to="/checkout" class="text-dark text-decoration-none" active-class="active-link">Checkout
                Now</router-link>

            </li>
            <li>

              <router-link to="/brand_ambassador/fakhar-zaman" class="text-dark text-decoration-none"
                active-class="active-link">Brand Ambassador</router-link>

            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  computed: {
    ...mapGetters(["getCartIcon"]),

  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },

  },
  mounted() {

  }
};
</script>

<style scoped>
.text-dark:hover {
  color: var(--main-text-color) !important;
  /* color: #f28e65 !important; */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.6);
}

.menu-button {
  cursor: pointer;
}

.menu-icon {
  width: 50px;
  color: #000;
  height: 33px;
}

.active-link {
  color: #ff4c3b !important;
  font-weight: bold;
}

.menu-icon:hover {
  color: #ff4c3b;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -360px;
  width: 350px;
  height: 100%;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: 0.7s ease;

}

.sidebar.is-open {
  left: 0;
}

/* @media (max-width: 768px) {
  .sidebar {
    width: 278px; 
  }
} */

@media (max-width: 480px) {
  .sidebar {
    width: 278px;
  }
}

.sidebar-links {
  list-style: none;
  padding: 0;

}

.sidebar-links li {
  margin: 20px 0;
  cursor: pointer;
  font-size: 26px;
  color: #000;
  text-decoration: none;
  list-style: none;
}

.sidebar-links li:hover {
  color: #ff4c3b;
  text-decoration: none;
  list-style: none;
}
</style>