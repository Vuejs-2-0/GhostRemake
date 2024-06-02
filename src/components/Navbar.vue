<template>
  <div class="bg-[#F6EAFF]">
    <div class="max-w-[375px] mx-auto pl-2 pb-3 md:max-w-[600px]">
      <NavigationMenu class="flex space-x-4 list-none">
        <NavigationMenuItem class="list-none">
          <button class="p-2 text-xl cursor-pointer font-bold text-gray-800 hover:text-white hover:bg-gray-800" @click="scrollToSection('mainSection')">友鬼系列</button>
        </NavigationMenuItem>
        <NavigationMenuItem class="list-none">
          <button class="p-2 text-xl cursor-pointer font-bold text-gray-800 hover:text-white hover:bg-gray-800" @click="scrollToSection('braceletSection')">五色绳</button>
        </NavigationMenuItem>
        <NavigationMenuItem class="list-none">
          <button class="p-2 text-xl cursor-pointer font-bold text-gray-800 hover:text-white hover:bg-gray-800" @click="scrollToSection('aboutSection')">关于</button>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  </div>
</template>

<script setup>
import { NavigationMenu, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { ref } from 'vue';

const isMenuOpen = ref(false);

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section){
    section.scrollIntoView({behavior: 'smooth'});
  }
};
</script>
