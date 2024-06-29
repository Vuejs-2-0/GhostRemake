<template>
  <span>{{ totalItems }}</span>
</template>

<script setup>
  import { computed } from 'vue';
  import { cart } from '@/stores/cart';
  import { useStore } from '@nanostores/vue';
  import Cart from '@/components/Footer/Cart_try.vue';

  const $cart = useStore(cart);

  const totalItems = computed(() => {
    if (!$cart.value.items) return 0;

    let items = Object.entries($cart.value.items);

    return items.reduce((acc, [item_id, quantity]) => {
      return acc + quantity;
    }, 0);
  });
</script>
