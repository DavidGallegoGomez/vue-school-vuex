<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" alt="loading spinner" />
    <ul v-if="!loading">
      <li v-for="product in products" :key="product.id">
        Product: {{ product.title }} | Price: {{ product.price | currency }} | Inventory: {{ product.inventory }}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >
          Add To Cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'ProductList',
  data () {
    return {
      loading: false
    }
  },
  computed:{
    ...mapState('products', {
      products: state => state.items // DGG: Para acceder al módulo 'products'
    }),
    ...mapGetters('products', {
      productIsInStock: 'productIsInStock'
    })
  },
  /* computed: {
    products() {
      // return this.$store.getters.availableProducts
      return this.$store.state.products
    },
    productIsInStock() {
      return this.$store.getters.productIsInStock
    }
  }, */
  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      addProductToCart: 'cart/addProductToCart'
    })
  },
  /* methods: {
    addProductToCart(product) {
      this.$store.dispatch('addProductToCart', product)
    }
  }, */
  created() {
    this.loading = true
    this.fetchProducts()
      .then( () => this.loading = false )
      .catch( error => console.log(error) )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}
li {
  display: inline-block;
  margin: 0 10px;
  padding-bottom: 10px
}
a {
  color: #42b983;
}
</style>
