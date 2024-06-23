<template>
  <div>
    <label>{{ label }}</label>
    <div v-for="option in options" :key="option.value">
      <input 
        type="checkbox" 
        :value="option.value" 
        :checked="selectedValues.includes(option.value)" 
        @change="toggleSelection(option.value)" 
      />
      <span>{{ option.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    options: Array,
    value: Array
  },
  computed: {
    selectedValues: {
      get() {
        return this.value || [];
      },
      set(newValue) {
        this.$emit('input', newValue);
      }
    }
  },
  methods: {
    toggleSelection(value) {
      const index = this.selectedValues.indexOf(value);
      if (index === -1) {
        this.selectedValues.push(value);
      } else {
        this.selectedValues.splice(index, 1);
      }
    }
  }
};
</script>