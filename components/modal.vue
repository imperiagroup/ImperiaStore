<script setup>
defineProps({
  name: String,
  action: String,
  buttonText: String,
  buttonStyle: String,
  boxHeader: String,
  icon: String,
  iconStyle: String,
  modalStyle: String,
});
</script>
<template>
  <p class="text-center font-normal" :class="buttonStyle" :onclick="action">
    <Icon v-if="icon" :name="icon" :class="iconStyle" /> {{ buttonText }}
  </p>
  <dialog :id="name" class="modal">
    <div :class="modalStyle">
      <div class="border-b-2 border-black">
        <form method="dialog">
        </form>
        <h3 class="text-lg uppercase">{{ boxHeader }}</h3>
      </div>
      <slot />
    </div>
  </dialog>
</template>
