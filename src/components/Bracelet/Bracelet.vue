<script setup>
import { Button } from '@/components/ui/button'
import { ref, toRefs } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Form from "./Form.vue"

const props = defineProps(["json_schema","field_config"])
const { json_schema, field_config } = toRefs(props)
</script>
<template> 
    <!-- <div class="rounded-lg relative flex flex-col items-center">
        <img src="img/horizontal.webp" alt="Bracelet"  class="w-full max-w-[600px] h-auto max-h-[300px] bg-gray-300 rounded-[8px] object-cover">
      <div class="flex justify-between items-start w-full mt-4">
        <p class="text-[16px] flex-grow mr-4">弟者消聽泉筆後造想！爸東早汗丟？苦都抱地娘現海玉采言波法重他校具員蛋。活帶着麻但語卜，歡豆姊世者良目：村每壯喜陽個星，玩寫這斥哭何說。</p> -->
        <Dialog>
          <DialogTrigger>
            <slot></slot>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <div class="grid gap-4 py-4 overflow-y-auto px-6">
              <DialogTitle class="text-[25px] text-center">五色绳</DialogTitle>
              <DialogDescription></DialogDescription>
              <Form :json_schema="json_schema" :field_config="field_config" />
            <Button v-if="quantity > 0" @click="addToCart" class="bg-purple-600 text-white py-2 px-4 rounded mt-4 w-full text-[20px] h-full font-medium">购买</Button>
          </div>  
          </DialogContent>
        </Dialog>
      <!-- </div>
    </div> -->
</template>
  
  