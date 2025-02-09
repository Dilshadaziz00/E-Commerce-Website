<template>
  <div>
    <div class="main-nav d-flex fixed-top py-3 flex-wrap" style="margin-top: 50px">
      <div class="menu-icon">
        <SidebarComponent />
      </div>
      <div class="logo d-flex  justify-content-center  align-items-center flex-wrap ms-md-5 ms-0">
        <img src="https://thecasports.com/assets/images/24-bit.png" alt="Logo"
          class="img-fluid w-md page_speed_707773726" style=" width: 50px">
        <span class="mx-1 fs-1  font-weight-600">SPORTS</span>
      </div>

      <div class="icons d-flex gap-2 justify-content-between">

  <div class="counter-parent"  @click="openSideCart()">
  <b-icon icon="cart-fill" aria-hidden="true" title="Your Cart" class="icon"></b-icon>
  <span class="counter" v-if="getCartIcon">
    <span class="ping"></span>
  </span>
</div>

        <div class="d-none d-sm-block">
          <b-icon icon="facebook" aria-hidden="true" class="icon"></b-icon>
        </div>
        <div  class="d-none d-sm-block" >
          <b-icon icon="heart-fill" aria-hidden="true" class="icon"></b-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import SidebarComponent from './SidebarComponent.vue';

export default {
  components: {
    SidebarComponent
  },
  inject: ['openSideCart'],
  data() {
    return {

    }

  },
  watch: {

  },
  computed: {
    ...mapGetters(["getCartIcon"]),

  },
  methods: {
    ...mapMutations(["setCartIcon"]),
    ShoWme() {
      let parsedCartLength = []
      const savedCart = localStorage.getItem('item');
      if (savedCart) {
        parsedCartLength = JSON.parse(savedCart);
        this.setCartIcon(parsedCartLength)
      }

    }
  },
  mounted() {
    this.ShoWme()
  }

};
</script>

<style scoped>
.counter-parent {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.counter {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #ff4c3b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.counter::before {
  cursor: pointer;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ff4c3b;
  border-radius: 50%;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  opacity: 0.75;
}

@keyframes ping {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
@media screen and (max-width: 576px) { 
  .logo  {
    width: 28px !important;
  }
  .logo span {
    font-size: 12px !important;
  }
}


.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fefefe;
  padding: 0 20px;
  z-index: 2;
}


.icon:hover {
  color: #ff4c3b;
}

.nike-logo {
  width: 90px;
}

b-icon {
  width: 1rem !important;
  height: 1.5rem !important;
}

.icon {
  color: #000;
  margin-left: 15px;
  font-size: 24px;
  cursor: pointer;
}
</style>