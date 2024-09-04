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

const props = defineProps(["cart","json_schema","field_config"])
const { cart, json_schema, field_config } = toRefs(props)
</script>
<template> 
  <div>
    <Dialog>
    <DialogTrigger class="w-full">
      <slot></slot>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] p-0 max-h-[90vh]">
      <div class="grid gap-4 py-4 overflow-y-auto px-6">
        <DialogTitle class="text-[25px] text-center">五色绳</DialogTitle>
        <DialogDescription></DialogDescription>
        <Form :user_cart="cart" :json_schema="json_schema" :field_config="field_config" />
      </div>  
    </DialogContent>
  </Dialog>
  </div>
</template>
  
  