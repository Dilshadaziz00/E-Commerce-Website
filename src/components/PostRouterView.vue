<template>
    <div >
      <div>
        <AnnouncementBar />
      </div>
      <div>
        <NavbarComponent />
        <AddCart  ref="addToCart"/> 
      </div>
      <div style="margin-top: 142px;">
        <router-view></router-view>
        <div class="">
        
        </div>
      </div>
      <div>
        <FooterComponent />
      </div>
    </div>
  </template>
  
  <script>
  import FooterComponent from './FooterComponent.vue';
  import AnnouncementBar from './AnnouncementBar.vue';
  import NavbarComponent from './NavbarComponent.vue';
  import AddCart from './AddtoCart.vue';

  export default {
    name: 'App',
    components: {
      AnnouncementBar,
      NavbarComponent,
      AddCart,
      FooterComponent,
    },
    data() {
      return {
      };
    },
    methods: {
      openSideCart(){    
        this.$refs.addToCart.openSideCart()
      },
  
    },
    provide() {
      return {
        openSideCart:this.openSideCart,
      };
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  :root{
    --accent: #0b9b8a;
  }
  </style>
  