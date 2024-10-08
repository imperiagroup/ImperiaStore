<script setup>
import { ref } from "vue";
import { GET_PRODUCTS } from "~/queries/getProduct";

// Fetch products data
const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const products = ref([]);
onMounted(async () => {
  try {
    const { data } = await $shopifyClient.request(GET_PRODUCTS, {
      variables: {
        number: 4,
      },
    });
    products.value = data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="mx-auto py-4 flex flex-col">
    <div class="py-4">
      <h2 class="text-[20px] text-center uppercase">New Arrivals</h2>
    </div>
    <div
      class="grid md:grid-cols-4 grid-cols-2 px-2 pt-3 py-4 gap-2 font-thin md:gap-8"
    >
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
  </section>
</template>
