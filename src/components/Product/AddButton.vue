<template>
    
    <div class="">

        <!-- {{ $cart.items['1'] }} -->
        
        <Button v-if="quantity == 0" @click="_updateCart(1)" class="bg-purple-500 text-white py-2 px-4 rounded w-full">
            <p>添加至购物车</p>
        </Button>

        <div v-else class="grid grid-cols-3 justify-center items-center">

            <Button @click="_updateCart(-1)"  class="bg-purple-100 text-purple-500 w-8 h-8 rounded">
                -
            </Button>

            <div class="w-8 h-8 flex justify-center items-center">{{ quantity }}</div>


            <Button @click="_updateCart(1)" class="bg-purple-100 text-purple-500 w-8 h-8 rounded">
                +
            </Button>


        </div>

        <Toaster />

    </div>
</template>


<script setup>

    import { useToast } from '@/components/ui/toast/use-toast'
    import { Toaster } from '@/components/ui/toast'

    import { useDebounceFn } from '@vueuse/core'

    import { Button } from '@/components/ui/button';
    import { toRefs, computed } from 'vue';

    const props = defineProps(["product"]);
    const { product } = toRefs(props);

    import { cart, updateProductInCart } from '@/stores/cart'
    import { useStore } from '@nanostores/vue';
    
    const $cart = useStore(cart);

    const { toast } = useToast()


    const quantity = computed( () => {

        // console.log($cart.value.items)
        let _item = $cart.value.items[ String(product.value.id)]

        if (_item) {
            return _item;
        } 
        // console.log(_item);
        return 0
        
        // return _item ? _item.quantity : 0;
    })

    const _updateCart = async (_quantity) => {
        
        let _new_qty = _quantity + quantity.value;

        await updateProductInCart(product.value.id, _new_qty);

        debounceToast()

    }

    const debounceToast = useDebounceFn(() => {
        // do something, it will be called at most 1 time per second
        toast({
            title: '添加成功！',
            description: '购物车已更新～',
        });
    }, 1000)

    // const increaseQuantity = (productid) => {
    //     // addOneQuantity(productid);
    //     console.log(productid);
    // };

</script>