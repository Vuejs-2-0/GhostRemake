<template>
  <div class="product-card flex justify-center items-center p-4 bg-white">
    <h3 class="font-bold pl-4 text-[36px]">友鬼系列</h3>
  </div>
  
  <div class="featured-product p-4 m-4 bg-white border border-purple-500 rounded-lg relative flex flex-col items-center">
    <span class="absolute top-2 right-2 text-purple-500 border border-purple-500 rounded-full px-2 py-1 text-sm">全新</span>
    <img src="/img/temporaryimg.png" alt="Featured Product Image" class="w-[120px] h-[175px] mt-6"/>
    <div class="flex justify-between items-center w-full mt-4">
      <h3 class="text-[24px] font-semibold">真的友鬼 7</h3>
      <p class="text-[16px]">RM 25</p>
    </div>
    <button class="bg-purple-500 text-white py-2 px-4 rounded mt-4 w-[329px] h-[54px] text-[24px]">添加至购物车</button>
  </div>

  <div v-for="product in products" :key="product.id" class="product-card flex justify-between items-center p-4  bg-white">
    <img :src="product.img" alt="Product Image" class="w-16 h-16 rounded"/>
    <div class="product-info flex-grow ml-4">
      <h3 class="text-lg font-semibold">{{ product.name }}</h3>
      <p class="text-sm text-gray-500">{{ product.price }}</p>
    </div>
    <div class="actions flex space-x-2">
      <button class="details-btn text-blue-500 underline pr-3">详情</button>
      <button class="buy-btn bg-purple-500 text-white py-1 px-2 rounded hover:bg-purple-700">+ 购买</button>
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

<style scoped>
.featured-product {
  max-width: 350px;
  margin: 0 auto;
}
</style>