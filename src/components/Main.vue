<template>
  <div class="social-icons pb-4 flex justify-center space-x-4 mt-4">
    <Button variant="outline" size="icon" class="rounded-full">
      <Icon icon="fe:facebook" class="w-[18px] h-[18px]" style="color: #1877f2" :ssr="true" />
    </Button>
    <Button variant="outline" size="icon" class="rounded-full">
      <Icon icon="hugeicons:instagram" class="w-[18px] h-[18px]" style="color: #1877f2" :ssr="true" />
    </Button>
    <Button class="flex items-center space-x-2 bg-[#1877f2] rounded-full p-3 h-[38px]">
      <p class="text-[16px] text-white">私讯</p>
      <Icon icon="mingcute:messenger-line" style="color: white; font-size: 16px;" :ssr="true" />
    </Button>
  </div>
</template>

<script setup>
import {Icon} from '@iconify/vue'
import { Button } from '@/components/ui/button'
</script>