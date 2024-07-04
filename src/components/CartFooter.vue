<template>
  <div class="fixed bottom-3 w-full flex justify-center items-center z-50">
    <div class="w-full max-w-sm flex justify-start items-center space-x-2">
      <Menubar >
        <MenubarMenu >
          <MenubarTrigger >
            <div class=" bg-white rounded-2xl min-h-0 h-auto text-salmon flex justify-center items-center text-xl  hover:text-salmon-500  duration-300 transition-all scale-100 active:scale-95">
              <iconify-icon class="text-2xl " icon="iconamoon:menu-burger-horizontal-duotone"></iconify-icon>
            </div>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem v-if="!userExist">
              <Button variant="ghost" class="w-full justify-start" @click="openDialog">注册帐号</Button>
            </MenubarItem>
            <div v-else>
              <a href="/setting">
                <MenubarItem >
                    <span>个人资料</span>
                </MenubarItem>
              </a>
              <a href="/history">
                <MenubarItem >
                    <span>购买记录</span>
                </MenubarItem>
              </a>
              <MenubarSeparator />
              <MenubarItem @click="handleLogout">登出</MenubarItem>
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>


      <Dialog v-model:open="isDialogOpen">
      <SignUp />
    </Dialog>
      
      <Dialog2 :form="props.form" :products="props.products">
        <Button class="w-full bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border border-white shadow-xl flex justify-between items-center duration-300 transition-all scale-100 active:scale-95 p-3">
              <div class="flex justify-start items-center text-xl">
                <iconify-icon class="text-2xl mr-2" icon="ion:cart"></iconify-icon>
                <p>已选 <IteminCart client:only="vue"/> 件</p>
              </div>
  
              <div class="flex justify-end items-center space-x-2">
                <p>去结账</p>
                <iconify-icon class="text-2xl mr-2" icon="mdi:arrow-right-bold"></iconify-icon>
              </div>
            </Button>
      </Dialog2>
    </div>
  </div>
</template>

<script setup>
  import { Button } from "@/components/ui/button";
  import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
  import Dialog2 from "@/components/CheckoutDialog/Dialog.vue";
  import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from '@/components/ui/menubar'
  import SignUp from './SignUp2.vue';
  import { defineProps, ref } from 'vue';
  import IteminCart from '@/components/Footer/ItemInCart.vue';

  const props = defineProps({
  products: {
    type: Object,
    required: true
  },
  form: {
    type: Object,
    required: true
  },
  userExist: {
    type: Boolean,
    required: true
  },
  email: {
    type: String,
    required: true
  }
  });


  const isDialogOpen = ref(false);

  const openDialog = () => {
    isDialogOpen.value = true;
  };

  const handleLogout = async () => {
    const formData = new FormData();
    const operation = 'logout';
    formData.append('operation', operation);
    formData.append('email', props.email);
    
    try {
      const response = await fetch(window.location.pathname, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
          console.log('Form submitted successfully');
          window.location.reload();
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


</script>
