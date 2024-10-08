<script setup>
import { computed, onMounted } from 'vue';
import { useCartStore } from '~/store/cart';

const cartStore = useCartStore();
const totalItem = computed(() => cartStore.totalItem);

onMounted(async () => {
  try {
    const cartId = localStorage.getItem('cartId');
    cartStore.setCartId(cartId);
    await cartStore.fetchCart(cartId);
  } catch (error) {
    console.error(error);
    
  }
});
</script>
<template>
  <a href="/bag" v-if="totalItem > 0" class="my-auto">
    <div class="rounded-none bg-[#21e053] text-black w-8 h-8 flex">
      <span class="m-auto text-[12px]">{{ totalItem }} </span>
    </div>
  </a>  
  <a v-else href="/bag" class="my-auto">
    <div class="relative">
      <img src="/icon/bag.svg" alt="bag" class="w-6 h-6 my-auto top-0" />
    </div>
  </a>
</template>