<script setup lang='ts'>
import { Button } from '@/components/ui/button'
import ChangePassword from "../Profile/ChangePassword.vue";

import ChangePersonalInfo from "../Profile/ChangePersonalInfo.vue";
import ChangeDeliveryInfo from "../Profile/ChangeDeliveryInfo.vue";

import { ref, toRefs } from 'vue';

const props = defineProps(["chineseName","englishName","phoneNumber", "address", "email"])
const { chineseName, englishName, phoneNumber, address, email } = toRefs(props)
</script>

<template>
  <div class="w-full max-w-sm py-4 flex justify-between items-center">
    
    <article class="w-full bg-white p-4 rounded-3xl shadow-lg shadow-slate-100/5">
    
        <div class="w-full mt-2 ml-2 mb-2">

          <div class="flex justify-between mr-4">
            <strong class="text-salmon-400 text-2xl tracking-wide">个人资料</strong>
            <ChangePersonalInfo :chineseName="chineseName" :englishName="englishName"/>
          </div>
            
          <div class="grid items-center w-full gap-4 mt-4">
            <div class="flex flex-col space-y-2">
              <h1 class="font-bold">中文姓名</h1>
              <p>{{ chineseName }}</p>
            </div>
            <div class="flex flex-col space-y-1.5">
              <h1 class="font-bold">英文姓名</h1>
              <p>{{ englishName }}</p>
            </div>
          </div>

        </div>

    </article>

  </div>

  <div class="w-full max-w-sm py-4 flex justify-between items-center">
    
    <article class="w-full bg-white p-4 rounded-3xl shadow-lg shadow-slate-100/5">
    
        <div class="w-full mt-2 ml-2 mb-2">

          <div class="flex justify-between mr-4">
            <strong class="text-salmon-400 text-2xl tracking-wide">运输资料</strong>
            <ChangeDeliveryInfo :phoneNumber="phoneNumber" :address="address"/>
          </div>
            
          <div class="grid items-center w-full gap-4 mt-4">
            <div class="flex flex-col space-y-2">
              <h1 class="font-bold">电话号码</h1>
              <p>{{ phoneNumber }}</p>
            </div>
            <div class="flex flex-col space-y-1.5">
              <h1 class="font-bold">收件人地址</h1>
              <p>{{ address }}</p>
            </div>
          </div>

        </div>

    </article>

  </div>

  <div class="w-full max-w-sm py-4 flex justify-between items-center">
    
    <article class="w-full bg-white p-4 rounded-3xl shadow-lg shadow-slate-100/5">
    
        <div class="w-full mt-2 ml-2 mb-2">

          <div class="flex justify-between mr-4">
            <strong class="text-salmon-400 text-2xl tracking-wide">账户资料</strong>
            <ChangePassword />
          </div>
            
          <div class="grid items-center w-full gap-4 mt-4">
            <div class="flex flex-col space-y-2">
              <h1 class="font-bold">电子邮件</h1>
              <p>{{ email }}</p>
            </div>
          </div>

        </div>

    </article>

  </div>
  <!-- <Card class="w-[90%] sm:w-[60%] lg:w-[40%] 2xl:w-[30%] mx-auto border-black">

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
  </Card> -->
</template>