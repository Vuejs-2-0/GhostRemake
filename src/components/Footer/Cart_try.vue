<template>
  <Dialog>
    <DialogTrigger>
      <Button class="bg-purple-100 border-none py-1 px-2 text-purple-700 rounded">前往购物车</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle class="text-[25px]">购物车: </DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4 overflow-y-auto px-6">
        <div class="flex flex-col justify-between">
          <div v-for="product in productList" :key="product.id" class="product-card flex justify-between items-center p-4 bg-white border-b border-gray-200">
            <img :src="product.media.image" alt="Product Image" class="w-16 h-16 rounded object-cover" />
            <div class="product-info flex-grow ml-4">
              <h3 class="text-lg font-semibold">{{ product.name }}</h3>
              <p class="text-sm text-gray-500">RM{{ product.price*product.quantity }}</p>
            </div>
            <div class="actions flex justify-end items-center flex-grow">
              <AddButton client:only="vue" :product="product" />
            </div>
          </div>
        </div>
        <p class="text-[15px] font-medium ">总共(未包含运费): RM{{ totalPrice }}</p>
      </div>
      <DialogFooter class="p-6 pt-0">
        <Button type="submit">前往结帐</Button>
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
const props = defineProps(['product']);
const { product } = toRefs(props);

const productList = computed(() => {
  if (!$cart.value.items) return [];
  return product.value.filter(p => $cart.value.items[p.id])
                      .map(p => ({ ...p, quantity: $cart.value.items[p.id] }));
});

const totalItems = computed(() => {
  if (!$cart.value.items) return 0;
  let items = Object.entries($cart.value.items);
  return items.reduce((acc, [item_id, quantity]) => {
    return acc + quantity;
  }, 0);
});

const totalPrice = computed(() => {
  if (!$cart.value.items) return 0;

  return product.value.reduce((total, p) => {
    const quantity = $cart.value.items[p.id] || 0;
    return total + (p.price * quantity);
  }, 0);
});
</script>