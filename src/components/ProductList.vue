<template>
  <div>
    <div class="product-card flex justify-center items-center p-4 bg-white">
      <h3 class="font-bold pl-4 text-[36px]">友鬼系列</h3>
    </div>

    <div class="featured-product p-4 m-4 bg-white border border-purple-500 rounded-lg relative flex flex-col items-center">
      <span class="absolute top-2 right-2 text-purple-500 border border-purple-500 rounded-full px-2 py-1 text-sm">全新</span>
      <img src="/img/temporaryimg.webp" alt="Featured Product Image" class="w-[120px] h-[175px] mt-6 object-cover"/>
      <div class="flex justify-between items-center w-full mt-4">
        <h3 class="text-[24px] font-semibold">真的友鬼 7</h3>
        <p class="text-[16px]">RM 25</p>
      </div>
      <Button @click="increaseQuantity(products[6].id)" class="bg-purple-500 text-white py-2 px-4 rounded mt-4 w-full h-[54px] text-[24px]">
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
        <Dialog>
          <DialogTrigger>
            <Button class="bg-white hover:bg-white details-btn text-blue-500 underline pr-3">详情</Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <div class="grid gap-4 py-4 overflow-y-auto px-6">
              <img src="img/temporaryimg.png" alt="Product Image" class="w-48 h-60 mb-4 mx-auto object-cover" />
              <DialogTitle class="text-[25px] text-center">{{ product.name }}</DialogTitle>
              <DialogDescription class="text-[18px] text-center">
                {{ product.price }}
              </DialogDescription>
              <p class="text-md mt-2 text-center">{{ product.description }}</p>
              <div class="flex items-center justify-center mt-4 space-x-8">
                <button v-if="product.quantity > 0" @click="decreaseQuantity(product.id)" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded-full">-</button>
                <span v-if="product.quantity > 0" class="text-[35px] ">{{ product.quantity }}</span>
                <button v-if="product.quantity > 0" @click="increaseQuantity(product.id)" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded-full">+</button>
                <Button v-if="product.quantity == 0" @click="addToCart(product.id)"  class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full text-[20px] h-full font-medium">添加至购物车</Button>
              </div>
            
              <Button v-if="product.quantity > 0" @click="buyToCart(product.quantity, product.name)" class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full text-[20px] h-full font-medium">购买</Button>
            </div>
            </DialogContent>
        </Dialog>
        <Button @click="increaseQuantity(product.id)" class="primary buy-btn bg-purple-500 text-white py-1 px-2 rounded hover:bg-purple-700">
          <p>+ 购买</p>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { Button } from '@/components/ui/button';
// import { addQuantity, cart, addOneQuantity, minusQuantity } from '@/stores/cart'
import { cart } from '@/stores/cart'

import { useStore } from '@nanostores/vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const $cart = useStore(cart);
// const products = computed(() => $cart.value.items);

const props = defineProps(["products"]);
const { products } = toRefs(props);

const decreaseQuantity = (productid: number) => {
  // minusQuantity(productid); // Product id
};

// Nanos
const addToCart = (productid: number) => {
    // addQuantity(productid);
};

const buyToCart = (productQuantity: number, productName: String) => {
    alert(`${productName}: ${productQuantity} added to cart`);
};

const increaseQuantity = (productid: number) => {
  // addOneQuantity(productid);
};
</script>

<style scoped>
.featured-product {
  max-width: 350px;
  margin: 0 auto;
}
</style>
