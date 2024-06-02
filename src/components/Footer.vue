<template>
  <div class="footer-container">
    <div class="footer-content container">
      <span>购物车 (5)</span>
      <div class="footer-actions">
        <span class="footer-link">查看</span>
        <button class="footer-button">付款</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    show: {
      count: Number,
    },
  },
};


</script>

<style scoped>
.footer-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #ccc;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-actions {
  display: flex;
  align-items: center;
}

.footer-link {
  color: #9b59b6;
  cursor: pointer;
  margin-right: 40px; /* Adjust this value as needed */
}

.footer-button {
  background-color: #f3e5f5;
  border: none;
  padding: 5px 10px;
  color: #9b59b6;
  border-radius: 5px;
}

.container {
  max-width: 375px;
  margin: 0 auto;
  position: relative; /* Make container a positioning context */
}

.navbar-container {
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  top: 0;
  z-index: 1000; /* Ensures the navbar is above other elements */
}

@media (min-width: 768px) {
  .container {
    max-width: 600px;
  }
}
</style>