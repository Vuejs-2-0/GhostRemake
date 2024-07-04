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

const profile = ref([
  {
    CName: '杨例子',
    EName: 'Yong Example',
  },
  // Add more dummy data as needed
]);
</script>

<template>
  <Dialog>
    <DialogTrigger>
        <Button  class="font-bold text-sm rounded-md bg-salmon-500 hover:bg-salmon-100 hover:text-salmon-500">更改个人资料</Button>
    </DialogTrigger>
    <DialogContent class="w-[90%]:text-xs sm:w-[60%]:text-sm lg:w-[40%]:text-lg 2xl:w-[30%]">
      <DialogHeader>
        <DialogTitle>更改个人资料</DialogTitle>
        <DialogDescription>
            请填写真实信息
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="CName" class="text-right">
            <span>中文姓名</span>
            <span class="text-red-500 ml-1">*</span>
          </Label>
          <Input id="CName" class="col-span-3"  :placeholder="profile[0].CName"  />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="EName" class="text-right">
            <span>英文姓名</span>
            <span class="text-red-500 ml-1">*</span>
          </Label>
          <Input id="EName" class="col-span-3"  :placeholder="profile[0].EName" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" class="bg-salmon-500 hover:bg-salmon-100 hover:text-salmon-500">
            确认更改
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>