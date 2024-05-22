<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex container">
    <div class="w-64 bg-white border-r border-gray-600">
      <ul class="mt-4">
        <li class="flex items-center p-4 border-b border-gray-300">
          <img src="/img/ghostBook.png" alt="Logo" class="w-8 h-8 mr-3"/>
          <span>真的有鬼</span>
        </li>
        <li class="flex items-center p-4 border-b border-gray-300">
          <i class="fas fa-home mr-3"></i>
          <span>主页</span>
        </li>
        <li class="flex items-center p-4 border-b border-gray-300">
          <i class="fas fa-box mr-3"></i>
          <span>产品</span>
        </li>
        <li class="flex items-center p-4 border-b border-gray-300">
          <i class="fas fa-shopping-cart mr-3"></i>
          <span>购物车</span>
        </li>
        <li class="flex items-center p-4 border-b border-gray-300">
          <i class="fas fa-history mr-3"></i>
          <span>购买记录</span>
        </li>
        <li class="flex items-center p-4 border-b border-gray-300">
          <i class="fas fa-credit-card mr-3"></i>
          <span>支付方式</span>
        </li>
        <li class="flex items-center p-4 border-b border-gray-300">
          <i class="fas fa-sign-out-alt mr-3"></i>
          <span>登出</span>
        </li>
      </ul>
    </div>
    <div class="flex-grow" @click="closeMenu"></div>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.min.css'; 

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeMenu() {
      this.$emit('close');
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