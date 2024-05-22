<template>
    <div class="navbar flex justify-between items-center p-4 bg-white border-b border-gray-300">
      <a href="#" class="menu-icon text-2xl text-gray-800">
        <i class="fas fa-bars"></i>
      </a>
      <a href="#" class="profile-icon text-2xl text-gray-800">
        <i class="fas fa-user-circle"></i>
      </a>
    </div>
  </template>
  
<script>
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

export default {
props: {
    profileName: {
    type: String,
    required: true
    }
}

};
</script>