<template>
  <div class="profile-container text-center p-4">
    <img
      class="profile-img mx-auto rounded-[20px] w-[111px] h-[111px]"
      :src="profileImg"
      alt="Profile Image"
    />
    <h2 class="profile-name text-xl mt-2">{{ profileName }}</h2>
    <div class="social-icons flex justify-center space-x-4 mt-4">
      <a href="#" class="text-2xl text-gray-800 w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center">
        <Icon icon="fe:facebook" class="w-[18px] h-[18px]" style="color: #1877f2" :ssr="true" />
      </a>
      <a href="#" class="text-2xl text-gray-800 w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center">
        <Icon icon="hugeicons:instagram" class="w-[18px] h-[18px]" style="color: #1877f2" :ssr="true" />
      </a>
      <a href="#" class="flex items-center space-x-2 bg-[#1877f2] rounded-full p-3 h-[38px]">
        <p class="text-[16px] text-white">私讯</p>
        <Icon icon="mingcute:messenger-line" style="color: white; font-size: 16px;" :ssr="true" />
      </a>
    </div>
  </div>
</template>

<script setup>
import {Icon} from '@iconify/vue'
</script>

<script>
export default {
  name: "Main",
  data() {
    return {
      profileImg: "/img/profile2.png",
      profileName: "真的有鬼",
    };
  },
};
</script>
