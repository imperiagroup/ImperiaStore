<template>
  <main class="_body_fullwidth">
    <div class="grid md:grid-cols-2 grid-cols-1">
      <ProductSwiper :images="images" />
      <ProductInfo
        :isOutOfStock="!product.availableForSale"
        :productName="product.title"
        :description="product.descriptionHtml"
        :price="product.variants?.nodes[0]?.price.amount"
        :availableSize="product.variants?.nodes"
        :short_description="short_description"
        :sizeGuideImg="product.metafields[6]?.reference.image.src"
      >
        <Accordion
          :free_shipping_free_returns="free_shipping_free_returns"
          :payment="payment"
          :product_sustainability="product_sustainability"
        />
      </ProductInfo>
    </div>
    <StyleWith v-if="styleWith.length > 0" :productIds="styleWith" />
  </main>
</template>
<script setup>
import { GET_PRODUCT_BY_HANDLE } from "~/queries/getProduct";
import { convertSchemaToHtml } from "@thebeyondgroup/shopify-rich-text-renderer";

const { id } = useRoute().params;
const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const product = ref([]);
const images = ref([]);
const customData = ref([]);
const short_description = ref("");
const product_sustainability = ref("");
const free_shipping_free_returns = ref("");
const payment = ref("");
const styleWith = ref([]);
const variants = ref([]);
onMounted(async () => {
  try {
    const { data } = await $shopifyClient.request(GET_PRODUCT_BY_HANDLE, {
      variables: {
        handle: id,
      },
    });
    product.value = data.productByHandle;
    images.value = product.value.images?.edges.map((edge) => edge.node);
    customData.value = product.value.metafields;
    short_description.value = customData.value.find(
      (obj) => obj.key === "short_description"
    ).value;
    product_sustainability.value = convertSchemaToHtml(
      customData.value.find((obj) => obj.key === "sustainability").value
    );
    free_shipping_free_returns.value = convertSchemaToHtml(
      customData.value.find((obj) => obj.key === "shippingandreturn").value
    );
    payment.value = convertSchemaToHtml(
      customData.value.find((obj) => obj.key === "paymentoption").value
    );
    styleWith.value = JSON.parse(
      customData.value.find((obj) => obj.key === "stylewith").value
    ).map((item) => item.replace(/"/g, ""));
    variants.value = product.value.variants.nodes;
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
useSeoMeta({
  title: () => product.value.title,
  description: () => short_description.value,
});
</script>
