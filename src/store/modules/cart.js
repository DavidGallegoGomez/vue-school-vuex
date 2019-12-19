import shop from '@/api/shop';

export default {
  namespaced: true,
  state: {
    items: [], // DGG: Antes era 'cart'
    checkoutStatus: null
  },
  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map( carItem => {
        // const product = state.items.find( product => product.id === carItem.id ) // DGG: Antes de introducir 'rootState'
        const product = rootState.products.items.find( product => product.id === carItem.id )
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
  },
  actions: {
    // context = {state, getters, commit, rootState, rootGetters}
    addProductToCart({state, commit, rootGetters }, product) {
      // if (getters.productIsInStock(product)) { // DGG: Antes de 'rootGetters'
      if (rootGetters['products/productIsInStock'](product)) {
        const carItem = state.items.find( item => item.id === product.id )
        if (!carItem) {
          commit('pushProductToCart', product.id)
        } else {
          commit('incrementItemQuantity', carItem)
        }
        commit('products/decrementProductInventory', product, {root: true}) // DGG: Para solucionar problemas con namespaces anidados
      }
    },
    checkout({state, commit}) {
      // buyProducts (products, cb, errorCb)
      shop.buyProducts(
        state.items,
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
    // const cartItem = { id: 123, quantity: 2 }
    pushProductToCart(state, productId) {
      state.items.push({
        id: productId,
        quantity: 1
      })
    },
    incrementItemQuantity(state, carItem) {
      carItem.quantity++
    },
    emptyCart(state) {
      state.items = []
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    }
  }
}