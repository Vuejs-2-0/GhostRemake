<template>

  <div class="w-full fixed bottom-0 bg-white p-4 flex justify-center items-center border-t">

    <!-- {{  $cart }} -->
    <p>Total Items: {{ totalItems }}</p>   
    

  </div>

</template>


<script setup>

  import { computed } from 'vue';
  import { cart } from '@/stores/cart'
  import { useStore } from '@nanostores/vue';

  const $cart = useStore(cart);

  const totalItems = computed(() => {

    if (!$cart.value.items) return 0;

    let items = Object.entries($cart.value.items);

    return items.reduce((acc, [item_id, quantity]) => {
      return acc + quantity;
    }, 0);

  });

</script>