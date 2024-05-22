<template>
  <div>
    <div class="navbar flex justify-between items-center p-4 bg-white border-b border-gray-300">
      <button class="menu-icon text-2xl text-gray-800" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>
      <button class="profile-icon text-2xl text-gray-800">
        <i class="fas fa-user-circle"></i>
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
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .container {
    max-width: 600px;
  }
}

</style>