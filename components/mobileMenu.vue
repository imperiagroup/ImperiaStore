<script setup>
const isOpen = ref(false);
const isAuthenticated = ref(false);
defineProps({
  menuItems: Object,
});
onMounted(() => {
  if (localStorage.getItem("accessToken")) {
    isAuthenticated.value = true;
  } else {
    isAuthenticated.value = false;
  }
  const dropdownMenu = document.getElementById("dropdown-menu");
  dropdownMenu.addEventListener("toggle", () => {
    isOpen.value = dropdownMenu.open;
  });
});
</script>
<template>
  <details id="dropdown-menu" class="dropdown dropdown-bottom xl:hidden flex">
    <summary
      role="button"
      class="btn btn-circle bg-transparent border-none hover:bg-transparent"
    >
      <Icon
        :name="isOpen ? 'material-symbols-light:close' : 'quill:hamburger'"
        class="text-2xl"
      />
    </summary>
    <ul
      class="flex flex-col justify-between dropdown-content mobile-menu z-[1] menu p-1 shadow bg-white text-[14px] uppercase py-20 rounded-none w-screen h-screen"
    >
      <div>
        <li v-for="item in menuItems.MainMenu" :key="item">
          <a :href="item.link"> {{ item.name }}</a>
        </li>
      </div>
      <div class="py-32">
        <li><a href="/page/client-service">Client Services</a></li>
        <li>
          <a :href="isAuthenticated ? '/account' : '/login'">{{
            isAuthenticated ? "My Account" : "Login"
          }}</a>
        </li>
      </div>
    </ul>
  </details>
</template>
