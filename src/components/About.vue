<script setup lang="ts">
import { ref } from 'vue'
// import VueEasyLightbox from 'vue-easy-lightbox'

// const visible = ref(false)
// const imgSrc = ref('')  // This will store the source of the image to display

// const showLightbox = (src) => {
//   imgSrc.value = src
//   visible.value = true
// }
</script>

<template>
  <h1 class="title">关于</h1>
  <div class="section section-large">
    <img src="img/horizontal.png" alt="Horizontal" class="object-cover cursor-pointer">
  </div>
  <div class="section-row">
    <div class="section section-small section-col">
      <img src="img/temporaryimg.png" alt="Temporary" class="object-cover cursor-pointer">
    </div>
    <div class="section section-small section-col">
      <img src="img/temporaryimg.png" alt="Temporary" class="object-cover cursor-pointer">
    </div>
  </div>
  <div class="section section-large">
    <img src="img/horizontal.png" alt="Horizontal" class="object-cover cursor-pointer">
  </div>
  
  <!-- Vue Easy Lightbox Component -->
  <!-- <VueEasyLightbox 
    :visible="visible" 
    :imgs="[imgSrc]" 
    @hide="visible = false" 
  /> -->
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.section {
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
}

.section-large {
  height: 300px;
}

.section-small {
  height: 150px;
}

.section-row {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.section-col {
  flex: 1;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer; /* Add cursor pointer to indicate clickability */
}
</style>
