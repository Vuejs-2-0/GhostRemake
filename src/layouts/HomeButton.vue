<template>
    <Button @click="handleGoHomeClick" class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 px-4 py-2 bg-white hover:bg-salmon-500 hover:text-white text-salmon-500 text-lg duration-300">
      返回主页
    </Button>
  </template>
  
  <script setup>
  import { onBeforeUnmount} from 'vue';
  import { Button } from "@/components/ui/button";
  
  const handleGoHomeClick = () => {
    window.onbeforeunload = () => true;
    window.location.href = "/";
  };
  
  onBeforeUnmount(() => {
    window.onbeforeunload = null;
  });
  </script>