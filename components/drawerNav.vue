<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { GET_METAOBJECT } from "~/queries/getMetaobject";
const isHidden = ref(true);
const lastScrollTop = ref(0);
const menu = ref([]);
const loading = ref(true);
const topbarText = ref("");
const menuItems = ref({});
const isAuthenticated = ref(false);
const { $shopifyClient } = useNuxtApp();
const searchValue = ref("");
const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop >= lastScrollTop.value && scrollTop > 100) {
    // Scrolling down
    isHidden.value = true;
  } else {
    // Scrolling up
    isHidden.value = false;
  }
  lastScrollTop.value = scrollTop;
};

const handleHideSearchbar = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop >= lastScrollTop.value && scrollTop > 100) {
    // Scrolling down
    isHidden.value = true;
  } else {
    // Scrolling up
    isHidden.value = true;
  }
  lastScrollTop.value = scrollTop;
};

onMounted(async () => {
  if (localStorage.getItem("accessToken")) {
    isAuthenticated.value = true;
  } else {
    isAuthenticated.value = false;
  }
  try {
    const { data } = await $shopifyClient.request(GET_METAOBJECT, {
      variables: {
        handle: "main-menu",
        type: "main_menu",
      },
    });

    menu.value = data.metaobject.fields;
    menuItems.value = JSON.parse(
      menu.value.find((obj) => obj.key === "menu").value
    );
    topbarText.value = menu.value.find(
      (obj) => obj.key === "top_bar_text"
    ).value;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
onMounted(() => {
  if (window.location.pathname === "/") {
    isHidden.value = false;
    window.addEventListener("scroll", handleScroll, { passive: true });
  } else {
    window.addEventListener("scroll", handleHideSearchbar, { passive: true });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleSearch = (searchValue) => {
  const { id } = useRoute();
  if (id === "search") {
    $route.push({ path: "/search", query: { query: searchValue } });
  } else {
    navigateTo(`/search/?query=${searchValue}`);
  }
};
</script>
<template>
  <header class="sticky top-0 w-full z-50">
    <div class="bg-black flex align-middle justify-center">
      <p class="header-text text-sm w-full text-right text-white py-1">
        {{ topbarText }}
      </p>
    </div>
    <div class="navbar bg-white">
      <div class="navbar-start">
        <ul class="menu menu-horizontal text-sm uppercase hidden xl:flex">
          <li v-for="item in menuItems.MainMenu" :key="item">
            <a :href="item.link"> {{ item.name }}</a>
          </li>
        </ul>
        <MobileMenu :menuItems="menuItems" @click="isHidden = false" />
      </div>
      <div class="navbar-center">
        <a href="/" class="btn btn-ghost text-xl">
          <img src="/img/logo.svg" width="150" height="130" alt="Imperia" />
        </a>
      </div>
      <div class="navbar-end">
        <ul
          class="menu menu-horizontal text-sm px-2 md:px-4 uppercase space-x-2"
        >
          <div class="hidden md:flex">
            <li><a href="/page/client-service">Client Services</a></li>
            <li><a :href="isAuthenticated ? '/account' : '/login'">{{ isAuthenticated ? "My Account" : "Login" }}</a></li>
          </div>
          <Icon
            name="material-symbols:search-rounded"
            class="text-2xl my-auto"
            v-if="isHidden"
            @click="isHidden = false"
          />
          <Bag />
        </ul>
      </div>
    </div>
    <div :class="[isHidden ? 'hidden' : 'block', 'relative']">
      <Icon
        name="ic:outline-search"
        class="text-2xl text-black absolute z-20 top-3 left-3 md:left-5"
      />
      <input
        type="text"
        v-model="searchValue"
        @keypress.enter="handleSearch(searchValue)"
        placeholder="WHAT ARE YOU LOOKING FOR?"
        class="z-10 input absolute input-bordered border-t-black border-b-black border-l-0 border-r-0 rounded-none uppercase min-h-14 w-full max-w-full px-12 md:px-14 text-[12px] md:text-[10px]"
      />
    </div>
  </header>
</template>
<style>
.header-text {
  animation: slideInLeft 15s infinite linear;
}

header a:hover {
  background: transparent !important ;
}

@media (min-width: 768px) {
  .header-text {
    animation-duration: 45s;
  }
}

@keyframes slideInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
