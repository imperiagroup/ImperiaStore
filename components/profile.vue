<script setup>
import { GET_CUSTOMER } from "~/queries/getCustomer";
import {
  UPDATE_CUSTOMER_METAFIELD,
  UPDATE_CUSTOMER_METAFIELD_v2,
  UPDATE_CUSTOMER_PROFILE,
  CUSTOMER_PROFILE,
} from "~/queries/mututeCustomer";

const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const isAcceptMarketing = ref(false);
const customerID = ref("");
const titleID = ref("");
const userInfo = ref({
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  DOB: "",
  phoneNumber: 0,
});
const saveChanges = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const newPhoneNumber = userInfo.value.phoneNumber; // Ensure this is getting the correct new phone number
  const titleValue = userInfo.value.title;
  const birthDate = userInfo.value.DOB;
  // const customerInput = {
  //   phone: newPhoneNumber,
  //   acceptsMarketing: isAcceptMarketing.value,
  // };
  // const customerInput = {
  //   id: customerID.value, // It only has the identifier issue
  //   metafields: [
  //     {
  //       id: "gid://shopify/Metafield/39053854507161",
  //       key: "title",
  //       namespace: "custom",
  //       value: "Mr",
  //     },
  //     {
  //       id: "gid://shopify/Metafield/39053917782169",
  //       key: "birth_date",
  //       namespace: "facts",
  //       value: "2024-09-02",
  //     },
  //   ],
  // };
  const metafields = [
    {
      key: "title",
      namespace: "custom",
      ownerId: "gid://shopify/Customer/3385344753801",
      type: "single_line_text_field",
      value: "Mrs",
    },
  ];
  const customerInput = {
    metafields: [
      {
        namespace: "custom",
        key: "title",
        value: titleValue,
      },
      {
        namespace: "facts",
        key: "birth_date",
        value: birthDate,
      },
    ],
  };
  try {
    // await $shopifyClient.request(UPDATE_CUSTOMER_PROFILE, {
    //   variables: {
    //     customer: customerInput,
    //     customerAccessToken: accessToken,
    //   },
    // });
    await $shopifyClient.request(CUSTOMER_PROFILE, {
      variables: {
        metafields: metafields,
      },
    });

    alert("Profile updated successfully");
  } catch (error) {
    console.error("Error updating customer profile:", error);
  }
};

onMounted(async () => {
  try {
    const accesstoken = localStorage.getItem("accessToken");
    if (accesstoken) {
      const { data } = await $shopifyClient.request(GET_CUSTOMER, {
        variables: {
          customerAccessToken: accesstoken,
        },
      });
      userInfo.value = {
        email: data.customer.email,
        title: data.customer.metafields[0]?.value,
        firstName: data.customer.firstName,
        lastName: data.customer.lastName,
        DOB: data.customer.metafields[1]?.value,
        phoneNumber: data.customer.phone,
      };
      customerID.value = data.customer.id;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>
<template v-else-if="activeTab === 'profile'">
  <div class="py-10 mx-auto w-full">
    <p class="mx-auto text-center">Account Information</p>
  </div>
  <div class="form-control py-8 w-full mx-auto uppercase">
    <div class="space-y-4">
      <select
        class="select custom-select select-bordered w-full md:text-[10px] text-[12px] uppercase border-black rounded-none"
        v-model="userInfo.title"
      >
        <option disabled selected>Title</option>
        <option>Mr</option>
        <option>Miss, Mrs, Ms</option>
        <option>Mx</option>
        <option>I'd rather not say</option>
      </select>
      <input
        v-model="userInfo.firstName"
        type="text"
        placeholder="First Name"
        class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none"
      />
      <input
        v-model="userInfo.lastName"
        type="text"
        placeholder="Last Name"
        class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none"
      />
      <input
        v-model="userInfo.email"
        type="email"
        placeholder="Email Address"
        class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none"
      />
      <date-picker v-model="userInfo.DOB" format="yyyy-MM-dd" />
      <div class="flex gap-2">
        <input
          type="tel"
          v-model="userInfo.phoneNumber"
          placeholder="Phone Number"
          class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none"
        />
      </div>
    </div>
    <div class="justify-between space-y-4 pt-4">
      <div>
        <input
          v-model="isAcceptMarketing"
          type="checkbox"
          id="checkbox-1"
          class="align-middle appearance-none w-4 h-4 border border-black rounded-none checked:text-black"
        />
        <label for="checkbox-1" class="text-[12px] px-2"
          >Yes, send me marketing and promotional emails and text
          messages.</label
        >
      </div>
      <div>
        <input
          type="checkbox"
          id="checkbox-2"
          class="align-middle appearance-none w-4 h-4 border border-black rounded-none checked:text-black"
        />
        <label for="checkbox-2" class="text-[12px] px-2"
          >Yes, send me order confirmations, account notifications, order
          updates, and delivery notifications.</label
        >
      </div>
      <!-- <div>
        <input
          type="checkbox"
          id="checkbox-3"
          class="align-middle appearance-none w-4 h-4 border border-black rounded-none checked:text-black"
        />
        <label for="checkbox-3" class="text-[12px] px-2"
          >Yes, send me marketing and promotional text messages.</label
        >
      </div>
      <div>
        <input
          type="checkbox"
          id="checkbox-4"
          class="align-middle appearance-none w-4 h-4 border border-black rounded-none checked:text-black"
        />
        <label for="checkbox-4" class="text-[12px] px-2"
          >Yes, send me order updates and delivery notifications.</label
        >
      </div> -->
    </div>
    <button class="btn btn-primary" @click="saveChanges()">Save Changes</button>
  </div>
</template>
