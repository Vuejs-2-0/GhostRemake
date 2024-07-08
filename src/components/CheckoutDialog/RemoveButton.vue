<template>
    <div class="col-span-4 grid grid-cols-3 justify-center items-center">
      <div class="w-full flex justify-center items-center">
        <Button @click="_updateCart()" class=" bg-salmon-100 text-salmon-500 hover:bg-salmon-100 hover:text-salmon-500 text-lg flex justify-center items-center">
          Remove
        </Button>
      </div>
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
    console.log(cartMetadata);
    console.log(localCart.value);
    
    // Clone the existing bracelets array to avoid modifying the original reference
    let existingBracelets = [...(localCart.value.metadata.bracelets || [])];

    // The product.id is the number of count of array in bracelet that want to remove. Remove it from existingBracelets
    // Remove existingBracelets[product.id] from the array
    existingBracelets.splice(product.value.id, 1);

    cartMetadata.bracelets = existingBracelets;
    console.log(cartMetadata);

    await removeBraceletInCart(cartMetadata);

    window.location.reload();
    
    };  
</script>

  