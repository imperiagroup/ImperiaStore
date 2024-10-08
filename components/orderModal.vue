<script setup>
  defineProps({
    productName: String,
    productId : String,
  })
  const handleOpen = () => {
    orderModal.showModal();
  } 
  
  const handleClose = () => {
    orderModal.close();
  }
</script>
<template>
  <div class="form-control w-full px-2">
    <div @click="handleOpen()"
      class="btn btn-primary font-normal rounded-none w-full mt-4 z-40 top-90 border-1 border-black bg-black text-white text-md p-4 uppercase">
      <p class="text-center">notify me when available</p>
    </div>
  </div>
  <dialog id="orderModal" class="modal z-10">
    <div class="modal-box rounded-none">
      <form method="dialog">
        <button @click="handleClose()" class="btn btn-sm btn-circle btn-ghost hover:bg-transparent absolute right-4 md:right-5 top-1">
          ✕
        </button>
      </form>
      <h3 class="font-bold text-[12px] text-center uppercase">
        {{ productName }}
      </h3>
      <div id="orderForm" class="form-control py-4 w-full max-w-md mx-auto">
        <div class="klaviyo-form-Xet8g6 z-50"></div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="handleClose()">close</button>
    </form>
  </dialog>
</template>