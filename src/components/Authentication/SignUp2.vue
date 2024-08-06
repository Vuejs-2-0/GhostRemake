<template>
      <DialogContent class="sm:max-w-[425px] grid grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90vh]">
        <DialogDescription></DialogDescription>
        <div v-if="isSignupOpen" class="grid gap-4 py-4 overflow-y-auto px-6">
            <form @submit.prevent="handleSubmit('signup')" class="grid gap-4 py-4 overflow-y-auto px-6">
              <div class="flex justify-center w-full pt-4 pb-4">
                  <DialogTitle class="text-2xl font-bold text-center">注册帐号</DialogTitle>
              </div>
              <input type="hidden" name="operation" value="signup" />
              <div class="grid w-full max-w-sm items-center gap-1.5 mb-2">
                  <Label htmlFor="signup_email" class="text-base">邮箱地址 - Email Address</Label>
                  <Input type="email" id="signup_email" v-model="email" placeholder="Email" class="border rounded p-2" required />
              </div>
              <div class="grid w-full max-w-sm items-center gap-1.5 mb-2">
                  <Label htmlFor="signup_password" class="text-base">密码 - Password</Label>
                  <Input type="password" id="signup_password" v-model="password" placeholder="Password" class="border rounded p-2" required autocomplete="true" />
              </div>
              <div class="grid w-full max-w-sm items-center gap-1.5 mb-2">
                  <Label htmlFor="cfm_password" class="text-base">确认密码 - Confirm Password</Label>
                  <Input type="password" id="cfm_password" v-model="confirmPassword" placeholder="Confirm Password" class="border rounded p-2" required autocomplete="true" />
              </div>
              <Button type="submit" class="text-lg mt-4 text-white rounded-xl font-semibold">注册帐号</Button>
            </form>
            <div class="flex justify-center w-full">
                <p class="px-6 pb-4">已有帐号？<a @click.prevent="switchToLogin" href="#" class="text-salmon">立即登录</a></p>
            </div>
        </div>
        
        <div v-else class="grid gap-4 py-4 overflow-y-auto px-6">
            <form @submit.prevent="handleSubmit('login')" class="grid gap-4 py-4 overflow-y-auto px-6">
            <div class="flex justify-center w-full pt-4 pb-4">
                <DialogTitle class="text-2xl font-bold text-center">登录帐号</DialogTitle>
            </div>
            <input type="hidden" name="operation" value="login" />
            <div class="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor="login_email" class="text-base">邮箱地址 - Email Address</Label>
                <Input type="email" id="login_email" v-model="email" placeholder="Email" class="border rounded p-2" required autocomplete="true" />
            </div>
            <div class="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor="login_password" class="text-base">密码 - Password</Label>
                <Input type="password" id="login_password" v-model="password" placeholder="Password" class="border rounded p-2" required autocomplete="true" />
            </div>
            <Button type="submit" class="text-lg mt-4 text-white rounded-xl font-semibold">登录帐号</Button>
            </form>
            <div class="flex justify-center w-full">
                <p class="px-6 pb-4">没有帐号？<a @click.prevent="switchToSignup" href="#" class="text-salmon">立即注册</a></p>
            </div>
        </div>  
      </DialogContent>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";

const isSignupOpen = ref(true);
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const switchToLogin = () => {
  isSignupOpen.value = false;
};

const switchToSignup = () => {
  isSignupOpen.value = true;
};

const handleSubmit = async (operation: string) => {
  const formData = new FormData();
  formData.append('operation', operation);
  formData.append('email', email.value);
  formData.append('password', password.value);

  if (operation === 'signup') {
    
    let existingUserResponse = await fetch("/api/check_email.json", {
      method: "POST",
      body: JSON.stringify({
        email: email.value
      }),
    });
  
    existingUserResponse = await existingUserResponse.json() as any;
    let exist = existingUserResponse?.exist;
    if(exist) {
      alert('This email is already registered.');
      email.value = null;
      password.value = null;
      confirmPassword.value = null;
      return;
    }

    if(password.value !== confirmPassword.value){
      alert('Passwords do not match');
      password.value = null;
      confirmPassword.value = null;
      return;
    }
  }

  try {
    const response = await fetch(window.location.pathname, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
        window.location.reload();
    } else {
      console.error('Form submission failed:', response.statusText);
      email.value = null;
      password.value = null;
      alert("Invalid User Email or Password");
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
</script>