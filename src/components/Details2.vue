<script setup lang="ts">
import { ref } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Define props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

// Define emits
const emit = defineEmits(['close']);

const quantity = ref(0);

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 0) quantity.value--;
};

const addToCart = () => {
  if (quantity.value === 0) {
    quantity.value = 1;
  } else {
    alert(`${props.product.name}: ${quantity.value} added to cart`);
  }
};

const close = () => {
  emit('close'); // Emit the 'close' event
};
</script>

<template>
  <Dialog v-if="show">
    <DialogTrigger>
      Edit Profile
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ props.product.name }}</DialogTitle>
        <button @click="close">X</button> <!-- Close button emits 'close' event -->
        <DialogDescription>
          {{ props.product.description }}
        </DialogDescription>
      </DialogHeader>

      <div>
        <button @click="decreaseQuantity">-</button>
        <span>{{ quantity }}</span>
        <button @click="increaseQuantity">+</button>
      </div>

      <DialogFooter>
        <button @click="addToCart">Add to Cart</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
