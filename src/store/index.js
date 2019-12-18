import Vue from 'vue';
import Vuex from 'vuex';
import shop from '@/api/shop';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // = data
    products: [],
    cart: []
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
          quantity: carItem.quantity++,
        }
      })
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
    }
  }
})