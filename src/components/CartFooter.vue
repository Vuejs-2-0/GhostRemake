<template>
  <div class="fixed bottom-3 w-full flex justify-center items-center z-50">
    <div class="w-full max-w-sm grid grid-cols-[auto_1fr] justify-center items-center gap-2">
      <Menubar v-model:modelValue="menuIsOpen" class="w-full h-full bg-transparent border-none" >
        <MenubarMenu >
          <MenubarTrigger class="w-12 aspect-square border-none focus:bg-transparent bg-transparent p-0 m-0 rounded-xl duration-300 transition-all" :class="[menuIsOpen?'scale-95 shadow-xl':'scale-100']" >

            <button :class="[menuIsOpen?'bg-salmon text-white scale-95':'bg-white hover:bg-salmon-300 hover:text-white text-salmon','w-full h-full  rounded-xl border flex justify-center items-center text-2xl  duration-300 transition-all scale-100']">
              <iconify-icon class="text-2xl " icon="iconamoon:menu-burger-horizontal-duotone"></iconify-icon>
            </button>
            
          </MenubarTrigger>
          <MenubarContent>
            <div v-if="!userExist">
              <MenubarItem v-if="!userExist">
                <Button variant="ghost" class="w-full justify-start" @click="openDialog">注册帐号</Button>
              </MenubarItem>
              <MenubarItem v-if="!userExist">
                <Button variant="ghost" class="w-full justify-start" @click="openDialog2">登入帐号</Button>
              </MenubarItem>
            </div>
            <div v-else>
              <a @click="navigateToPath('/account')">
                <MenubarItem >
                    <span>个人资料</span>
                </MenubarItem>
              </a>
              <a @click="navigateToPath('/history')">
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

      <Dialog v-model:open="isDialogOpen2">
        <Login />
      </Dialog>

      <div v-if="totalItems > 0">
      
      <Dialog2 :form="props.form" :products="props.products" :userId="props.userId" :localCart="props.localCart" :userEmail="props.email" :userMetadata="userMetadata">
        <Button class="w-full bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border border-white shadow-xl flex justify-between items-center duration-300 transition-all scale-100 active:scale-95 p-3">
          <div class="flex justify-start items-center text-xl">
            <iconify-icon class="text-2xl mr-2" icon="ion:cart"></iconify-icon>
            <p>已选 {{totalItems}} 件</p>
          </div>
          <div class="flex justify-end items-center space-x-2">
            <p>去结账</p>
            <iconify-icon class="text-2xl mr-2" icon="mdi:arrow-right-bold"></iconify-icon>
          </div>
        </Button>
      </Dialog2>
      </div>
      <div v-else>
        <Button class="w-full bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border border-white shadow-xl flex justify-between items-center duration-300 transition-all scale-100 active:scale-95 p-3">
          <div class="flex justify-start items-center text-xl">
            <iconify-icon class="text-2xl mr-2" icon="ion:cart"></iconify-icon>
            <p>请先添加商品</p>
          </div>
        </Button>
      </div>
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
  import SignUp from './Authentication/SignUp2.vue';
  import Login from './Authentication/Login.vue';
  import { defineProps, ref, computed} from 'vue';
  import { cart } from '@/stores/cart';
  import { useStore } from '@nanostores/vue';

  const $cart = useStore(cart);

  const totalItems = computed(() => {
    if (!$cart.value.items) return 0;

    let items = Object.entries($cart.value.items);

    return items.reduce((acc, [item_id, quantity]) => {
      return acc + quantity;
    }, 0);
  });

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
  },
  userId:{
    type: String,
    required: true
  },
  localCart: {
    type: Object,
    required: true
  },
  userMetadata: {
    type: Object,
    required: false
  }
  });

  const isDialogOpen = ref(false);
  const isDialogOpen2 = ref(false);

  const menuIsOpen = ref(null);

  const openDialog = () => {
    isDialogOpen.value = true;
  };

  const openDialog2 = () => {
    isDialogOpen2.value = true;
  };

  const navigateToPath = (path) => {
    window.swup.navigate(path)
  }

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
          // console.log('Form submitted successfully');
          window.location.reload();
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


</script>
