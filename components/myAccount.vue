<script setup>
defineProps({
  addresses: Array,
  creditCards: Array,
});
import { GET_CART } from "~/queries/getCart";
import { REMOVE_ITEM } from "~/queries/mutateCart";
import { useCartStore } from "~/store/cart";
const cartStore = useCartStore();
const { $shopifyClient } = useNuxtApp();
const cartId = ref("");
const totalAmount = ref("");
const items = ref([]);
onMounted(async () => {
  try {
    cartId.value = localStorage.getItem("cartId");
    const { data: cartData } = await $shopifyClient.request(GET_CART, {
      variables: {
        id: cartId.value,
      },
    });
    totalAmount.value = cartData.cart.cost.subtotalAmount.amount.slice(0, -2);
    items.value = cartData.cart.lines.edges;
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
  } catch (error) {
    console.log(error);
  }
};
useSeoMeta({
  title: "My Account - Imperia",
});
</script>
<template v-if="activeTab === 'account'">
  <div class="w-full max-w-3xl mx-auto uppercase">
    <div class="w-full max-w-3xl mx-auto uppercase">
      <p class="py-6 text-center">Shipping Information</p>
      <div
        class="grid grid-flow-col-dense overflow-x-scroll overflow-y-hidden no-scrollbar gap-1 max-w-3xl"
      >
        <AddressCard />
      </div>
    </div>
    <div class="w-full max-w-3xl mx-auto uppercase">
      <p class="py-6 text-center"></p>
      <div
        class="grid grid-flow-col-dense overflow-x-scroll overflow-y-hidden no-scrollbar gap-1 max-w-3xl"
      >
        <AddNewAddress id="addNewAddress" />
      </div>
    </div>

    <div class="mt-6">
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
                    <select
                      class="my-6 bg-white uppercase border-none rounded-none"
                      disabled
                    >
                      <option selected>
                        {{ item.node.quantity }}
                      </option>
                    </select>
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
            <p class="text-center">Shop New Arrivals</p>
          </div>
        </div>
        <a v-if="items.length > 0" href="/bag" _target="_blank">
          <button class="btn btn-primary w-full font-thin">
            View Full Bag
          </button>
        </a>
      </div>
    </div>
  </div>
</template>
