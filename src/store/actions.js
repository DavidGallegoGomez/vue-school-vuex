import shop from '@/api/shop';

export default {
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
  // context = {state, getters, commit}
  addProductToCart({state, getters, commit}, product) {
    if (getters.productIsInStock(product)) {
      const carItem = state.cart.find( item => item.id === product.id )
      if (!carItem) {
        commit('pushProductToCart', product.id)
      } else {
        commit('incrementItemQuantity', carItem)
      }
      commit('decrementProductInventory', product)
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
}
