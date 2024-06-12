<template>
  <div></div>
</template>

<script setup>
    const props = defineProps(["user_cart"]);

    const { user_cart } = toRefs(props);

    import { useStore } from "@nanostores/vue";
    import { cart, initCart } from "@/stores/cart";

    // const $cart = useStore(cart);

    initCart(user_cart.value);
</script>
