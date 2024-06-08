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
import {toRefs} from 'vue'
import { defineProps} from 'vue'
import { useStore } from '@nanostores/vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const $cart = useStore(cart);

const {product} = toRefs(props);

const increaseQuantity = () => {
  addQuantity(product.value.id); // Product id
};

const decreaseQuantity = () => {
  minusQuantity(product.value.id); // Product id
};

// Nanos
const addToCart = () => {
  if (quantity.value === 0) {
    quantity.value = 1;
  } else {
    alert(`${props.product.name}: ${quantity.value} added to cart`);
  }
};
    
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button class="bg-white hover:bg-white details-btn text-blue-500 underline pr-3">详情</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <img src="img/temporaryimg.webp" alt="Product Image" class="w-48 h-60 mb-4 mx-auto object-cover" />
        <DialogTitle class="text-[25px] text-center">{{ product.name }}</DialogTitle>
        <DialogDescription class="text-[18px] text-center">
          {{ product.price }}
        </DialogDescription>
      </DialogHeader>
        <p class="text-md mt-2 text-center">{{ product.description }}</p>
        <div class="flex items-center justify-center mt-4 space-x-8">
          <button v-if="quantity > 0" @click="decreaseQuantity" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded-full">-</button>
          <span v-if="quantity > 0" class="text-[35px] ">{{ quantity }}</span>
          <button v-if="quantity > 0" @click="increaseQuantity" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded-full">+</button>
          <Button v-else @click="addToCart"  class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full text-[20px] h-full font-medium">添加至购物车</Button>
      </div>
      <Button v-if="quantity > 0" @click="addToCart" class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full text-[20px] h-full font-medium">购买</Button>
    </DialogContent>
  </Dialog>
</template>
