<template>
  <div>
    <div class="product-card flex justify-center items-center p-4 bg-white">
      <h3 class="font-bold pl-4 text-[36px]">友鬼系列</h3>
    </div>

    <div class="featured-product p-4 m-4 bg-white border border-purple-500 rounded-lg relative flex flex-col items-center">
      <span class="absolute top-2 right-2 text-purple-500 border border-purple-500 rounded-full px-2 py-1 text-sm">全新</span>
      <img src="/img/temporaryimg.png" alt="Featured Product Image" class="w-[120px] h-[175px] mt-6 object-cover"/>
      <div class="flex justify-between items-center w-full mt-4">
        <h3 class="text-[24px] font-semibold">真的友鬼 7</h3>
        <p class="text-[16px]">RM 25</p>
      </div>
      <Button class="bg-purple-500 text-white py-2 px-4 rounded mt-4 w-full h-[54px] text-[24px]">
        <p>添加至购物车</p>
      </Button>
    </div>

    <div v-for="product in products" :key="product.id" class="product-card flex justify-between items-center p-4 bg-white">
      <img :src="product.img" alt="Product Image" class="w-16 h-16 rounded"/>
      <div class="product-info flex-grow ml-4">
        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
        <p class="text-sm text-gray-500">{{ product.price }}</p>
      </div>
      <div class="actions flex space-x-2">
        <Details :product="product" />
        <Button @click="increaseQuantity(product.id)" class="primary buy-btn bg-purple-500 text-white py-1 px-2 rounded hover:bg-purple-700">
          <p>+ 购买</p>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Details from './Details.vue';
import { Button } from '@/components/ui/button';
import { addQuantity, cart} from '@/stores/cart'
import { useStore } from '@nanostores/vue';

const $cart = useStore(cart);
const products = computed(() => $cart.value.items);

const increaseQuantity = (productid: number) => {
  addQuantity(productid);
};

const cartQuantity = ref(0);

</script>

<style scoped>
.featured-product {
  max-width: 350px;
  margin: 0 auto;
}
</style>
