<template>
  <div class="custom-date-input">
    <input
      type="date"
      class="w-full left-0 custom-date-input md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
      v-model="selectedDate"
      @input="handleInput"
    />
    <span v-if="isIPhone && !selectedDate" class="placeholder">DOB</span>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String, // or Date depending on your requirement
      default: "",
    },
  },
  data() {
    return {
      selectedDate: this.modelValue,
      isIPhone: false,
    };
  },
  mounted() {
    // Detect if the user agent is an iPhone
    this.isIPhone = /(iPhone|iPod)/.test(navigator.userAgent);
  },
  methods: {
    handleInput(event) {
      this.selectedDate = event.target.value;
      this.$emit("update:modelValue", this.selectedDate); // Emit the updated value
    },
  },
  watch: {
    modelValue(newValue) {
      this.selectedDate = newValue; // Update internal state when the prop changes
    },
  },
};
</script>

<style scoped>
.custom-date-input {
  position: relative;
}

.input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-align: left;
}

.placeholder {
  @apply md:text-[10px] text-[12px] uppercase;
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999; /* Set the color of the placeholder */
  pointer-events: none; /* Ensure the placeholder text doesn't interfere with input */
}
</style>
