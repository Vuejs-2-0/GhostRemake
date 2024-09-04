<script setup>
import { ref, toRefs } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Form from "./QuestionForm2.vue"
import { Button } from "@/components/ui/button";


const props = defineProps(["cart", "cartIndex"])
const { cart, cartIndex } = toRefs(props)
</script>
<template> 
    <div>
        <Dialog>
            <DialogTrigger class="w-full">
                <Button class="w-full p-2.5 px-5 bg-salmon-500 rounded-xl min-h-0 h-auto text-white space-x-2 hover:bg-salmon-100 hover:text-salmon-500 pl-3 text-xl">
              <iconify-icon class="text-2xl" icon="material-symbols:add"></iconify-icon>
              <span>我要问事</span>
            </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] p-0 max-h-[90vh] grid gap-4 overflow-y-auto">
            <div class="grid gap-4 py-4 overflow-y-auto">
                <DialogTitle class="text-[25px] text-center p-4">问题</DialogTitle>
                <DialogDescription></DialogDescription>
                <Form :user_cart="cart" :questionSet="cartIndex" />
            </div>  
            </DialogContent>
        </Dialog>
    </div>
</template>
  
  