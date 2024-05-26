<template>
  <div>
    <div class="navbar flex justify-between items-center p-4">
      <button class="menu-icon text-lg text-[#B551F3]" @click="toggleMenu">
        <p>账户设置</p>
      </button>
      <button class="profile-icon text-lg text-[#B551F3]">
        <p>购买记录</p>
      </button>
    </div>
    <LeftNavbar :isOpen="isMenuOpen" @close="toggleMenu"/>
  </div>
</template>

<script>
import LeftNavbar from './LeftNavbar.vue';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

export default {
  components: {
    LeftNavbar
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
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