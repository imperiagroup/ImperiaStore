<script setup>
import { LOGIN } from "~/queries/mututeCustomer";
import { useAuthenticated } from "~/store/authenticate";
const loading = ref(true);
const { $shopifyClient } = useNuxtApp();
const useAuthenticateStore = useAuthenticated();
const loginInfo = ref({
  email: "",
  password: "",
});
const rememberMe = ref(false);
const loginError = ref("");

onMounted(async () => {
  if (localStorage.getItem("accessToken")) {
    navigateTo("/");
  }
});
const handleLogin = async () => {
  try {
    loading.value = true;
    const { data } = await $shopifyClient.request(LOGIN, {
      variables: {
        email: loginInfo.value.email,
        password: loginInfo.value.password,
      },
    });
    localStorage.setItem(
      "accessToken",
      data.customerAccessTokenCreate.customerAccessToken.accessToken
    );
  } catch (error) {
    console.log(error);
    loginError.value = "Something went wrong. Please try again.";
    useAuthenticateStore.setIsAuthenticated(false);
  } finally {
    loading.value = false;
    if (localStorage.getItem("accessToken")) {
      navigateTo("/");
      useAuthenticateStore.setIsAuthenticated(true);
      window.location.reload();
    } else {
      loginError.value = "Something went wrong. Please try again.";
      useAuthenticateStore.setIsAuthenticated(false);
    }
  }
};
</script>
<template>
  <main class="_body">
    <div>
      <h2 class="text-[20px] uppercase text-center">Login</h2>
    </div>
    <div>
      <div class="form-control py-8 w-full mx-auto uppercase">
        <p v-if="loginError" class="text-center py-2">{{ loginError }}</p>
        <div class="space-y-4">
          <input
            v-model="loginInfo.email"
            type="email"
            required
            placeholder="Email Address"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />
          <input
            v-model="loginInfo.password"
            type="password"
            required
            placeholder="Password"
            class="w-full md:text-[10px] text-[12px] input uppercase input-bordered border-1 border-black focus:outline-none focus:border-gray-200 focus:ring-1 focus:ring-gray-600"
          />
        </div>
        <div class="flex justify-between pt-4">
          <div>
            <input
              v-model="rememberMe"
              type="checkbox"
              id="remember"
              class="align-middle appearance-none w-4 h-4 border border-black rounded-none checked:text-black"
            />
            <label for="remember" class="text-[12px] px-2">Remember me</label>
          </div>
          <div>
            <a href="/forgot-password" class="text-[12px] underline uppercase"
              >Forgot password?</a
            >
          </div>
        </div>

        <button @click="handleLogin" class="btn btn-primary">Login</button>
        <p class="text-center underline pt-4 text-[12px]">
          <a href="/signup">Create An Account</a>
        </p>
      </div>
    </div>
    <hr class="border-black" />
    <div class="text-[12px] max-w-xl mx-auto space-y-8 pt-8">
      <p>ENJOY AN ELEVATED SHOPPING EXPERIENCE WITH YOUR EXCLUSIVE ACCESS</p>
      <ul class="space-y-2">
        <li>- CHECK THE DETAILS AND MONITOR THE STATUS OF YOUR ORDERS</li>
        <li>- VIEW YOUR PRIVATE APPOINTMENTS</li>
        <li>- RECEIVE TAILORED ASSISTANCE FROM OUR CLIENT SERVICES</li>
        <li>- RECEIVE COMMUNICATIONS ABOUT PRODUCTS, STORES AND EVENTS</li>
      </ul>
    </div>
  </main>
</template>
