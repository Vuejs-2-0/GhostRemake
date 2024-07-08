<template>
  <div class="">
    <div class="bg-white rounded-xl flex justify-between items-center p-2 pl-4 shadow-lg">
      <div class="text-lg font-semibold text-salmon">总额: RM {{Number(tx.value).toFixed(2)}}</div>
      
      

      <Dialog>
    <DialogTrigger>
        <Button class="bg-salmon-500/10 text-salmon text-sm hover:text-white hover:bg-salmon">展开</Button>
    </DialogTrigger>
    <DialogContent class="p-2">
      <DialogHeader class="pb-12 p-4">
        <DialogTitle>订单详情</DialogTitle>

        <VisuallyHidden>
            <DialogDescription>
              订单详情
            </DialogDescription>
        </VisuallyHidden>
      </DialogHeader>

      <!-- 123 -->
      <!-- <div>{{ tx.entries.filter( (entry:any) => (entry.type=='product')) }}</div> -->

      <div class="px-2">
        <Summary :postageEntry="tx.entries.filter( (entry:any) => (entry.type==='postage'))" :productEntries="tx.entries.filter( (entry:any) => (entry.type=='product'))" :form="tx.form" :value="tx.value" ></Summary>
      </div>

      <DialogClose>
          <Button class="w-full bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border-2 border-salmon-400 shadow-xl duration-300 transition-all scale-100 active:scale-95 p-3">
                    <span class="text-xl text-white">返回</span>
                  </Button>
      </DialogClose>
      
    </DialogContent>
  </Dialog>

      
    </div>
  </div>
</template>

<script setup lang="ts">

    import { toRefs } from "vue";
    import { VisuallyHidden } from "radix-vue";
    import { Button } from "@/components/ui/button";
    import { Dialog, DialogContent, DialogDescription, DialogClose, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
import Summary from "../CheckoutDialog/Summary.vue";

    const props = defineProps(['tx'])
    const { tx } = toRefs(props)
</script>
