<script setup>
import { GET_CART } from "~/queries/getCart";
import { REMOVE_ITEM } from "~/queries/mutateCart";
import { useCartStore } from "~/store/cart";
const cartStore = useCartStore();
const { $shopifyClient } = useNuxtApp();
const cartId = ref("");
const totalAmount = ref("");
const items = ref([]);
const checkoutUrl = ref("");
onMounted(async () => {
  try {
    cartId.value = localStorage.getItem("cartId");
    const { data } = await $shopifyClient.request(GET_CART, {
      variables: {
        id: cartId.value,
      },
    });
    totalAmount.value = data.cart.cost.subtotalAmount.amount.slice(0, -2);
    checkoutUrl.value = data.cart.checkoutUrl;
    items.value = data.cart.lines.edges;
    console.log(items.value);
  } catch (error) {
    console.error(error);
  }
});

const removeCartLine = async (lineIds) => {
  cartId.value = localStorage.getItem("cartId");
  try {
    await $shopifyClient.request(REMOVE_ITEM, {
      variables: {
        cartId: cartId.value,
        lineIds: lineIds,
      },
    });
    await cartStore.fetchCart(cartId.value);
    const { data } = await $shopifyClient.request(GET_CART, {
      variables: {
        id: cartId.value,
      },
    });
    items.value = data.cart.lines.edges;
    totalAmount.value = data.cart.cost.subtotalAmount.amount.slice(0, -2);
  } catch (error) {
    console.log(error);
  }
};
useSeoMeta({
  title: "Bag - Imperia",
})
</script>
<template>
  <main class="_body">
    <div>
      <h1 class="text-center uppercase text-[20px]">Bag</h1>
      <div class="overflow-x-auto">
        <table
          v-if="items.length > 0"
          class="table min-w-max text-[10px] uppercase border-black"
        >
          <thead>
            <tr>
              <th class="text-left px-0 font-thin">Item</th>
              <th class="text-right px-0 font-thin">Total</th>
            </tr>
          </thead>
          <tbody id="bag-table" v-if="items.length > 0" :key="items">
            <!-- row 1 -->
            <tr v-for="item in items" :key="item.node.id">
              <td>
                <div class="flex items-center align-middle gap-3 pt-4">
                  <div class="w-36 object-contain">
                    <img :src="item.node.merchandise.image.src" />
                  </div>
                  <div class="">
                    <div>
                      {{ item.node.merchandise.product.title }}
                      <div class="opacity-50">
                        {{ item.node.merchandise.title }}
                      </div>
                    </div>

                      <p class="my-6 text-[10px] bg-white" >
                        {{ item.node.quantity }}
                      </p>
                  </div>
                </div>
              </td>
              <td class="text-right px-0">
                <div class="h-32 mt-10">
                  <div class="">
                    {{ item.node.merchandise.priceV2.amount.split(".")[0] }} USD
                  </div>
                  <div
                    class="underline mt-10 cursor-pointer btn-ghost hover:bg-transparent"
                    @click="removeCartLine(item.node.id)"
                  >
                    Remove
                  </div>
                </div>
              </td>
            </tr>

            <!-- row 2 -->
          </tbody>
          <!-- foot -->
        </table>
        <div class="pt-14 lg:pt-20 lg:pb-4 grid gap-2" v-else>
          <p class="text-center m-auto">Your bag is empty</p>
          <div
            @click="navigateTo('/collection')"
            class="btn btn-primary font-normal rounded-none w-full border-1 border-black bg-black text-white text-md p-4 uppercase"
          >
            <p class="text-center">
              Shop New Arrivals
            </p>
          </div>
        </div>
        <div
          v-if="items.length > 0"
          class="flex justify-between pt-4 uppercase"
        >
          <div>
            <p>Total</p>
            <p>Shipping</p>
            <p class="font-bold my-2">Order Total</p>
          </div>
          <div class="text-right">
            <p>{{ totalAmount }} USD</p>
            <p>Calculated At Checkout</p>
            <p class="font-bold my-2">{{ totalAmount }} USD</p>
          </div>
        </div>
        <a v-if="items.length > 0" :href="checkoutUrl" _target="_blank">
          <button class="btn btn-primary w-full font-thin">
            CHECKOUT SECURELY
            <Icon
              name="material-symbols:lock-open-outline-rounded"
              class="text-xl mb-1"
            />
          </button>
        </a>
      </div>
    </div>
  </main>
</template> 