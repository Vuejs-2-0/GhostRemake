<template>
  <div class="product-list">
    <div v-for="product in products" :key="product.id" class="product-item">
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
        <button @click="addToCart(product)">+ 购买</button>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    products: Array,
  },
  methods: {
    addToCart(product) {
      // Handle add to cart logic
    },
  },
};
</script>
