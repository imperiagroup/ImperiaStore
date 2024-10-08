<script setup>
import { ref } from "vue";

const activeTab = ref("summary");
const activePayment = ref("");

const setActiveTab = (tab) => {
  activeTab.value = tab;
};
import { GET_CART } from "~/queries/getCart";
import { BUYER_INFO_UPDATE, REMOVE_ITEM } from "~/queries/mutateCart";
import { useCartStore } from "~/store/cart";
const cartStore = useCartStore();
const { $shopifyClient } = useNuxtApp();
const cartId = ref("");
const orderAmount = ref("");
const subtotalAmount = ref("");
const items = ref([]);
const address = ref({
  phone: "",
  email: "",
  deliveryAddressPreferences: {
    deliveryAddress: {
      address1: "",
      address2: "",
      city: "",
      company: "",
      country: "",
      firstName: "",
      phone: "",
      lastName: "",
      province: "",
      zip: "",
    },
  },
});
onMounted(async () => {
  try {
    cartId.value = sessionStorage.getItem("cartId");
    const { data } = await $shopifyClient.request(GET_CART, {
      variables: {
        id: cartId.value,
      },
    });
    subtotalAmount.value = data.cart.cost.subtotalAmount.amount.slice(0, -2);
    orderAmount.value = data.cart.cost.totalAmount.amount.slice(0, -2);
    items.value = data.cart.lines.edges;
    console.log(items.value);
  } catch (error) {
    console.error(error);
  }
});

const removeCartLine = async (lineIds) => {
  cartId.value = sessionStorage.getItem("cartId");
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

const addShippingInformation = async () => {
  try {
    cartId.value = sessionStorage.getItem("cartId");
    await $shopifyClient.request(BUYER_INFO_UPDATE, {
      variables: {
        cartId: cartId.value,
        address1: address.value.deliveryAddressPreferences.deliveryAddress.address1,
        city: address.value.deliveryAddressPreferences.deliveryAddress.city,
        country: address.value.deliveryAddressPreferences.deliveryAddress.country,
        firstName: address.value.deliveryAddressPreferences.deliveryAddress.firstName,
        lastName: address.value.deliveryAddressPreferences.deliveryAddress.lastName,
        province: address.value.deliveryAddressPreferences.deliveryAddress.province,
        zip: address.value.deliveryAddressPreferences.deliveryAddress.zip,
      },
    });
    await cartStore.fetchCart(cartId.value);
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="_body space-y-8">
    <div>
      <h2 class="text-[20px] uppercase text-center">Checkout</h2>
    </div>
    <div
      role="tablist"
      class="tabs border-b-[1px] border-black pb-2 flex max-w-full justify-center md:space-x-4 md:px-0 bg-transparent uppercase font-sans"
    >
      <a
        role="tab"
        class="tab tab-xl text-black"
        :class="{ 'active underline': activeTab === 'summary' }"
        @click="setActiveTab('summary')"
        >Order</a
      >
      <a
        role="tab"
        class="tab tab-xl text-black"
        :class="{ 'active underline': activeTab === 'login' }"
        @click="setActiveTab('login')"
        >Login</a
      >
      <a
        role="tab"
        class="tab tab-xl text-black"
        :class="{ 'active underline': activeTab === 'shipping' }"
        @click="setActiveTab('shipping')"
        >Shipping</a
      >
      <a
        role="tab"
        class="tab tab-xl text-black"
        :class="{ 'active underline': activeTab === 'payment' }"
        @click="setActiveTab('payment')"
        >Payment</a
      >
    </div>
    <div class="grid">
      <template v-if="activeTab === 'summary'">
        <div class="w-full max-w-3xl mx-auto uppercase">
          <div class="mt-6">
            <p class="text-center mb-2">Order Summary</p>
            <table class="table min-w-max text-[10px] uppercase border-black">
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
                            {{ item.node.merchandise.title.split("/")[0] }}
                          </div>
                        </div>
                        <select
                          class="my-6 bg-white uppercase border-none rounded-none"
                          disabled
                        >
                          <option selected>
                            {{ item.node.merchandise.title.split("/")[1] }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td class="text-right px-0">
                    <div class="h-32 mt-10">
                      <div class="">
                        {{ item.node.merchandise.priceV2.amount.split(".")[0] }}
                        USD
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

            <div class="flex justify-between pt-4 uppercase">
              <div>
                <p>Total</p>
                <p class="font-bold my-2">Order Total</p>
              </div>
              <div class="text-right">
                <p>{{ subtotalAmount }} USD</p>
                <p class="font-bold my-2">{{ orderAmount }} USD</p>
              </div>
            </div>
            <button
              @click="setActiveTab('login')"
              class="btn btn-primary w-full font-thin"
            >
              <a href="">Confirm & Checkout</a>
            </button>
          </div>
        </div>
      </template>
      <template v-else-if="activeTab === 'login'">
        <div class="grid grid-cols-2 min-w-96 pt-4 mx-auto py-2">
          <div class="gap-2 flex mx-auto col-span-2">
            <p class="text-gray-400">
              {{ items.length }} {{ items.length > 1 ? "items" : "item" }}
            </p>
            <p class="mx-auto">${{ orderAmount }}</p>
          </div>
        </div>
        <div class="form-control py-8 w-full mx-auto uppercase">
          <div class="space-y-4">
            <input
              type="email"
              placeholder="Email"
              class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
            />
            <input
              type="password"
              placeholder="Password"
              class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
            />
          </div>
          <div class="flex justify-between pt-4">
            <div>
              <input
                type="checkbox"
                id="remember"
                class="align-middle appearance-none w-4 h-4 border border-black rounded-none checked:text-black"
              />
              <label for="remember" class="text-[12px] px-2">Remember me</label>
            </div>
            <div>
              <a href="/" class="text-[12px] underline uppercase"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="grid gap-4 py-4">
            <button class="btn btn-stack btn-primary">
              Log In And Continue
            </button>
            <button
              class="btn btn-stack btn-outline"
              @click="setActiveTab('shipping')"
            >
              Skip To Guest Checkout
            </button>
          </div>
          <p class="text-center underline pt-4 text-[12px]">
            <a href="/signup">Create An Account</a>
          </p>
        </div>
      </template>
      <template v-else-if="activeTab === 'shipping'">
        <div class="grid pt-4 mx-auto pb-2">
          <div class="gap-2 pb-2 flex mx-auto col-span-2">
            <p class="text-gray-400">{{ items.length }} items</p>
            <p class="mx-auto">${{ orderAmount }}</p>
          </div>
          <p class="col-span-2 text-center text-gray-400">
            Your Confirmation Email Will Be Sent To: <br />
            <span class="text-black">{{ address.email }}</span>
          </p>
        </div>
        <div
          class="grid grid-flow-col-dense overflow-x-scroll overflow-y-hidden no-scrollbar gap-1 mb-4 mt-8 max-w-3xl"
        >
          <AddressCard :isPrimary="true" />
          <AddressCard :isPrimary="false" />
          <AddressCard :isPrimary="false" />
        </div>
        <div class="form-control py-8 w-full mx-auto uppercase">
          <div class="space-y-4">
            <input
              v-model="address.email"
              type="email"
              required
              placeholder="Email"
              class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
            />
            <input
              v-model="
                address.deliveryAddressPreferences.deliveryAddress.firstName
              "
              required
              type="name"
              placeholder="First Name"
              class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
            />
            <input
              v-model="
                address.deliveryAddressPreferences.deliveryAddress.lastName
              "
              required
              type="name"
              placeholder="Last Name"
              class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
            />

            <input
              v-model="
                address.deliveryAddressPreferences.deliveryAddress.address1
              "
              type="text"
              required
              placeholder="Address"
              class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
            />
            <input
              v-model="address.deliveryAddressPreferences.deliveryAddress.city"
              type="text"
              required
              placeholder="City"
              class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
            />

            <input
              v-model="
                address.deliveryAddressPreferences.deliveryAddress.province
              "
              type="text"
              required
              placeholder="Province/State/County"
              class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
            />

            <input
              v-model="
                address.deliveryAddressPreferences.deliveryAddress.postalCode
              "
              type="Number"
              required
              placeholder="Zip Code"
              class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
            />
            <countries-selector
              v-on="
                address.deliveryAddressPreferences.deliveryAddress.country
              "
            />
            <button @click="addShippingInformation" class="btn btn-primary w-full">
              Continue To Payment
            </button>
          </div>
        </div>
      </template>
      <template v-else-if="activeTab === 'payment'">
        <div class="grid grid-cols-2 gap-2 py-4 mx-auto text-center">
          <div class="gap-2 flex mx-auto col-span-2">
            <p class="text-gray-400">
              {{ items.length }} {{ items.length > 1 ? "items" : "item" }}
            </p>
            <p class="mx-auto">${{ orderAmount }}</p>
          </div>
          <p class="col-span-2 text-gray-400 mx-auto">
            Your Confirmation Email Will Be Sent To: <br />
            <span class="text-black">{{ address.email }}</span>
          </p>
          <div class="col-span-2 py-2">
            <p class="text-black text-center mr-1">
              <Icon
                name="material-symbols:check-small"
                class="text-[24px] text-black"
              />Delivery
            </p>
            <p class="text-gray-400">Country/Region: {{ address.deliveryAddressPreferences.deliveryAddress.country }}</p>
            <p class="text-gray-400">Zip Code: {{ address.deliveryAddressPreferences.deliveryAddress.postalCode }}</p>
            <p class="text-gray-400">Province/State/County: {{ address.deliveryAddressPreferences.deliveryAddress.province }}</p>
          </div>
          <div class="col-span-2 py-2">
            <p class="text-black text-center mr-1">
              <Icon
                name="material-symbols:check-small"
                class="text-[24px] text-black"
              />Shipping
            </p>
            <p class="text-gray-400">
              Complimentary Reduced-Carbon Delivery: 2-6 days
            </p>
          </div>
          <div class="col-span-2 pt-2">
            <p>All Transactions Are Secure And Encrypted</p>
          </div>
        </div>
        <div class="pb-2 mb-8 space-y-2">
          <div
            class="border-[1px] border-black text-left p-2 flex justify-between cursor-pointer"
            :class="activePayment === 'creditcard' && 'bg-black text-white'"
            @click="activePayment = 'creditcard'"
          >
            <div class="justify-center align-middle my-auto">
              <p class="pl-2">Credit Card</p>
            </div>
            <div class="space-x-1 pr-2">
              <Icon name="fa6-brands:cc-visa" class="text-3xl" />
              <Icon name="fa6-brands:cc-mastercard" class="text-3xl" />
              <Icon name="formkit:amex" class="text-3xl" />
              <Icon name="fa6-brands:cc-discover" class="text-3xl" />
            </div>
          </div>
          <div
            class="border-[1px] border-black text-left p-2 flex justify-between cursor-pointer"
            :class="
              activePayment === 'paypal' && 'bg-black text-white border-[1px]'
            "
            @click="activePayment = 'paypal'"
          >
            <div class="justify-center align-middle my-auto">
              <p class="pl-2">PayPal</p>
            </div>
            <div class="space-x-1 pr-2">
              <Icon name="fa6-brands:cc-paypal" class="text-3xl" />
            </div>
          </div>
          <div
            class="border-[1px] border-black text-left p-2 flex justify-between cursor-pointer"
            :class="
              activePayment === 'venmo' && 'bg-black text-white border-[1px]'
            "
            @click="activePayment = 'venmo'"
          >
            <div class="justify-center align-middle my-auto">
              <p class="pl-2 pr-2">Venmo</p>
            </div>
            <div class="space-x-1 pr-2">
              <Icon name="cib:venmo" class="text-3xl" />
            </div>
          </div>
          <div
            class="border-[1px] border-black text-left p-2 flex justify-between cursor-pointer"
            :class="
              activePayment === 'apple' && 'bg-black text-white border-[1px]'
            "
            @click="activePayment = 'apple'"
          >
            <div class="justify-center align-middle my-auto">
              <p class="pl-2 pr-2">Apple Pay</p>
            </div>
            <div class="space-x-1 pr-2">
              <Icon name="fa6-brands:cc-apple-pay" class="text-3xl" />
            </div>
          </div>
          <div
            class="border-[1px] border-black text-left p-2 flex justify-between cursor-pointer"
            :class="
              activePayment === 'google' && 'bg-black text-white border-[1px]'
            "
            @click="activePayment = 'google'"
          >
            <div class="justify-center align-middle my-auto">
              <p class="pl-2 pr-2">Google Pay</p>
            </div>
            <div class="space-x-1 pr-2">
              <Icon name="fa6-brands:google-pay" class="text-3xl" />
            </div>
          </div>
        </div>

        <div v-if="activePayment === 'creditcard'">
          <div
            class="grid grid-flow-col-dense overflow-x-scroll overflow-y-hidden no-scrollbar gap-1 max-w-3xl"
          >
            <credit-card />
            <credit-card />
            <credit-card />
          </div>
          <div class="form-control py-8 w-full mx-auto uppercase">
            <div class="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
              />
              <input
                type="number"
                placeholder="Card Number"
                class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
              />

              <div class="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  pattern="\d{2}/\d{2}"
                  title="Please enter a valid MM/YY format"
                  class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
                />
                <input
                  type="number"
                  placeholder="CCV"
                  class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
                />
              </div>
            </div>
            <button class="btn btn-primary w-full font-thin">
              CHECKOUT SECURELY
              <Icon
                name="material-symbols:lock-open-outline-rounded"
                class="text-xl mb-1"
              />
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>