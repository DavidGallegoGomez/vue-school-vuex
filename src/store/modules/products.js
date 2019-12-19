import shop from '@/api/shop';

export default {
  namespaced: true,
  state: { // = data
    items: [] // DGG: Antes era 'products'
  },
  getters: { // = computed
    availableProducts(state) {
      return state.items.filter( product => product.inventory > 0 )
    },
    productIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    }
  },
  actions: { // = methods
    fetchProducts({commit}) { // = methods
      return new Promise( (resolve) => { // (resolve, reject)
        // make the call...
        // run setProducts mutation
        shop.getProducts( products => {
          commit('setProducts', products)
          resolve()
        })
      })
    }
  },
  mutations: {
    setProducts(state, products) {
      // update products
      state.items = products
    },
    decrementProductInventory(state, product) {
      product.inventory--
    }
  }
}