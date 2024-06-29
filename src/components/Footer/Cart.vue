<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ref } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
// import { cart, addQuantity, minusQuantity } from '@/stores/cart';
import { cart } from '@/stores/cart';

import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { getProducts } from "../../lib/tarpit_gql";

const products = await getProducts();

const $cart = useStore(cart);

const filteredProducts = computed(() => {
  // return products.filter(product => $cart.value.items[product.id] > 0);
});

const increaseQuantity = (productId: number) => {
  // addQuantity(productId);
};

const decreaseQuantity = (productId: number) => {
  // minusQuantity(productId);
};
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button class="bg-purple-100 border-none py-1 px-2 text-purple-700 rounded">付款</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle class="text-[25px]">购物车: </DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4 overflow-y-auto px-6">
        <div class="flex flex-col justify-between">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card flex justify-between items-center p-4 bg-white">
            <img :src="product.img" alt="Product Image" class="w-16 h-16 rounded"/>
            <div class="product-info flex-grow ml-4">
              <h3 class="text-lg font-semibold">{{ product.name }}</h3>
              <p class="text-sm text-gray-500">{{ product.price }}</p>
            </div>
            <div class="actions flex space-x-2">
              <button @click="decreaseQuantity(product.id)" class="bg-purple-100 border-none py-1 px-2 text-purple-700 rounded-full">-</button>
              <span class="text-[20px]">{{ $cart.value.items[product.id] }}</span>
              <button @click="increaseQuantity(product.id)" class="bg-purple-100 border-none py-1 px-2 text-purple-700 rounded-full">+</button>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter class="p-6 pt-0">
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>