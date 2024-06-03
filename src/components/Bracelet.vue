<template>
    <div class="product-card flex justify-center items-center pt-10 p-4 bg-white">
      <h3 class="font-bold pl-4 text-[36px]">五色绳</h3>
    </div>
    
    <div class="rounded-lg relative flex flex-col items-center">
        <img src="img/horizontal.png" alt="Bracelet"  class="w-full max-w-[600px] h-auto max-h-[300px] bg-gray-300 rounded-[8px] object-cover">
      <div class="flex justify-between items-start w-full mt-4">
        <p class="text-[16px] flex-grow mr-4">弟者消聽泉筆後造想！爸東早汗丟？苦都抱地娘現海玉采言波法重他校具員蛋。活帶着麻但語卜，歡豆姊世者良目：村每壯喜陽個星，玩寫這斥哭何說。</p>
        <Button class="bg-purple-500 text-white p-3 rounded mt-2 h-full text-[24px] whitespace-nowrap">订制五色绳</Button>
      </div>
    </div>
  </template>
  
  <script>
  import { Button } from '@/components/ui/button'
  export default {
    name: 'Bracelet',
    components: {
      Button
    }
  };
  </script>