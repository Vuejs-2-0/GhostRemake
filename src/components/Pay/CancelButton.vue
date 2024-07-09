<template>
    <div>
        <Dialog>
    <DialogTrigger>
        <Button @click="" variant='ghost' class="text-sm text-red-500 border p-1 px-2 h-auto min-h-0 border-red-400" > 取消 </Button>
    </DialogTrigger>
    <DialogContent class="w-full max-w-[300px] rounded-xl p-2
    ">
      <DialogHeader>
        
        <VisuallyHidden>
            <DialogTitle>取消订单</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
            <DialogDescription>
                您确定要取消订单吗？
            </DialogDescription>
        </VisuallyHidden>
      </DialogHeader>

      <div class="w-full py-12 text-center">
        <iconify-icon class="text-6xl text-salmon-200" icon="bxs:sad"/>
        <p class="text-salmon text-xl font-bold">确定要取消订单吗？</p>
      </div>

      <div class="w-full space-y-2">
          
          <DialogClose as-child>
            <Button @click="confirmCancel()" variant="outline" class="w-full">确定取消</Button>
          </DialogClose>
          <DialogClose as-child>
              <Button class="w-full bg-salmon text-white hover:bg-salmon-700">返回</Button>
          </DialogClose>
      </div>
    </DialogContent>
  </Dialog>


        
    </div>
</template>

<script setup>

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { VisuallyHidden } from "radix-vue";

import { toRefs } from 'vue' 

const props = defineProps(["uuid"])
const { uuid } = toRefs(props)

const confirmCancel = async () => {
    console.log('Cancel Order');

    let payload = {
        // ...ev,
        uuid: uuid.value,
        status: 'void'
    }

    // PUT because we are actually updating the transaction
    let result = await fetch('/api/tx.json', {
        method: 'PUT',
        body: JSON.stringify(payload)
    })

    console.log(result)
    // window.location.
    // navigate
    window.swup.navigate('/');

}

</script>