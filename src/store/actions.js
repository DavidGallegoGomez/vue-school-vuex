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
  }
}
