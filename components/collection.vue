<script setup>
import { GET_ALL_COLLECTIONS } from "~/queries/getCollection";

const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const collections = ref([]);
onMounted(async () => {
  try {
    const { data } = await $shopifyClient.request(GET_ALL_COLLECTIONS);
    collections.value = data.collections.edges.map((edge) => edge.node);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>
<template>
  <div class="grid lg:grid-cols-3 grid-cols-2 h-screen gap-1">
    <div
      v-for="(collection, index) in collections.slice().reverse()"
      :key="collection.id"
      class="w-full hover:filter hover:grayscale duration-100 flex justify-center bg-top lg:bg-center bg-cover object-center"
      :class="[
        index === 0 ? 'lg:row-span-2 lg:col-span-1 col-span-2 h-full' : '',
        'bg-top lg:bg-center bg-cover',
      ]"
      :style="{ backgroundImage: `url(${collection.image?.src})` }"
      @click="$router.push(`/collection/${collection.handle}`)"
    >
      <div
        class="w-full px-10 py-1 align- mx-auto justify-center self-end flex"
      >
        <a :href="`/collection/${collection.handle}`">
          <h2 class="text-[14px] text-white py-1 uppercase w-full">
            {{ collection.title }}
          </h2>
        </a>
      </div>
    </div>
  </div>
</template>
