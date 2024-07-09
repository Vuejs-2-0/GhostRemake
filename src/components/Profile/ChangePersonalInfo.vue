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

import { ref, toRefs } from 'vue';

const props = defineProps(["user"])
const { user } = toRefs(props)

const busy = ref(false)

const open = ref(false)

const chineseNameInput = ref(user?.value?.metadata?.chineseName)
const englishNameInput = ref(user?.value?.metadata?.englishName)

// const profile = ref([
//   {
//     CName: '杨例子',
//     EName: 'Yong Example',
//   },
//   // Add more dummy data as needed
// ]);

const submit = async () => {

  busy.value = true

  let user_metadata = {
    ...user?.value?.metadata,
  }

  if (chineseNameInput.value) {
    user_metadata.chineseName = chineseNameInput.value
  }

  if (englishNameInput.value) {
    user_metadata.englishName = englishNameInput.value
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
        <Button  class="font-bold text-sm rounded-md bg-salmon-500 hover:bg-salmon-100 hover:text-salmon-500">更改个人资料</Button>
    </DialogTrigger>
    <DialogContent class="w-full max-w-sm">
      <DialogHeader>
        <DialogTitle>更改个人资料</DialogTitle>
        <DialogDescription>
            请填写真实信息
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="submit">
        <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="CName" class="text-right">
            <span>中文姓名</span>
            <span class="text-red-500 ml-1">*</span>
          </Label>
          <Input v-model="chineseNameInput" class="col-span-3"  placeholder="请输入中文姓名" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="EName" class="text-right">
            <span>英文姓名</span>
            <span class="text-red-500 ml-1">*</span>
          </Label>
          <Input v-model="englishNameInput" class="col-span-3" placeholder="请输入英文姓名" />
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