<script setup>
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const quantity = ref(0);

const imgSrc = ref('img/bracelet.webp');
let choice = ref(0); // Note: `choice` is declared using `ref`

const changeChoice = (choices) => {
  if (choices === 0) {
    imgSrc.value = "img/bracelet.webp";
    choice.value = 0;
  } else {
    imgSrc.value = "img/bracelet2.webp";
    choice.value = 1;
  }
};

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
    alert(`Bracelet ${choice.value}: ${quantity.value} added to cart`);
  }
};
</script>
<template>
    <div class="product-card flex justify-center items-center pt-10 p-4 bg-white">
      <h3 class="font-bold pl-4 text-[36px]">五色绳</h3>
    </div>
    
    <div class="rounded-lg relative flex flex-col items-center">
        <img src="img/horizontal.webp" alt="Bracelet"  class="w-full max-w-[600px] h-auto max-h-[300px] bg-gray-300 rounded-[8px] object-cover">
      <div class="flex justify-between items-start w-full mt-4">
        <p class="text-[16px] flex-grow mr-4">弟者消聽泉筆後造想！爸東早汗丟？苦都抱地娘現海玉采言波法重他校具員蛋。活帶着麻但語卜，歡豆姊世者良目：村每壯喜陽個星，玩寫這斥哭何說。</p>
        <Dialog>
          <DialogTrigger>
            <Button class="bg-purple-500 text-white p-3 rounded mt-2 h-full text-[24px] whitespace-nowrap">订制五色绳</Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <div class="grid gap-4 py-4 overflow-y-auto px-6">
            <img :src="imgSrc" alt="Product Image" class="w-full h-full mt-3 mb-4 mx-auto object-cover rounded-lg" />
              <DialogTitle class="text-[25px] text-center">五色绳</DialogTitle>
              <DialogDescription class="text-[18px] text-center">
                RM25
              </DialogDescription>
              <p class="text-md mt-2 text-center">弟者消聽泉筆後造想！爸東早汗丟？苦都抱地娘現海玉采言波法重他校具員蛋。活帶着麻但語卜，歡豆姊世者良目：村每壯喜陽個星，玩寫這斥哭何說。</p>
              <div class="flex items-center justify-center mt-4 space-x-8">
                <Button @click="changeChoice(0)" class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full text-[20px] h-full font-medium">五色绳1</Button>
                <Button @click="changeChoice(1)" class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full text-[20px] h-full font-medium">五色绳2</Button>
                </div>
                <div class="flex items-center justify-center mt-4 space-x-8">
                <button v-if="quantity > 0" @click="decreaseQuantity" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded-full">-</button>
                <span v-if="quantity > 0" class="text-[35px] ">{{ quantity }}</span>
                <button v-if="quantity > 0" @click="increaseQuantity" class="bg-purple-100 border-none py-2 px-4 text-purple-700 rounded-full">+</button>
                <Button v-else @click="addToCart"  class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full text-[20px] h-full font-medium">添加至购物车</Button>
            </div>
            <Button v-if="quantity > 0" @click="addToCart" class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full text-[20px] h-full font-medium">购买</Button>
          </div>  
          </DialogContent>
        </Dialog>
      </div>
    </div>
</template>
  
  