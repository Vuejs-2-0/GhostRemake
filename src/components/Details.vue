<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="w-11/12 max-w-md bg-white p-5 shadow-lg">
            <img src="img/temporaryimg.png" alt="Product Image" class="w-48 h-48 mx-auto" />
            <h2 class="text-2xl font-bold mt-4">{{ product.name }}</h2>
            <p class="text-xl text-gray-600">{{ product.price }}</p>
            <p class="text-md text-gray-500 mt-2">{{ product.description }}</p>
            <div class="flex items-center justify-between mt-4">
                <button @click="decreaseQuantity" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded">-</button>
                <span class="text-xl">{{ quantity }}</span>
                <button @click="increaseQuantity" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded">+</button>
            </div>
            <button @click="addToCart" class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full">添加至购物车</button>
            <button @click="$emit('close')" class="mt-4 text-red-500 text-center w-full">关闭</button>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';

export default {
name: 'Details',
props: {
    product: {
    type: Object,
    required: true,
    },
},
setup(props, { emit }) {
    const quantity = ref(1);

    const increaseQuantity = () => {
    quantity.value++;
    };

    const decreaseQuantity = () => {
    if (quantity.value > 1) quantity.value--;
    };

    const addToCart = () => {
    // Add to cart logic here
    alert(`${props.product.name} added to cart`);
    };

    return {
    quantity,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    emit,
    };
},
};
</script>