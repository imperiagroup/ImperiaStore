<script setup>
import { SEARCH_QUERY } from "~/queries/search";
const route = useRoute();
const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const products = ref([]);
const searchQuery = ref(route.query.query.replace("%20", ""));
const fetchSearchResults = async (query) => {
  const { data } = await $shopifyClient.request(SEARCH_QUERY, {
    variables: {
      query: query,
      first: 250,
    },
  });
  products.value = data.search.edges.map((edge) => edge.node);
};

watch(() => route.query.query, (newQuery) => {
  if (newQuery) {
    console.log(newQuery);
    searchQuery.value = newQuery.replace("%20", "");
    fetchSearchResults(searchQuery.value);
  }
}, { immediate: true, deep: true });

onMounted(async () => {
  try {
    fetchSearchResults(searchQuery);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

useSeoMeta({
  title: "Search - Imperia",
})
</script>
<template>
  <div class="grid px-4 md:px-8 py-10 mt-10">
    <div class="" v-if="products.length > 0 && !loading">
      <div class="grid md:grid-cols-4 grid-cols-2 px-2 md:py-10 gap-2 md:gap-8">
        <div v-for="item in products" :key="item.id">
          <ProductCard
            :link="`/product/${item.handle}`"
            :inStock="item.availableForSale"
            :productName="item.title"
            :productColor="item.variants.nodes[0]?.selectedOptions[0]?.value"
            :Image="item.images.edges[0]?.node.src"
            :price="item.variants.nodes[0]?.price.amount"
            :isCommingSoon="item.metafields[5]?.value"
          />
        </div>
      </div>
    </div>
    <div v-else class="h-96 flex">
      <p class="text-center m-auto">No matches for {{ searchQuery }}. Explore our curated collections.</p>
    </div>
  </div>
</template>
