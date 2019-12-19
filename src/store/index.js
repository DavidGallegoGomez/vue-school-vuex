import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    products: [],
    cart: [],
    checkoutStatus: null
  },
  getters: { // = computed properties
    availableProducts(state) {
      return state.products.filter( product => product.inventory > 0 )
    },
    cartProducts(state) {
      return state.cart.map( carItem => {
        const product = state.products.find( product => product.id === carItem.id )
        return{
          title: product.title,
          price: product.price,
          quantity: carItem.quantity,
        }
      })
    },
    cartTotal(state, getters) {
      let total = 0
      getters.cartProducts.forEach( product => {
        total += product.price * product.quantity
      })
      return total
    },
    productIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    }
  },
  actions,
  mutations: {
    setProducts(state, products) {
      // update products
      state.products = products
    },
    // const cartItem = { id: 123, quantity: 2 }
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(state, carItem) {
      carItem.quantity++
    },
    decrementProductInventory(state, product) {
      product.inventory--
    },
    emptyCart(state) {
      state.cart = []
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    }
  }
})