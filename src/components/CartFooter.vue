<template>
  <div class="fixed bottom-3 w-full flex justify-center items-center z-50">
    <div class="w-full max-w-sm flex justify-start items-center space-x-2">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Button class="p-3 bg-white rounded-2xl min-h-0 h-auto text-salmon flex justify-center items-center text-xl shadow-xl border border-gray-200 hover:bg-salmon-100 hover:text-salmon-500 hover:border-salmon duration-300 transition-all scale-100 active:scale-95">
              <iconify-icon class="text-2xl" icon="iconamoon:menu-burger-horizontal-duotone"></iconify-icon>
            </Button>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem v-if="!userExist">
              <SignUp/>
            </MenubarItem>
            <div v-else>
              <MenubarItem>
                <a href="/setting">
                  <span>个人资料</span>
                </a>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <form>
                  <input hidden name="operation" value="logout">
                  <button class="w-full" type="submit">
                      <span>登出</span>
                  </button>
                </form>
              </MenubarItem>
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      
      <Dialog :form="props.form" :products="props.products">
        <Button class="w-full bg-salmon-500 rounded-2xl min-h-0 h-auto hover:bg-salmon-500 border border-white shadow-xl flex justify-between items-center duration-300 transition-all scale-100 active:scale-95 p-3">
              <div class="flex justify-start items-center text-xl">
                <iconify-icon class="text-2xl mr-2" icon="ion:cart"></iconify-icon>
                <p>已选 5 件</p>
              </div>
  
              <div class="flex justify-end items-center space-x-2">
                <p>去结账</p>
                <iconify-icon class="text-2xl mr-2" icon="mdi:arrow-right-bold"></iconify-icon>
              </div>
            </Button>
      </Dialog>


      
    </div>
  </div>
</template>

<script setup>
  import { Button } from "@/components/ui/button";
  import Dialog from "@/components/CheckoutDialog/Dialog.vue";
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
  import { defineProps } from 'vue';

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
  }
  });

</script>
