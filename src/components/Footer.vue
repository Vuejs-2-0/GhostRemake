<template>
    <footer class="bg-purple-500 flex justify-between pt-4 pb-4">
      <div class="footer-item">
        <a href="/link-for-left-button" class="flex items-center">
          <span class="ml-2">购物车</span>
        </a>
      </div>
      <div class="footer-item">
        <a href="/link-for-right-button" class="flex items-center">
          <span class="ml-2">请添加商品...</span>
        </a>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
<style scoped>
.footer-item a {
    display: flex;
    align-items: center;
    color: white; /* Adjust color as needed */
}

footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%; /* Aligns width with the container */
  color: white;
  text-align: center;
  padding: 10px 0;
}
  </style>