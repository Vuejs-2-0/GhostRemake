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
</script>

<template>
  <Card class="w-[60%] mx-auto border-black">
    <CardHeader>
      <CardTitle>个人资料</CardTitle>
      <CardDescription>请填写真实信息</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-2">
            <Label for="CName">
              <span>中文姓名</span>
              <span class="text-red-500 ml-1">*</span>
            </Label>
            <Input id="CName" placeholder="请输入中文姓名" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="EName">
              <span>英文姓名</span>
              <span class="text-red-500 ml-1">*</span>
            </Label>
            <Input id="EName" placeholder="请输入英文姓名"/>
          </div>
          <hr>
        </div>
      </form>
    </CardContent>

    <CardHeader>
      <CardTitle>运输资料</CardTitle>
      <CardDescription>请确保您的联系信息正确，以确保您的货物正确送达</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="phone">
              <span>电话号码</span>
              <span class="text-red-500 ml-1">*</span>
            </Label>
            <Input id="phone" placeholder="请输入电话号码" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="address">
              <span>收件人地址</span>
              <span class="text-red-500 ml-1">*</span>
            </Label>
            <Textarea id="address" placeholder="请输入正确的地址格式" />
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
              <Input disabled id="email" placeholder="example@gmail.com" />
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
      <Button>更改</Button>
    </CardFooter>
  </Card>
</template>