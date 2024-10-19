<script setup>
import { GET_CUSTOMER } from "~/queries/getCustomer";
import { ADD_NEW_ADDRESS } from "~/queries/mututeCustomer";
const { $shopifyClient } = useNuxtApp();
const addressForm = reactive({
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
});
const clearForm = () => {
  addressForm.street = "";
  addressForm.city = "";
  addressForm.state = "";
  addressForm.zipCode = "";
  addressForm.country = "";
};
const handleAddressChange = async () => {
  if (addressForm.street.length > 10) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressForm.street)}&format=json&addressdetails=1&limit=1`
      );
      if (!response.ok) {
        alert("Please Enter a valid Street address");
        throw new Error("Failed to fetch address data");
      }
      const data = await response.json();
      const addressDetails = data[0]?.address;

      if (addressDetails) {
        addressForm.city = addressDetails.city || "";
        addressForm.state = addressDetails.state || addressDetails.county || "";
        addressForm.zipCode = addressDetails.postcode || "";
        addressForm.country = addressDetails.country || "";
      }
    } catch (err) {
      console.log("error while fetching address: ", err);
    }
  }
};
const handleRemoveAddress = () => {
  if (addressForm.street.length !== 0) {
    Object.keys(addressForm).forEach((key) => {
      delete addressForm[key];
    });
  } else {
    alert("Please Enter Any Address");
  }
};
const handleSubmission = async () => {
  if (addressForm.street.length !== 0) {
    try {
      const { data } = await $shopifyClient.request(ADD_NEW_ADDRESS, {
        variables: {
          address: {
            address1: addressForm.street,
            city: addressForm.city,
            province: addressForm.state,
            zip: addressForm.zipCode,
            country: addressForm.country,
          },
          customerAccessToken: localStorage.getItem("accessToken"), // Use the stored customer access token
        },
      });
      console.log(data);
      alert("Address Added Successfully");
      clearForm();
    } catch (err) {
      console.log("error", error);
    }
  } else {
    alert("Please fill in all required fields.");
  }
};
</script>
<template>
  <div
    class="card cursor-pointer bg-current border-[1px] border-black rounded-none text-neutral-content"
    @click="showModal(id)"
  >
    <div class="card-body py-4">
      <div>
        <p class="text-gray-400">Add New Address</p>
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
          Add New Address
        </h3>
      </div>
      <div class="form-control space-y-4 w-full mx-auto uppercase">
        <div class="space-y-4">
          <countries-selector :selected-country="addressForm.country" />

          <input
            type="text"
            v-model="addressForm.state"
            placeholder="Province/State/County"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />
          <input
            type="text"
            v-model="addressForm.city"
            placeholder="City"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />

          <input
            type="text"
            v-model="addressForm.zipCode"
            placeholder="Zip Code"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />

          <input
            type="text"
            v-model="addressForm.street"
            @input="handleAddressChange"
            placeholder="Street Address"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />
        </div>
        <div class="grid grid-cols-2 gap-2 w-full justify-stretch align-middle">
          <button class="btn btn-primary" @click="handleSubmission()">
            Save Changes
          </button>
          <button class="btn btn-outline" @click="handleRemoveAddress()">
            Clear Fields
          </button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script>
import { GET_CUSTOMER } from "~/queries/getCustomer";
const { $shopifyClient } = useNuxtApp();
const loading = ref(true);

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
      window.location.reload();
    },
  },
};

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
      console.log(numberOfOrder.value);
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>
