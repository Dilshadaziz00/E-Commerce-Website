import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    openCheckout: null,
    CartIcon:false
  },
  mutations: {
    setCheckoutMethod(state, method) {
      state.openCheckout = method;
    },
    setCartIcon(state, value)
    {
      state.CartIcon=value.length>0;
    }
  },
  getters: {
    getCartIcon(state)
    {
      return state.CartIcon;
    }
  },
  actions: {
    callbackCheckoutMethod({ state }) {
        if (state.openCheckout) {
            state.openCheckout();
          } else {
            console.error('No method is stored for opening the cart.');
          }
    },
  },
});

export default store;
