<script setup>
import { GET_CUSTOMER_v2 } from "~/queries/getCustomer";
const { $shopifyClient } = useNuxtApp();
const orders = ref([]);
const numberOfOrders = ref(0);
onMounted(async () => {
  try {
    if (localStorage.getItem("accessToken")) {
      const { data } = await $shopifyClient.request(GET_CUSTOMER_v2, {
        variables: {
          customerAccessToken: localStorage.getItem("accessToken"),
        },
      });
      orders.value = data.customer.orders.nodes;
      numberOfOrders.value = data.customer.numberOfOrders;
    }
  } catch (err) {
    console.log("Error", err);
  }
});

defineProps({
  numberOfOrder: Number,
  orders: Array,
});
</script>
<template>
  <div class="py-10 mx-auto">
    <p>Order History</p>
  </div>
  <table
    v-if="numberOfOrder > 0"
    class="table min-w-max text-[10px] mb-6 uppercase border-black"
  >
    <thead>
      <tr>
        <th class="text-left px-0 font-thin">Item</th>
        <th class="text-right px-0 font-thin">Order Total</th>
      </tr>
    </thead>
    <tbody>
      <!-- Loop through orders -->
      <tr v-for="order in orders" :key="order.orderNumber">
        <td>
          <div class="flex items-center gap-3">
            <div class="w-32">
              <img
                src="https://cdn.shopify.com/s/files/1/0815/2046/0068/files/flatbacktransparent.png?v=1716971277"
              />

              <!-- {{ order.lineItems.edges[0].node.title }} -->
            </div>
            <div>
              <div>
                Order Status: {{ order.financialStatus }}
                <div class="opacity-50">
                  Date: {{ new Date(order.processedAt).toLocaleDateString() }}
                </div>
                <div class="opacity-50">
                  Quantity: {{ order.lineItems.edges[0].node.quantity }}
                </div>
              </div>
              <div class="pt-6">Order No: {{ order.orderNumber }}</div>
            </div>
          </div>
        </td>
        <td class="text-right flex justify-end px-0 py-11">
          <div>
            <div>
              ${{ order.totalPriceV2.amount }}
              {{ order.totalPriceV2.currencyCode }}
            </div>
          </div>
        </td>
      </tr>
    </tbody>
    <!-- foot -->
  </table>
  <div class="text-center pb-10 pt-4" v-else>
    <p>No Order History</p>
    <a href="/collection">
      <button class="btn btn-primary w-full">Shop New Arrivals</button>
    </a>
  </div>
</template>
