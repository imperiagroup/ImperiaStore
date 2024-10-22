<script setup>
import { GET_CUSTOMER } from "~/queries/getCustomer";
const { $shopifyClient } = useNuxtApp();

const address = reactive([]);
const addressList = reactive([]);
onMounted(async () => {
  try {
    if (localStorage.getItem("accessToken")) {
      const { data } = await $shopifyClient.request(GET_CUSTOMER, {
        variables: {
          customerAccessToken: localStorage.getItem("accessToken"),
        },
      });
      address.push(data.customer.addresses.nodes);
      addressList.push(address[0]);
    }
  } catch (error) {
    console.error(error);
  } finally {
  }
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-auto gap-4">
    <div
      v-for="(address, index) in addressList[0]"
      :key="address.id"
      class="card cursor-pointer border border-gray-900 shadow-sm"
      @click="showModal(address.id)"
    >
      <div class="card-body">
        <div class="flex flex-row justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 32 32"
          >
            <path
              d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"
            ></path>
          </svg>
        </div>

        <p class="text-sm font-bold text-black">
          {{ address.isPrimary ? "Primary Address" : "Address" }}
        </p>
        <div
          class="justify-start text-sm text-gray-900 inline-flex flex-wrap space-x-1"
        >
          <span
            >{{ address.name }},{{ address.address1 }},{{ address.city }},{{
              address.country
            }}</span
          >
        </div>
      </div>
    </div>
  </div>

  <dialog :id="id" class="modal rounded-none">
    <div class="modal-box rounded-none">
      <div class="mb-4 relatve">
        <button
          class="btn-sm btn-circle btn-ghost hover:bg-transparent absolute right-4 top-4 my-0"
          @click="closeModal()"
        >
          ✕
        </button>
        <h3 class="font-bold text-[12px] text-center uppercase">
          Edit Address
        </h3>
      </div>
      <div class="form-control space-y-4 w-full mx-auto uppercase">
        <div class="space-y-4">
          <countries-selector />

          <input
            type="text"
            placeholder="Province/State/County"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />
          <input
            type="text"
            placeholder="City"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />

          <input
            type="Number"
            placeholder="Zip Code"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />

          <input
            type="text"
            placeholder="Address"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />
        </div>
        <div class="grid grid-cols-2 gap-2 w-full justify-stretch align-middle">
          <button class="btn btn-primary" @click="closeModal()">
            Save Changes
          </button>
          <button class="btn btn-outline">Remove Address</button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script>
import { Delete_address } from "~/queries/mututeCustomer";
const { $shopifyClient } = useNuxtApp();
export default {
  props: {
    id: String,
    isPrimary: Boolean,
  },
  methods: {
    showModal(id) {
      const dialog = document.getElementById(id);
      if (dialog) {
        dialog.showModal();
      }
    },
    closeModal() {
      const dialog = document.getElementById(this.id);
      if (dialog) {
        dialog.close();
      }
    },
    async deleteAddress(id) {
      try {
        if (localStorage.getItem("accessToken")) {
          const { data } = await $shopifyClient.request(Delete_address, {
            variables: {
              customerAccessToken: localStorage.getItem("accessToken"),
              id: id,
            },
          });
        }
        alert("Address permanently Deleted");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
