<template>
    <Button @click="increaseQuantity(product.id)" class="bg-purple-500 text-white py-2 px-4 rounded w-full">
        <p>添加至购物车</p>
    </Button>
</template>


<script setup>

    import { Button } from '@/components/ui/button';
    import { toRefs } from 'vue';

    const props = defineProps(["product"]);
    const { product } = toRefs(props);

    const increaseQuantity = (productid) => {
        // addOneQuantity(productid);
        console.log(productid);
    };

</script>