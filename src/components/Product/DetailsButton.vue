<template>
    <div>
        <Dialog>
          <DialogTrigger>
            <Button variant="link" class="underline">详情</Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <div class="grid gap-4 py-4 overflow-y-auto px-6">
              <img src="img/temporaryimg.png" alt="Product Image" class="w-48 h-60 mb-4 mx-auto object-cover" />
              <DialogTitle class="text-[25px] text-center">{{ product.name }}</DialogTitle>
              <DialogDescription class="text-[18px] text-center">
                {{ product.price }}
              </DialogDescription>
              <p class="text-md mt-2 text-center">{{ product.description }}</p>
              <div class="flex items-center justify-center mt-4 space-x-8">
                <button v-if="product.quantity > 0" @click="decreaseQuantity(product.id)" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded-full">-</button>
                <span v-if="product.quantity > 0" class="text-[35px] ">{{ product.quantity }}</span>
                <button v-if="product.quantity > 0" @click="increaseQuantity(product.id)" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded-full">+</button>
                <Button v-if="product.quantity == 0" @click="addToCart(product.id)"  class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full text-[20px] h-full font-medium">添加至购物车</Button>
              </div>
            
              <Button v-if="product.quantity > 0" @click="buyToCart(product.quantity, product.name)" class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full text-[20px] h-full font-medium">购买</Button>
            </div>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup>

    import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
    import { Button } from '@/components/ui/button';

    import { defineProps } from 'vue';
    const props = defineProps(["product"]);
    
</script>