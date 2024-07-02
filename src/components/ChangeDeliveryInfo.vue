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

</script>

<template>
  <Dialog>
    <DialogTrigger>
        <Button  class="font-bold text-sm rounded-md bg-salmon-500 hover:bg-salmon-100 hover:text-salmon-500">更改运输资料</Button>
    </DialogTrigger>
    <DialogContent class="w-[90%]:text-xs sm:w-[60%]:text-sm lg:w-[40%]:text-lg 2xl:w-[30%]">
      <DialogHeader>
        <DialogTitle>更改运输资料</DialogTitle>
        <DialogDescription>
            请确保您的联系信息正确，以确保您的货物正确送达
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="phone" class="text-right">
            <span>电话号码</span>
            <span class="text-red-500 ml-1">*</span>
          </Label>
          <Input id="phone" class="col-span-3" placeholder="01234567899" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="address" class="text-right">
            <span>收件人地址</span>
            <span class="text-red-500 ml-1">*</span>
          </Label>
          <Textarea id="address" class="col-span-3" placeholder="11, JALAN EXAMPLE 5/7, TAMAN EXAMPLE, 81110 JOHOR BAHRU, JOHOR."  />
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