<template>
  <div></div>
</template>

<script setup>

    import { toRefs } from "vue";
    const props = defineProps(["user_cart"]);

    const { user_cart } = toRefs(props);

    import { initCart } from "@/stores/cart";

    initCart(user_cart.value);
</script>
