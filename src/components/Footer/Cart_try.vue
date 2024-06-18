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
          <div v-for="product in product" :key="product.id" class="product-card flex justify-between items-center p-4 bg-white">
            <!-- <img :src="product.media.image" alt="Product Image" class="w-16 h-16 rounded object-cover" /> -->
            <div class="product-info flex-grow ml-4">
              <h3 class="text-lg font-semibold">{{ product.name }}</h3>
              <p class="text-sm text-gray-500">RM{{ product.price }}</p>
            </div>
            <div class="actions flex justify-end items-center">
              <AddButton client:only="vue" :product="product" />
            </div>
          </div>
          <p>TotalItem: {{ totalItems }}</p>
        </div>
      </div>
      <DialogFooter class="p-6 pt-0">
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
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
import { cart } from '@/stores/cart';
import { computed, defineProps, toRefs } from 'vue';
import { useStore } from '@nanostores/vue';
import AddButton from '@/components/Product/AddButton.vue';

const $cart = useStore(cart);
const prop = defineProps(['product']);
const { products} = toRefs(prop);

const productList = computed(() => {
  if (!$cart.value.items) return [];
  return products.value.filter(product => {
    return $cart.value.items.hasOwnProperty(product.id);
  }).map(product => {
    return {
      ...product,
      quantity: $cart.value.items[product.id]
    };
  });
});

const totalItems = computed(() => {
  if (!$cart.value.items) return 0;

  let items = Object.entries($cart.value.items);

  return items.reduce((acc, [item_id, quantity]) => {
    return acc + quantity;
  }, 0);
});

</script>