<template>
    <div class="bg-[#F6EAFF]">
        <div class="container pl-2 pb-3">
            <button class="nav-item text-xl" @click="navigate('ghostSeries')">友鬼系列</button>
            <button class="nav-item text-xl" @click="navigate('fiveColoredBracelet')">五色绳</button>
            <button class="nav-item text-xl" @click="navigate('about')">关于</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
};
</script>
  
  <style scoped>
  .container {
    max-width: 375px;
    margin: 0 auto;
    position: relative; /* Make container a positioning context */
  }
  
  @media (min-width: 768px) {
    .container {
      max-width: 600px;
    }
  }
  
  .navigation-menu {
    background-color: #f5f5f5;
  }
  
  .nav-item {
    padding: 10px 20px;
    cursor: pointer;
    color: #333;
    font-weight: bold;
  }
  
  .nav-item:hover {
    color: #fff;
    background-color: #333;
  }
  </style>