import Vue from 'vue';
import App from './App.vue';
import router from './routes'; 
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import axios from './axios';
Vue.prototype.$axios = axios;
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
// Vue.prototype.$http = axios; 

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
