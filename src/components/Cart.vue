<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cart, addQuantity, minusQuantity } from '@/stores/cart'
import { computed } from 'vue'
import { useStore } from '@nanostores/vue';

const $cart = useStore(cart);
const products = computed(() => $cart.value.items);

const quantity = ref(0);

const shipping = ref(5); // Example shipping cost

const subtotal = computed(() => {
      return products.value.reduce((sum, product) => sum + product.price, 0);
    });

    const total = computed(() => {
      return subtotal.value + shipping.value;
    });
  
const filteredProducts = computed(() => {
  return $cart.value.items.filter(product => product.quantity > 0);
});

const increaseQuantity = (productId: number) => {
  addQuantity(productId);
};

const decreaseQuantity = (productId: number) => {
  minusQuantity(productId);
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
        <!-- <DialogDescription class="text-[18px] text-center">
        </DialogDescription> -->
      </DialogHeader>
        <div class="grid gap-4 py-4 overflow-y-auto px-6">
            <div class="flex flex-col justify-between ">
                <div v-for="product in filteredProducts" :key="product.id" class="product-card flex justify-between items-center p-4 bg-white">
                    <!-- Display Image -->
                    <img :src="product.img" alt="Product Image" class="w-16 h-16 rounded"/> 
                    
                    <!-- Display Item name and price, reactive for price -->
                    <div class="product-info flex-grow ml-4">
                        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
                        <p class="text-sm text-gray-500">{{ product.price }}</p>
                    </div>

                    <!-- Display quantity and allowed to add and minus, when click on it will change in nanostore -->
                    <div class="actions flex space-x-2">
                        <button @click="decreaseQuantity(product.id)" class="bg-purple-100 border-none py-1 px-2 text-purple-700 rounded-full">-</button>
                        <span class="text-[20px]">{{ product.quantity }}</span>
                        <button @click="increaseQuantity(product.id)" class="bg-purple-100 border-none py-1 px-2 text-purple-700 rounded-full">+</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="quantity!=0">
          <hr>
          <div class="container flex justify-between">
            <div class="flex flex-col">
              <p class="my-2">小计</p>
              <p class="my-2">运费</p>
              <p class="my-2 font-semibold">总计</p>
            </div>

            <div class="flex flex-col items-end">
              <p class="my-2">RM {{ subtotal.toFixed(2) }}</p>
              <p class="my-2">RM {{ shipping.toFixed(2) }}</p>
              <p class="my-2 font-semibold">RM {{ total.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      <hr>
      <DialogFooter class="p-6 pt-0">
        <!-- Display total price -->
        <!-- Button to buy or display options at below -->
        <Button type="submit" class="px-36 rounded-full">Save changes</Button>
      </DialogFooter>
       
    </DialogContent>
  </Dialog>
</template>
