/* eslint-disable no-undef */
import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from './components/NotFound.vue';
import Login from './components/LoginComponent.vue'
import Home from './components/HomeComponent.vue';
import AboutUs from './components/AboutUs.vue';
import PostRouterView from './components/PostRouterView.vue';
import ContactUs from './components/ContactUs.vue';
import PlaceOrder from './components/PlaceOrder.vue';
import AllProducts from './components/AllProducts.vue';



Vue.use(VueRouter);
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login', auth: false },
  },
  {
    path: '',
    name: 'home',
    component: PostRouterView,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'home',
        component: Home
      },

      {
        path: '/about',
        name: 'about',
        component: AboutUs,
      },
      {
        path: '/contact',
        name: 'contact',
        component: ContactUs,
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: PlaceOrder,
      },
      {
        path: '/products',
        name: 'products',
        component: AllProducts,

      },
      {
        path: '/products/:id',
        name: 'products',
        component: AllProducts,
        props: true,
        beforeEnter: (to, from, next) => {
          const validCategories = ['bats', 'balls', 'kits', 'shoes', 'accessories'];
          validCategories.includes(to.params.id)
            ? next()
            : next({ name: 'NotFound' });
        }
      },
      {
        path: '*',
        name: 'NotFound',
        component: NotFound,
      }

    ],
    meta: { title: 'home', auth: true },

  },


];
const router = new VueRouter({
  mode: 'history',
  routes,
});

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('demoUserToken');

//   // if (to.meta.auth) {
//   //   if (!token) {
//   //     if (!to.meta.auth) {
//   //       next();
//   //     }
//   //     else {
//   //       // Stay on the login page
//   //       next({ name: 'Login' });
//   //     }
//   //   } else {

//   //     next();
//   //   }
//   // } else {
//   //   if (token)
//   //     next({ name: 'home' });

//   //   next();
//   // }
// });

export default router;