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
    // console.log(cartMetadata);
    // console.log(localCart.value);
    
    // Clone the existing bracelets array to avoid modifying the original reference
    let existingBracelets = [...(localCart.value.metadata.bracelets || [])];

    // The product.id is the number of count of array in bracelet that want to remove. Remove it from existingBracelets
    // Remove existingBracelets[product.id] from the array
    existingBracelets.splice(product.value.id, 1);

    cartMetadata.bracelets = existingBracelets;
    // console.log(cartMetadata);

    await removeBraceletInCart(cartMetadata);

    window.location.reload();
    
    };  
</script>

  