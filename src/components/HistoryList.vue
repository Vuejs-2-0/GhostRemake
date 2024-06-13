<template>
    <div class="container mx-auto p-0.5">
        <div class="grid gap-4 overflow-y-auto">
            <div class="flex flex-col justify-between ">
                <div v-for="(order, index) in purchaseHistory" :key="index" class="product-card flex justify-between items-center p-4 bg-white">
                    
                    <!-- Display Image -->
                    
                    <!-- Display Item name and price, reactive for price -->
                    <div class="product-info flex-grow">
                        <div class="flex justify-between">
                            <div class="flex flex-col">
                                <p class="text-lg font-semibold">{{ order.date }}</p>
                            </div>

                            <div class="flex flex-col items-end">
                                <p class="my-2 font-semibold">订购ID: {{ order.orderId }}</p>
                            </div>
                        </div>

                        <hr>

                        <div class="flex justify-between items-center space-x-4 my-4">
                            <!-- Product Image and Details -->
                            <div class="flex items-center space-x-4">
                                <img src="/img/profile2.webp" class="w-16 h-16 object-cover rounded-lg" />
                                <div class="flex flex-col">
                                    <h3 class=" font-semibold text-green-600">{{ order.orderStatus }}</h3>
                                    <h3 class="text-lg font-semibold">{{ order.productName }}</h3>
                                    <p class="text-sm text-gray-500">RM {{ order.productPrice.toFixed(2) }}</p>
                                </div>
                            </div>
                            
                            <!-- Tracking and Quantity Details -->
                            <div class="flex flex-col items-end">
                                <p class="font-semibold">Tracking No.: {{ order.trackingId }}</p>
                                <p class="font-semibold">x{{ order.productQuantity }}</p>
                            </div>
                        </div>
                        <hr>

                        <div class=" flex justify-end">
                            <div class="flex flex-col">
                            <p class="mt-3 mb-1 mr-8">小计</p>
                            <p class="my-1">运费</p>
                            <p class="my-1 font-semibold">总计</p>
                            </div>

                            <div class="flex flex-col">
                            <p class="mt-3 mb-1 mr-2">RM</p>
                            <p class="my-1">RM</p>
                            <p class="my-1 font-semibold">RM</p>
                            </div>

                            <div class="flex flex-col items-end">
                            <p class="mt-3 mb-1"> {{ order.subtotal.toFixed(2)}}</p>
                            <p class="my-1"> {{ order.shippingFee.toFixed(2)}}</p>
                            <p class="my-1 font-semibold"> {{ order.totalPrice.toFixed(2)}}</p>
                            </div>
                        </div>
                        <hr>
                    </div>

                </div>
            </div>
        </div>
    </div>
  </template>

<script setup>
import { ref } from 'vue';

const purchaseHistory = ref([
  {
    date: '2024-06-13',
    orderId: 'ORD123456',
    orderStatus: '已发货',
    trackingId: 'TRK123456',
    productName: 'Product 1',
    productPrice: 100.00,
    productQuantity: 2,
    subtotal: 200.00,
    shippingFee: 10.00,
    totalPrice: 210.00,
  },
  {
    date: '2024-06-14',
    orderId: 'ORD123457',
    orderStatus: '已发货',
    trackingId: 'TRK123457',
    productName: 'Product 2',
    productPrice: 150.00,
    productQuantity: 1,
    subtotal: 150.00,
    shippingFee: 15.00,
    totalPrice: 165.00,
  },
  // Add more dummy data as needed
]);
</script>

<style scoped>
.container {
  max-width: 100%;
}

</style>