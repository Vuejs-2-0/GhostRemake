<template>
  <div class="product-list mx-auto max-w-md border border-gray-300 rounded-lg overflow-hidden">
    <div class="product-card flex items-center p-4 border-b border-gray-300 bg-white">
      <img src="/img/ghostBook.png" alt="Ghost Book" class="w-16 h-16"/>
      <h3 class="font-semibold pl-4 text-2xl">真的有鬼</h3>
    </div>
    <div v-for="product in products" :key="product.id" class="product-card flex justify-between items-center p-4 border-b border-gray-300 bg-white">
      <img :src="product.img" alt="Product Image" class="w-16 h-16 rounded"/>
      <div class="product-info flex-grow ml-4">
        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
        <p class="text-sm text-gray-500">{{ product.price }}</p>
      </div>
      <div class="actions flex space-x-2">
        <button class="details-btn text-blue-500 hover:underline">详情</button>
        <button class="buy-btn bg-purple-500 text-white py-1 px-2 rounded hover:bg-purple-700">+ 购买</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      products: [
        { id: 1, name: '真的友鬼 1', price: 'RM 25.00', img: '/img/profile.png' },
        { id: 2, name: '真的友鬼 2', price: 'RM 25.00', img: '/img/profile.png' },
        { id: 3, name: '真的友鬼 3', price: 'RM 25.00', img: '/img/profile.png' },
        { id: 4, name: '真的友鬼 4', price: 'RM 25.00', img: '/img/profile.png' },
        { id: 5, name: '真的友鬼 5', price: 'RM 25.00', img: '/img/profile.png' },
        { id: 6, name: '真的友鬼 6', price: 'RM 25.00', img: '/img/profile.png' },
        { id: 7, name: '手镯', price: 'RM 25.00', img: '/img/profile.png' }
      ]
    };
  }
};
</script>
