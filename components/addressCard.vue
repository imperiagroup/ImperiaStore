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
          <img
            width="15"
            src="trash-can.png"
            @click="deleteAddress(address.id)"
          />
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
