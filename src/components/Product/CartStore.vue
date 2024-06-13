<template>
  <div></div>
</template>

<script setup>

    import { toRefs } from "vue";
    const props = defineProps(["user_cart"]);

    const { user_cart } = toRefs(props);

    // import { useStore } from "@nanostores/vue";
    import { initCart } from "@/stores/cart";

    // const $cart = useStore(cart);

    initCart(user_cart.value);
</script>
