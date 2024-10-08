<script setup>
import { ref } from "vue";
import { GET_CUSTOMER } from "~/queries/getCustomer";
const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const mode = ref(false);
onMounted(() => {
  if (!localStorage.getItem("accessToken")) {
    navigateTo("/login");
  }
});
const activeTab = ref("account");
const setActiveTab = (tab) => {
  activeTab.value = tab;
};
const userInfo = ref({
  firstName: localStorage.getItem("firstName") || "",
  email: localStorage.getItem("email") || "",
});

const handleLogout = () => {
  navigateTo("/");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("firstName");
  localStorage.removeItem("email");
  window.location.reload();
};

const orders = ref([]);
const numberOfOrder = ref(0);
onMounted(async () => {
  try {
    if (localStorage.getItem("accessToken")) {
      const { data } = await $shopifyClient.request(GET_CUSTOMER, {
        variables: {
          customerAccessToken: localStorage.getItem("accessToken"),
        },
      });
      orders.value = data.customer.orders.nodes;
      numberOfOrder.value = data.customer.numberOfOrders;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>
<template>
  <div class="_body space-y-8">
    <div>
      <h2 class="text-[20px] uppercase text-center">
        Welcome, {{ userInfo.firstName }}
      </h2>
    </div>
    <div
      role="tablist"
      class="tabs flex max-w-full justify-center md:space-x-4 md:px-0 bg-transparent uppercase font-sans border-b-[1px] border-black pb-4"
    >
      <a
        role="tab"
        class="tab tab-xl text-black"
        :class="{ 'active underline': activeTab === 'account' }"
        @click="setActiveTab('account')"
        >My Account</a
      >
      <a
        role="tab"
        class="tab tab-xl text-black"
        :class="{ 'active underline': activeTab === 'orders' }"
        @click="setActiveTab('orders')"
        >Orders</a
      >
      <a
        role="tab"
        class="tab tab-xl text-black"
        :class="{ 'active underline': activeTab === 'profile' }"
        @click="setActiveTab('profile')"
        >Profile</a
      >
      <a role="tab" class="tab tab-xl text-black" @click="handleLogout()"
        >Log Out</a
      >
    </div>
    <div class="grid">
      <MyAccount v-if="activeTab === 'account'" creditCards="" />
      <OrderHistory
        v-if="activeTab === 'orders'"
        :numberOfOrder="Number(numberOfOrder)"
        :orders="orders"
      />
      <Profile v-if="activeTab === 'profile'" />
    </div>
  </div>
</template>
