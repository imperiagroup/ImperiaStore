<script setup>
useSeoMeta({
  title: "Collection - Imperia",
});

import { GET_PRODUCTS } from "~/queries/getProduct";

// Fetch products data
const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const products = ref([]);
onMounted(async () => {
  try {
    const { data } = await $shopifyClient.request(GET_PRODUCTS, {
      variables: {
        number: 20,
      },
    });
    products.value = data.products.edges.map((edge) => edge.node);
    console.log("product: ", products.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

useSeoMeta({
  title: "Collection - Imperia",
  description: "Collection - Imperia",
});
</script>
<template>
  <div class="grid px-4 md:px-8 mt-20">
    <div class="">
      <div class="grid md:grid-cols-4 grid-cols-2 px-2 md:py-10 gap-2 md:gap-8">
        <div v-for="item in products" :key="item.id">
          {{ console.log("item id ", item.handle) }}
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
  </div>
</template>
