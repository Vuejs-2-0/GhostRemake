<template>
  <div class="flex justify-center items-center h-full">
    <Button @click="_updateCart()" class="bg-salmon-100 text-salmon-500 hover:bg-salmon-100 hover:text-salmon-500 text-lg px-4 py-2 rounded-md">
      移除
    </Button>
  </div>
</template>
  
  <script setup>
  import { Button } from "@/components/ui/button";
  import { computed, defineProps, toRefs } from 'vue';
  import { cart, removeBraceletInCart } from '@/stores/cart';
  import { useStore } from '@nanostores/vue';
  
  const $cart = useStore(cart);
  const props = defineProps({
    product: Object,
    localCart: Object,
  });
  const { product, localCart } = toRefs(props);

  const _updateCart = async () => {
    // Access and update the cart's metadata
    let cartMetadata = { ...$cart.value.metadata };
    
    let existingBracelets = [...(localCart.value.metadata.bracelets || [])];

    existingBracelets.splice(product.value.id, 1);

    cartMetadata.bracelets = existingBracelets;

    await removeBraceletInCart(cartMetadata);

    // window.location.reload();
    
  };  
</script>

  