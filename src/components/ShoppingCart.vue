<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        Product: {{ product.title }} | Price: {{ product.price | currency }} | Quantity: {{ product.quantity }}
      </li>
    </ul>
    <h2>Total: {{ total | currency }}</h2>
    <button @click="checkout()">CheckOut</button>
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'ShoppingCart',
  computed: {
    ...mapState('cart', {
      checkoutStatus: state => state.checkoutStatus // DGG: Para acceder al módulo 'cart'
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotal'
    })
  },
  methods: {
    // ...mapActions(['checkout']) // DGG: No funciona esto...
    ...mapActions('cart', {
      checkout: 'checkout'
    })
  }
  /* computed: {
    products() {
      return this.$store.getters.cartProducts
    },
    total() {
      return this.$store.getters.cartTotal
    }
  } */
}
</script>

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
