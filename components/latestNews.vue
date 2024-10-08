<script setup>
defineProps({
  backgroundImg: String,
  heading: String,
  link: String,
  text: String,
});
</script>
<template>
  <div
    class="hero min-h-screen"
    :style="{ backgroundImage: `url(${backgroundImg})` }"
  >
    <div class="hero-overlay bg-opacity-10"></div>
    <div class="hero-content text-center self-end">
      <div class="max-w-md pb-6 font-thin">
        <h2 class="mb-2 text-[20px] text-white uppercase">{{ heading }}</h2>
        <a :href="link">
          <button
            class="py-2 uppercase btn-outline bg-white hover:bg-white hover:text-black border-1 border-black px-12 rounded-none text-sm hover:scale-100"
          >
            {{ text }}
          </button>
        </a>
      </div>
    </div>
  </div>
</template>
