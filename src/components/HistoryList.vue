<script setup>
import { ref, toRefs } from 'vue';

const purchaseHistory = ref([
  {
    date: '2024-06-13',
    orderId: 'ORD123456',
    orderStatus: '已发货',
    productName: '真的友鬼1',
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
    productName: '真的友鬼2',
    productPrice: 150.00,
    productQuantity: 1,
    subtotal: 150.00,
    shippingFee: 15.00,
    totalPrice: 165.00,
  },
  // Add more dummy data as needed
]);
</script>

<template>
    <div v-for="(order, index) in purchaseHistory" :key="index">
        <div class="w-full max-w-sm py-4 flex justify-between items-center">
        
            <article class="w-full bg-white p-4 rounded-3xl shadow-lg shadow-slate-100/5">
            
                <div class="w-full mt-2 ml-2 mb-2">
        
                    <div class="flex justify-between mr-4 gap-10">
                        <strong class="text-salmon-400 text-2xl tracking-wide">{{ order.date }}</strong>
                        <p class="font-semibold">订购ID: {{ order.orderId }}</p>
                    </div>

                    <hr class="my-2 border-salmon/50">
                    
                    <div>
                        <div class="flex justify-between items-center space-x-4 my-4">
                        <!-- Product Image and Details -->
                        <div class="flex items-center space-x-3">
                            <img src="/img/profile2.webp" class="w-16 h-16 object-cover rounded-lg" />
                            <div class="flex flex-col">
                                <h3 class="font-semibold text-green-600">{{ order.orderStatus }}</h3>
                                <h3 class=" font-semibold">{{ order.productName }}</h3>
                                <p class="text-sm text-black-500">RM {{ order.productPrice.toFixed(2) }}</p>
                            </div>
                        </div>
                        
                        <!-- Tracking and Quantity Details -->
                        <div class="flex flex-col items-end">
                            <p class="font-semibold  mr-4">x{{ order.productQuantity }}</p>
                        </div>
                    </div>

                    <hr class="my-2 border-salmon/50">

                    <div class="flex justify-between">
                        <div class="flex flex-col">
                            <p class="mt-3 mb-1 mr-8">小计</p>
                            <p class="my-1">运费</p>
                            <p class="my-1 font-semibold">总计</p>
                        </div>

                        <div class="flex justify-end">
                            <div class="flex flex-col">
                                <p class="mt-3 mb-1 mr-2">RM</p>
                                <p class="my-1">RM</p>
                                <p class="my-1 font-semibold">RM</p>
                            </div>

                            <div class="flex flex-col items-end mr-4">
                                <p class="mt-3 mb-1"> {{ order.subtotal.toFixed(2)}}</p>
                                <p class="my-1"> {{ order.shippingFee.toFixed(2)}}</p>
                                <p class="my-1 font-semibold"> {{ order.totalPrice.toFixed(2)}}</p>
                            </div>
                        </div>
                    </div>
                </div>
        
                </div>
        
            </article> 
    
        </div>
    </div>
</template>