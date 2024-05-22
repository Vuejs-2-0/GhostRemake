<template>
  <div class="profile-container text-center p-4">
    <img
      class="profile-img mx-auto rounded-full"
      :src="profileImg"
      alt="Profile Image"
    />
    <h2 class="profile-name text-xl mt-2">{{ profileName }}</h2>
    <div class="social-icons flex justify-center space-x-4 mt-4">
      <a href="#" class="text-2xl text-gray-800">
        <i class="fab fa-facebook"></i>
      </a>
      <a href="#" class="text-2xl text-gray-800">
        <i class="fab fa-instagram"></i>
      </a>
      
      <a href="#" class="text-2xl text-gray-800">
        <i class="fab fa-facebook-messenger"></i>
      </a>
      <a href="#" class="text-2xl text-gray-800">
        <i class="fab fa-whatsapp"></i>
      </a>
      <a href="#" class="text-2xl text-gray-800">
        <i class="fab fa-telegram"></i>
      </a>
    </div>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.min.css"; 

export default {
  name: "Main",
  data() {
    return {
      profileImg: "../img/profile.png",
      profileName: "真的友鬼",
    };
  },
};
</script>
