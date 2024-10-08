<script setup>
defineProps({
  src: String,
});
</script>
<template>
<!-- You can open the modal using ID.showModal() method -->
<button class="m-0 p-0" onclick="my_modal_3.showModal()">
    <span class="label-text uppercase underline cursor-pointer">Size Guide</span>
</button>
<dialog id="my_modal_3" class="modal">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-1 hover:bg-transparent">✕</button>
    </form>
    <h3 class="text-lg font-bold text-center">Size Guide</h3>
    <img :src="src" class="py-2" />
  </div>
</dialog></template>