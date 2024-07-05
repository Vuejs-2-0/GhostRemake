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

</script>

<template>
  <Dialog>
    <DialogTrigger>
        <Button  class="font-bold text-sm rounded-md bg-salmon-500 hover:bg-salmon-100 hover:text-salmon-500">更改密码</Button>
    </DialogTrigger>
    <DialogContent class="w-[90%]:text-xs sm:w-[60%]:text-sm lg:w-[40%]:text-lg 2xl:w-[30%]">
      <DialogHeader>
        <DialogTitle>更改密码</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="NewPassword" class="text-right">
            <span>新密码</span>
            <span class="text-red-500 ml-1">*</span>
          </Label>
          <Input id="NewPassword" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="ConfirmNewPassword" class="text-right">
            <span>确认新密码</span>
            <span class="text-red-500 ml-1">*</span>
          </Label>
          <Input id="ConfirmNewPassword" class="col-span-3" />
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