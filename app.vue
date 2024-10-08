<script setup>
import { CREAT_CART } from "~/queries/mutateCart";
import { GET_CUSTOMER } from "./queries/getCustomer";
const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const cartId = ref("");
const isCartExist = ref(false);
onMounted(async () => {
  try {
    if (localStorage.getItem("cartId")) {
      cartId.value = sessionStorage.getItem("cartId");
      isCartExist.value = true;
    } else {
      const { data } = await $shopifyClient.request(CREAT_CART);
      cartId.value = data.cartCreate.cart.id;
      localStorage.setItem("cartId", cartId.value);
    }
    if (localStorage.getItem("accessToken")) {
      const { data } = await $shopifyClient.request(GET_CUSTOMER, {
        variables: {
          customerAccessToken: localStorage.getItem("accessToken"),
        },
      });
      localStorage.setItem("firstName", data.customer.firstName);
      localStorage.setItem("email", data.customer.email);

    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

useSeoMeta({
  description: "Luxury Ready-to-Wear Designed in Atlanta."
})
</script>

<template>
  <DrawerNav />
  <NuxtPage />
  <Footer />
</template>
