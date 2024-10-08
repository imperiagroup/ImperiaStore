<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { GET_PRODUCTS_BY_ID } from "~/queries/getProduct";

const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const products = ref([]);
const props = defineProps({
  productIds: Array,
});
watchEffect(() => {
  if (props.productIds.length > 0) {
    fetchProducts(props);
  }
});

onMounted(() => {
  if (props.productIds.length > 0) {
    fetchProducts(props);
  }
});

async function fetchProducts(props) {
  try {
    const { data } = await $shopifyClient.request(GET_PRODUCTS_BY_ID, {
      variables: {
        ids: props.productIds,
      },
    });
    products.value = data.nodes;
    loading.value = false;
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <section class="mx-auto pt-14 px-4 z-40">
    <h2 class="text-[20px] text-center uppercase">Style With</h2>
    <div class="grid md:grid-cols-4 grid-cols-2 px-2 py-10 gap-2 md:gap-8">
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