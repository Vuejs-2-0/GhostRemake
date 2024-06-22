<template>
    <div class="col-span-4 grid grid-cols-3 justify-center items-center">
      <div class="w-full flex justify-center items-center">
        <Button @click="_updateCart(-1)" class="w-8 h-8 rounded-full bg-salmon-100 text-salmon-500 hover:bg-salmon-100 hover:text-salmon-500 text-lg flex justify-center items-center">
          <iconify-icon class="text-lg" icon="ic:round-minus"></iconify-icon>
        </Button>
      </div>
      <div class="text-center w-full">{{ quantity }}</div>
      <div class="w-full flex justify-center items-center">
        <Button @click="_updateCart(1)" class="w-8 h-8 rounded-full bg-salmon-100 text-salmon-500 hover:bg-salmon-100 hover:text-salmon-500 text-lg flex justify-center items-center">
          <iconify-icon class="text-lg" icon="ic:round-plus"></iconify-icon>
        </Button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Button } from "@/components/ui/button";
  import { computed, defineProps, toRefs } from 'vue';
  import { cart, updateProductInCart } from '@/stores/cart';
  import { useStore } from '@nanostores/vue';
  
  const $cart = useStore(cart);
  const props = defineProps({
    product: Object
  });
  const { product } = toRefs(props);
  
  const quantity = computed(() => {
    if ($cart.value?.items) {
      let _item = $cart.value?.items[String(product.value?.id)];
      if (_item) {
        return _item;
      }
      return 0;
    }
    return 0;
  });
  
  const _updateCart = async (_quantity) => {
    let _new_qty = _quantity + quantity.value;
    await updateProductInCart(product.value.id, _new_qty);
  };
  </script>
  