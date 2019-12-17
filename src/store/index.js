import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

new Vuex.Store({
  state: { // = data
    products: []
  },
  getters: { // = computed properties
    productsCount() {
      return this.products.length
    }
  },
  actions: {
    fetchProducts() {
      // make the call...
    }
  },
  mutations: {
    setProducts() {
      // update products
    }
  }
})