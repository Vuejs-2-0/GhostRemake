<template>
    <div class="">
        <Button v-if="quantity == 0" @click="_updateCart(1)" class="w-full p-2 px-5 bg-salmon-100 rounded-xl min-h-0 h-auto text-salmon-500 space-x-2 hover:bg-salmon-100 hover:text-salmon-500 pl-3 text-lg">
            <iconify-icon class="text-xl" icon="material-symbols:add"></iconify-icon>
            <span>选购</span>
        </Button>
        <div v-else class="grid grid-cols-3 justify-center items-center">
            <Button @click="_updateCart(-1)"  class="bg-salmon-100 hover:bg-salmon-500 hover:text-white duration-200 text-salmon-500 w-8 h-8 rounded">
                -
            </Button>
            <div class="w-8 h-8 flex justify-center items-center">{{ quantity }}</div>
            <Button @click="_updateCart(1)" class="bg-salmon-100 hover:bg-salmon-500 hover:text-white duration-200 text-salmon-500 w-8 h-8 rounded">
                +
            </Button>
        </div>
        <Teleport to="#toasterDiv">
            <Toaster position="top-center" />
        </Teleport>
    </div>
</template>


<script setup>
    // import { useToast } from '@/components/ui/toast/use-toast'
    // import { Toaster } from '@/components/ui/toast'
    import { useDebounceFn } from '@vueuse/core'
    import { Button } from '@/components/ui/button';
    import { toRefs, computed } from 'vue';
    import { cart, updateProductInCart } from '@/stores/cart'
    import { useStore } from '@nanostores/vue';
    import { Toaster } from '@/components/ui/sonner'
    import { toast } from 'vue-sonner'

    const props = defineProps(["product"]);
    const { product } = toRefs(props);
    const $cart = useStore(cart);
    // const { toast } = useToast()

    const quantity = computed( () => {

        if($cart.value?.items) {
            let _item = $cart.value?.items[ String(product.value?.id)]
        
            if (_item) {
                return _item;
            } 
            return 0
        }

        return 0;
    })

    const _updateCart = async (_quantity) => {
        let _new_qty = _quantity + quantity.value;
        debounceToast()
        await updateProductInCart(product.value.id, _new_qty);
    }

    const debounceToast = useDebounceFn(() => {
        // do something, it will be called at most 1 time per second
        // toast({
        //     title: '添加成功！',
        //     description: '购物车已更新～',
        // });

        toast('添加成功！', {
        description: '购物车已更新～',
      })

    }, 100)

</script>
