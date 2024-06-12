<template>
    <Dialog>
      <DialogTrigger>
        <div class="flex justify-between items-center p-4 text-lg text-[#B551F3]">
            <button>注册帐号</button>
        </div>
        
      </DialogTrigger>
  
      <DialogContent class="sm:max-w-[425px] grid grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90vh]">
        <div v-if="isSignupOpen" class="grid gap-4 py-4 overflow-y-auto px-6">
            <form id="signup_form" method="POST" class="grid gap-4 py-4 overflow-y-auto px-6">
            <div class="flex justify-center w-full pt-4 pb-4">
                <DialogTitle class="text-2xl font-bold text-center">注册帐号</DialogTitle>
            </div>
            <input hidden name="operation" value="signup">
            <div class="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor="signup_email" class="text-base">邮箱地址 - Email Address</Label>
                <Input type="email" id="signup_email" placeholder="Email" class="border rounded p-2"/>
            </div>
            <div class="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor="signup_password" class="text-base">密码 - Password</Label>
                <Input type="password" id="signup_password" placeholder="Password" class="border rounded p-2"/>
            </div>
            <div class="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor="cfm_password" class="text-base">确认密码 - Confirm Password</Label>
                <Input type="password" id="cfm_password" placeholder="Confirm Password" class="border rounded p-2"/>
            </div>
            <Button type="submit" class="text-lg mt-4 text-white rounded-xl font-semibold">注册帐号</Button>
            </form>
            <div class="flex justify-center w-full">
                <p class="px-6 pb-4">已有帐号？<a @click="switchToLogin" href="#" class="text-[#B551F3]">立即登录</a></p>
            </div>
        </div>
        <div v-else class="grid gap-4 py-4 overflow-y-auto px-6">
            <form id="login_form" method="POST" class="grid gap-4 py-4 overflow-y-auto px-6">
            <div class="flex justify-center w-full pt-4 pb-4">
                <DialogTitle class="text-2xl font-bold text-center">登录帐号</DialogTitle>
            </div>
            <input hidden name="operation" value="signup">
            <div class="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor="login_email" class="text-base">邮箱地址 - Email Address</Label>
                <Input type="email" id="login_email" placeholder="Email" class="border rounded p-2"/>
            </div>
            <div class="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor="login_password" class="text-base">密码 - Password</Label>
                <Input type="password" id="login_password" placeholder="Password" class="border rounded p-2"/>
            </div>
            <Button type="submit" class="text-lg mt-4 text-white rounded-xl font-semibold">登录帐号</Button>
            </form>
            <div class="flex justify-center w-full">
                <p class="px-6 pb-4">没有帐号？<a @click="switchToSignup" href="#" class="text-[#B551F3]">立即注册</a></p>
            </div>
        </div>  
      </DialogContent>
    </Dialog>
  </template>
  <!-- Try dc github push -->
  <script setup lang="ts">
  import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
  } from '@/components/ui/dialog';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import { Button } from "@/components/ui/button";

    import { ref } from 'vue';

    const isSignupOpen = ref(true);
    const isLoginOpen = ref(false);

    const switchToLogin = () => {
        isSignupOpen.value = false;
        isLoginOpen.value = true;
    };

    const switchToSignup = () => {
        isSignupOpen.value = true;
        isLoginOpen.value = false;
    };
  </script>
  
  <style scoped>
  .featured-product {
    max-width: 350px;
    margin: 0 auto;
  }
  </style>