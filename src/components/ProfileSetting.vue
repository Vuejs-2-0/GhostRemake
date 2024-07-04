<script setup lang='ts'>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import ChangePassword from "../components/ChangePassword.vue";

import ChangePersonalInfo from "../components/ChangePersonalInfo.vue";
import ChangeDeliveryInfo from "../components/ChangeDeliveryInfo.vue";

import { ref, toRefs } from 'vue';

const profile = ref([
  {
    CName: '杨例子',
    EName: 'Yong Example',
    phone: '01234567899',
    address: '11, JALAN EXAMPLE 5/7, TAMAN EXAMPLE, 81110 JOHOR BAHRU, JOHOR.',
    email: 'example@gmail.com',
  },
  // Add more dummy data as needed
]);
</script>

<template>
  <Card class="w-[90%] sm:w-[60%] lg:w-[40%] 2xl:w-[30%] mx-auto border-black">

    <CardHeader>
      <div class="flex justify-between">
        <CardTitle>个人资料</CardTitle>
        <ChangePersonalInfo />
      </div>
    </CardHeader>
    <CardContent>
      <form>
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-2">
            <Label for="CName">
              <span>中文姓名</span>

            </Label>
            <Input disabled id="CName" :placeholder="profile[0].CName"/>

          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="EName">
              <span>英文姓名</span>

            </Label>
            <Input disabled id="EName" :placeholder="profile[0].EName"/>

          </div>
          <hr>
        </div>
      </form>
    </CardContent>

    <CardHeader>
      <div class="flex justify-between">
        <CardTitle>运输资料</CardTitle>
        <ChangeDeliveryInfo />
      </div>
    </CardHeader>
    <CardContent>
      <form>
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="phone">
              <span>电话号码</span>
            </Label>
            <Input disabled id="phone" :placeholder="profile[0].phone" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="address">
              <span>收件人地址</span>
            </Label>
            <Textarea disabled id="address" :placeholder="profile[0].address" />
          </div>
          <hr>
        </div>
      </form>
    </CardContent>
    <CardHeader>
      <CardTitle>账户资料</CardTitle>
      <CardDescription>请填写真实信息</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid items-center w-full gap-4">
        <form>
            <div class="flex flex-col space-y-1.5">
              <Label for="email">电子邮件</Label>
              <Input disabled id="email" :placeholder="profile[0].email" />
            </div>
        </form>
        <div class="flex flex-col space-y-1.5 items-start">
          <ChangePassword />
        </div>
        <hr>
      </div> 
    </CardContent>
    <CardFooter class="flex justify-end gap-2">
      <a href="/">
        <Button variant="outline">取消</Button>
      </a>
      <Button class="bg-salmon-500 hover:bg-salmon-100 hover:text-salmon-500">更改</Button>
    </CardFooter>
  </Card>
</template>