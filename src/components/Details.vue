<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-[20px]" v-if="show" @click="close">
    <Card class="w-11/12 max-w-md p-5 shadow-lg rounded-[20px]" @click.stop>
      <CardHeader class="text-center">
        <img src="img/temporaryimg.png" alt="Product Image" class="w-48 h-60 mb-4 mx-auto" />
        <CardTitle class="text-center">{{ product.name }}</CardTitle>
        <CardDescription class="text-center">{{ product.price }}</CardDescription>
      </CardHeader>
      <CardContent class="text-center">
        <p class="text-md mt-2">{{ product.description }}</p>
        <div class="flex items-center justify-center mt-4 space-x-8">
          <button v-if="quantity > 0" @click="decreaseQuantity" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded-full">-</button>
          <span v-if="quantity > 0" class="text-[35px] ">{{ quantity }}</span>
          <button v-if="quantity > 0" @click="increaseQuantity" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded-full">+</button>
          <button v-else @click="addToCart" class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full">添加商品</button>
        </div>
      </CardContent>
      <CardFooter class="text-center">
        <button v-if="quantity > 0" @click="addToCart" class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full">添加至购物车</button> 
        <!-- 换去结账 -->
      </CardFooter>
    </Card>
  </div>
</template>

<script>
import { ref } from 'vue';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// use dialog

export default {
  name: 'Details',
  components: {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const quantity = ref(0);

    const increaseQuantity = () => {
      quantity.value++;
    };

    const decreaseQuantity = () => {
      if (quantity.value > 0) quantity.value--;
    };

    const addToCart = () => {
      if (quantity.value === 0) {
        quantity.value = 1;
      } else {
        alert(`${props.product.name}: ${quantity.value} added to cart`);
      }
    };

    const close = () => {
      emit('close');
    };

    return {
      quantity,
      increaseQuantity,
      decreaseQuantity,
      addToCart,
      close,
    };
  },
};
</script>

