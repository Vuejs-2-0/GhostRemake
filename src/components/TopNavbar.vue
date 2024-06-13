<template>
  <div>
    <div class="navbar flex justify-between items-center p-4 text-lg text-[#B551F3]">
      <SignUp/>
      <a href="/history">
      <button class="profile-icon text-lg text-[#B551F3]">
        <p>购买记录</p>
      </button>
    </a>
    </div>
  </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import SignUp from './SignUp2.vue';

</script>
  
<style scoped>
.container {
  max-width: 375px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .container {
    max-width: 600px;
  }
}

</style>