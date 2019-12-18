import Vue from 'vue';
import Vuex from 'vuex';
import shop from '@/api/shop';

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
    }
  },
  actions: {
    fetchProducts({commit}) { // = methods
      return new Promise( (resolve) => { // (resolve, reject)
        // make the call...
        // run setProducts mutation
        shop.getProducts( products => {
          commit('setProducts', products)
          resolve()
        })
      })
    },
    addProductToCart(context, product) {
      if (product.inventory > 0) {
        const carItem = context.state.cart.find( item => item.id === product.id )
        if (!carItem) {
          context.commit('pushProductToCart', product.id)
        } else {
          context.commit('incrementItemQuantity', carItem)
        }
        context.commit('decrementProductInventory', product)
      }
    },
    checkout({state, commit}) {
      // buyProducts (products, cb, errorCb)
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    }
  },
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