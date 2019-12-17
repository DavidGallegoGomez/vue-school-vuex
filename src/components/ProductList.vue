<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products" :key="product.title">{{ product.title }} - {{ product.price }}</li>
    </ul>
  </div>
</template>

<script>
import shop from "@/api/shop.js";

export default {
  name: 'ProductList',
  data() {
    return{
      products: []
    }
  },
  created() {
    shop.getProducts( products => { this.products = products } )
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
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
