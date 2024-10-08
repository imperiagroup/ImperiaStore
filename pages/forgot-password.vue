<script setup>
import {
  RESET_PASSWORD,
  UPDATE_NEW_PASSWORD,
  GET_RESETURL,
  GET_CUSTOMER_ID_BY_EMAIL,
} from "~/queries/mututeCustomer";
const { $shopifyClient } = useNuxtApp();
const isConfirmEmail = ref(false);
const success = ref(false);
const email = ref("");
const password = ref("");
const loading = ref(false);

onMounted(async () => {
  try {
    const { data } = await $shopifyClient.request(RESET_PASSWORD, {
      variables: {
        email: email.value,
      },
    });
    console.log("data: ", data);
  } catch (err) {}
});

const resetPassword = async () => {
  try {
    const { data } = await $shopifyClient.request(RESET_PASSWORD, {
      variables: {
        email: email.value,
      },
    });
    if (data.customerRecover !== null) {
      console.log("emailvalue: ", email.value);
      isConfirmEmail.value = true;
    }
  } catch (error) {
    console.log(error);
    errorMessage.value = "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
};

const createNewPassword = async () => {
  try {
    const { data } = await $shopifyClient.request(UPDATE_NEW_PASSWORD, {
      variables: {
        password: password.value,
        resetUrl:
          "https://imperia.store/_t/c/A1030004-17DEB5955C420D9B-251B9828?l=AAAMZNWwG6DsgrA0No6iSTFQGJX5QEY2O4vDFn31k4VxgZApFtMROcPt%2B%2Fm97aEyAD9KOu15eS1%2FX%2FrINVedaFxTBjxbwxtIVO9BXVKh2IpGWdJaa572j%2BRvojHIGzaRtgbzRKObeWJkYIAV4f2fPAQNCVx%2FOBk1P5jsRRyna4F7Y1JV4OxCWHE12vH83b9lTSPOgMxdVLJqGPxgqKH80Ub3Gwkk8gAUjBhJxcoiZZ5fLgDdgS%2FxnTJxkEiERdqWyo4a2DH5y8SWvmz40HQDVSg3GhTsVbyig66CX8wgRNdlLmxer%2FHDrA%3D%3D&c=AADOuI6Prll2qNt3tksA%2FXk2is9OneUIP0Rs3ELYuzMfRN474Ickt8agfhFSYkJPRZXOLQbvntao%2BrCJt16ci9CuPr5v5vgnTR1e6kxd0mO0rPSIJ3lucLQluaYDNKDZRIZ1wXSyALY%2FqRm06oEuZT3bGQUfhUFLO%2BLcOXTbfqUfwYXL9FAg1mApjJAUojqzYaJ5OZ81jghBU0%2BAerVfTaDKF%2F2CbvC0XdNbw%2BSR3AsrWM8dfuTY2nY%2Bv%2FLIFCECOKFWWFoumjS0QHoFuguOeRX1n%2F8v1LEO3WqhyyeoFa4crc9oDpYTrbyJ%2BuE6T6d%2BIloBicq82EpmxAaZZpWMgCXyAC1yEHdvlfJRuadcl49M%2F5FRF%2Fg%3D",
      },
    });
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <main class="_body space-y-4">
    <div>
      <h2 class="text-[20px] uppercase text-center">reset password</h2>
    </div>
    <div>
      <div
        v-if="isConfirmEmail === false"
        class="form-control pb-8 pt-4 w-full mx-auto uppercase"
      >
        <div class="space-y-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email Address"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />
        </div>
        <button class="btn btn-primary" @click="resetPassword()">
          reset my password
        </button>
      </div>
      <div
        v-if="isConfirmEmail === true"
        class="form-control pb-8 pt-4 w-full mx-auto uppercase"
      >
        <div class="space-y-4" v-if="success === false">
          <input
            type="password"
            v-model="password"
            placeholder="New Password"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />
        </div>
        <button
          class="btn btn-primary"
          v-if="success === false"
          @click="createNewPassword()"
        >
          create new password
        </button>
        <div class="mx-auto text-center w-full" v-if="success === true">
          <p class="text-center">Your password has been successfully reset</p>
          <button
            class="btn btn-primary w-full"
            v-if="success === true"
            @click="navigateTo()"
          >
            Back To home
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
