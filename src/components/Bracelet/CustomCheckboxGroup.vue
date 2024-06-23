<template>
  <div>
    <label v-for="option in options" :key="option.value">
      <input type="checkbox" :value="option.value" v-model="selectedOptions">
      {{ option.label }}
    </label>
  </div>
</template>

<script setup>
import { ref, watch, toRefs, defineProps } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => []
  }
});

const { options, modelValue } = toRefs(props);

const selectedOptions = ref([...modelValue.value]);

watch(selectedOptions, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>