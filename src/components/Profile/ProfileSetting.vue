<script setup lang='ts'>
import { Button } from '@/components/ui/button'
import ChangePassword from "../Profile/ChangePassword.vue";

import ChangePersonalInfo from "../Profile/ChangePersonalInfo.vue";
import ChangeDeliveryInfo from "../Profile/ChangeDeliveryInfo.vue";

import { ref, toRefs } from 'vue';
const props = defineProps(["user"]);
const { user } = toRefs(props);

</script>

<template>
  <div class="w-full flex justify-center items-center flex-col">
    <div class="w-full max-w-sm py-4 flex justify-between items-center">
      <article class="w-full bg-white p-4 rounded-3xl shadow-lg shadow-slate-100/5">
        <div class="w-full mt-2 ml-2 mb-2">
          <div class="flex justify-between mr-4">
            <strong class="text-salmon-400 text-2xl tracking-wide">账户资料</strong>
          </div>
          <div class="grid items-center w-full gap-4 mt-4">
            <div class="flex flex-col space-y-2">
              <h1 class="font-bold">电子邮件</h1>
              <p>{{ user.email }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="w-full max-w-sm py-4 flex justify-between items-center">
      <article class="w-full bg-white p-4 rounded-3xl shadow-lg shadow-slate-100/5">
        <div class="w-full mt-2 ml-2 mb-2">
          <div class="flex justify-between mr-4">
            <strong class="text-salmon-400 text-2xl tracking-wide">个人资料</strong>
            <ChangePersonalInfo :user="user" />
          </div>
            
          <div class="grid items-center w-full gap-4 mt-4">
            <div class="flex flex-col space-y-2">
              <h1 class="font-bold">中文姓名</h1>
              <p>{{ user?.metadata?.chineseName }}</p>
            </div>
            <div class="flex flex-col space-y-1.5">
              <h1 class="font-bold">英文姓名</h1>
              <p>{{ user?.metadata?.englishName }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="w-full max-w-sm py-4 flex justify-between items-center">
      <article class="w-full bg-white p-4 rounded-3xl shadow-lg shadow-slate-100/5">
        <div class="w-full mt-2 ml-2 mb-2">
          <div class="flex justify-between mr-4">
            <strong class="text-salmon-400 text-2xl tracking-wide">物流资料</strong>
            <ChangeDeliveryInfo :user="user"/>
          </div>
          <div class="grid items-center w-full gap-4 mt-4">
            <div class="flex flex-col space-y-2">
              <h1 class="font-bold">电话号码</h1>
              <p>{{ user?.metadata?.phoneNumber }}</p>
            </div>
            <div class="flex flex-col space-y-1.5">
              <h1 class="font-bold">收件人地址</h1>
              <p>{{ user?.metadata?.address }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>