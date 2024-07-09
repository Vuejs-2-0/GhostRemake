<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { ref, toRefs } from 'vue';

const props = defineProps(["user"])
const { user } = toRefs(props)

const busy = ref(false)

const open = ref(false)

const phoneNumberInput = ref(user?.value?.metadata?.phoneNumber)
const addressInput = ref(user?.value?.metadata?.address)

const submit = async () => {

  busy.value = true

  let user_metadata = {
    ...user?.value?.metadata,
  }

  if (phoneNumberInput.value) {
    user_metadata.phoneNumber = phoneNumberInput.value
  }

  if (addressInput.value) {
    user_metadata.address = addressInput.value
  }

  // console.log(user.value)

  

  // PUT because we are actually updating the user

  let result = await fetch('/api/user_data.json', {
    method: 'PUT',
    body: JSON.stringify({
      uuid: user?.value.id,
      metadata: user_metadata
    })
  })

  busy.value = false
  open.value = false

  
  window.swup.navigate(window.location.href, { cache: { read: false, write: true } })
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger @click="open=true;">
        <Button  class="font-bold text-sm rounded-md bg-salmon-500 hover:bg-salmon-100 hover:text-salmon-500">更改运输资料</Button>
    </DialogTrigger>
    <DialogContent class="w-full max-w-sm">
      <DialogHeader>
        <DialogTitle>更改运输资料</DialogTitle>
        <DialogDescription>
            请确保您的联系信息正确，以确保您的货物正确送达
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="submit">
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="phoneNumber" class="text-right">
              <span>电话号码</span>
              <span class="text-red-500 ml-1">*</span>
            </Label>
            <Input v-model="phoneNumberInput" class="col-span-3" :placeholder="请输入电话号码" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="address" class="text-right">
              <span>收件人地址</span>
              <span class="text-red-500 ml-1">*</span>
            </Label>
            <Textarea v-model="addressInput" class="col-span-3" :placeholder="请输入正确的地址格式" />
          </div>
        </div>
      <div class="w-full flex justify-end items-center">
        <Button :disabled="busy" type="submit" class="bg-salmon-500 hover:bg-salmon-100 hover:text-salmon-500">
          {{ busy ? '提交中...' : '更改' }}
        </Button>
      </div>
    </form>
    </DialogContent>
  </Dialog>
</template>