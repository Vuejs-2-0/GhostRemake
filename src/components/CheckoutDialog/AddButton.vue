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
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { ref, toRefs } from "vue";
  import Form from "@/components/Checkout/Form.vue";
  import { computed } from 'vue';
  import { cart, updateProductInCart } from '@/stores/cart';
  import { useStore } from '@nanostores/vue';
  
  const $cart = useStore(cart);
  const props = defineProps({
    form: Object,
    products: Object // or Array, depending on the type you're passing
  });
  
  const productList = computed(() => {
    if (!$cart.value.items) return [];
    return props.products.filter(p => $cart.value.items[p.id])
                        .map(p => ({ ...p, quantity: $cart.value.items[p.id] }));
  });
  
  const { form, products } = toRefs(props);
  const page = ref("list");
  
  const computeTx = async (ev) => {
      console.log(ev);
      // page.value = "list";
  };
  
  const quantity = computed( () => {
  
  if($cart.value?.items) {
      let _item = $cart.value?.items[ String(products.value?.id)]
  
      if (_item) {
          return _item;
      } 
      return 0
      
  }
  
  return 0;
  
  })
  
  const _updateCart = async (product, _quantity) => {
          
          let _new_qty = _quantity + quantity.value;
  
          await updateProductInCart(product, _new_qty);
  
      }
  
  </script>
  