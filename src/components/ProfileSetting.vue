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
</script>

<template>
  <Card class="w-[60%] mx-auto ">
    <CardHeader>
      <CardTitle>个人资料</CardTitle>
      <CardDescription>请填写真实信息</CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-2">
            <Label for="CName">中文姓名</Label>
            <Input id="CName" placeholder="请输入中文姓名" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="EName">英文姓名</Label>
            <Input id="EName" placeholder="请输入英文姓名" />
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
            <Label for="phone">电话号码</Label>
            <Input id="phone" placeholder="请输入电话号码" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="address">收件人地址</Label>
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
      <form>
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="email">电子邮件</Label>
            <Input disabled id="email" placeholder="example@gmail.com" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Button>更改密码</Button>
          </div>
          <hr>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button variant="outline">
        取消
      </Button>
      <Button>更改</Button>
    </CardFooter>
  </Card>
</template>