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
import Form from "./QuestionForm2.vue"

const props = defineProps(["cart","json_schema","field_config"])
const { cart } = toRefs(props)
</script>
<template> 
    <Dialog>
        <DialogTrigger class="w-full">
        <slot></slot>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px] p-0 max-h-[90vh] grid gap-4 overflow-y-auto">
        <div class="grid gap-4 py-4 overflow-y-auto px-6">
            <DialogTitle class="text-[25px] text-center">问题</DialogTitle>
            <DialogDescription></DialogDescription>
            <Form :user_cart="cart" />
        </div>  
        </DialogContent>
    </Dialog>
</template>
  
  